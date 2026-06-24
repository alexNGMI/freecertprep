import { expect, test } from '@playwright/test'

const LIVE_CERT_IDS = [
  'clf-c02',
  'aws-saa-c03',
  'ccst-networking',
  'comptia-a-plus-core-1',
  'comptia-a-plus-core-2',
  'comptia-net-plus',
  'comptia-sec-plus',
  'splunk-core-certified-user',
  'terraform-associate',
]

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear())
})

test('all live dashboards render without horizontal overflow or console errors', async ({ page }) => {
  test.setTimeout(60_000)
  const consoleErrors = []
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  for (const certId of LIVE_CERT_IDS) {
    await page.goto(`/${certId}`)
    await expect(page.locator('h1')).toBeVisible()
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow, `${certId} should not overflow horizontally`).toBeLessThanOrEqual(1)
  }

  expect(consoleErrors).toEqual([])
})

test('cross-page path links land on the career-path section', async ({ page }) => {
  await page.goto('/#paths')
  await expect(page.locator('#paths')).toBeVisible()
  await expect.poll(async () => {
    return page.locator('#paths').evaluate(element => Math.round(element.getBoundingClientRect().top))
  }).toBeGreaterThanOrEqual(0)
  await expect.poll(async () => {
    return page.locator('#paths').evaluate(element => Math.round(element.getBoundingClientRect().top))
  }).toBeLessThanOrEqual(100)
})

test('fresh study plan has one diagnostic action and the diagnostic starts from the header', async ({ page }) => {
  await page.goto('/comptia-sec-plus/learning')
  await expect(page.getByRole('heading', { name: 'Get one honest baseline.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Start diagnostic' })).toHaveCount(1)

  await page.getByRole('link', { name: 'Start diagnostic' }).click()
  await expect(page).toHaveURL(/\/comptia-sec-plus\/learning\/diagnostic$/)
  await expect(page.getByText('Diagnostic assessment')).toBeVisible()

  const start = page.getByRole('button', { name: 'Start diagnostic' })
  await expect(start).toBeVisible()
  const box = await start.boundingBox()
  expect(box?.y ?? Number.POSITIVE_INFINITY).toBeLessThan(await page.evaluate(() => window.innerHeight))

  await start.click()
  await expect(page.getByText('No feedback until submission')).toBeVisible()
  const activeOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(activeOverflow).toBeLessThanOrEqual(1)
})

test('empty review queues offer a direct recovery to Smart Practice', async ({ page }) => {
  await page.goto('/comptia-net-plus/quiz')
  await page.locator('button').filter({ hasText: 'Recent Misses' }).click()
  await expect(page.getByText('Nothing is queued here yet.')).toBeVisible()

  await page.getByRole('button', { name: 'Open Smart Practice' }).click()
  await expect(page.getByRole('button', { name: 'Start Practice Session' })).toBeVisible()
})

test('results opened without a completed session explain the recovery path', async ({ page }) => {
  await page.goto('/comptia-net-plus/results')
  await expect(page.getByRole('heading', { name: 'No completed session to review.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Return to Dashboard' })).toBeVisible()
})

test('question reports enter and leave the dialog with keyboard focus intact', async ({ page }) => {
  await page.goto('/clf-c02/quiz')
  await page.getByRole('button', { name: 'Start Practice Session' }).click()
  const trigger = page.getByRole('button', { name: 'Report issue' })
  await trigger.click()

  await expect(page.getByRole('dialog', { name: 'Flag this question' })).toBeVisible()
  await expect(page.getByLabel('Issue type')).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Flag this question' })).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('desktop docs navigation follows the selected section', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'The documentation sidebar is desktop-only.')

  await page.goto('/docs')
  const architecture = page.locator('aside').getByRole('button', { name: 'Architecture' })
  await architecture.click()

  await expect(architecture).toHaveAttribute('aria-current', 'true')
  await expect.poll(async () => {
    return page.locator('#architecture').evaluate(element => Math.round(element.getBoundingClientRect().top))
  }).toBeLessThanOrEqual(128)
})

test('admin report review stays private and offers administrator sign-in', async ({ page }) => {
  await page.goto('/admin/reports')

  await expect(page.getByRole('heading', { name: 'Administrator sign in' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send admin sign-in link' })).toBeVisible()
  await expect(page.getByText('Question report review')).toHaveCount(0)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(1)
})

test('privacy is public while cloud account controls require sign-in', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.getByRole('heading', { name: 'Study without an account. Control your account data.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Anonymous study' })).toBeVisible()
  await expect(page.getByText(/reporter link is removed/i)).toBeVisible()

  await page.goto('/account')
  await expect(page.getByText('Sign in to export or delete cloud-account data.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Delete account' })).toHaveCount(0)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(1)
})

test('support separates technical help from contextual question reports', async ({ page }) => {
  await page.goto('/support')

  await expect(page.getByRole('heading', { name: 'Get unstuck without sending sensitive information.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Question looks wrong' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Open learner docs' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Open account controls' })).toBeVisible()
  await expect(page.getByText('Support email activation is in progress.')).toBeVisible()

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(1)
})
