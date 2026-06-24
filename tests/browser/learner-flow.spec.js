import { Buffer } from 'node:buffer'
import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear()
    Math.random = () => 0.001
  })
})

async function beginExam(page, certPath) {
  await page.goto(`${certPath}/exam`)
  await page.getByRole('button', { name: /Begin Readiness Simulation/i }).click()
  await expect(page.getByRole('heading', { name: /Exam Simulator/i })).toBeVisible()
}

async function expectQuestionSignals(page, signals, questionCount) {
  const remaining = new Map(signals.map((signal) => [String(signal), signal]))

  for (let questionNumber = 1; questionNumber <= questionCount; questionNumber += 1) {
    const questionButton = page.getByRole('button', {
      name: new RegExp(`^Go to question ${questionNumber}( answered)?$`, 'i'),
    })
    await questionButton.evaluate(button => button.click())

    for (const [key, signal] of remaining) {
      if (await page.getByText(signal).first().isVisible().catch(() => false)) {
        remaining.delete(key)
      }
    }

    if (remaining.size === 0) return
  }

  throw new Error(`Could not find question signals: ${[...remaining.keys()].join(', ')}`)
}

test('home, catalog, docs, and live cert dashboard render', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Choose a direction/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Browse All Certs/i })).toBeVisible()

  await page.goto('/catalog')
  await expect(page.getByRole('heading', { name: /Live certs first/i })).toBeVisible()
  await expect(page.getByText('9 exams')).toBeVisible()
  await expect(page.getByRole('link', { name: /Cisco CCST Networking/i })).toBeVisible()
  await expect(page.getByLabel(/Cisco CCNA coming soon/i)).toBeVisible()

  await page.goto('/docs')
  await expect(page.getByRole('heading', { name: 'freecertprep' })).toBeVisible()

  await page.goto('/account')
  await expect(page.getByRole('heading', { name: /Study anywhere without losing your place/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Send magic link/i })).toBeVisible()
  await expect(page.getByText(/Optional account layer/i)).toBeVisible()

  await page.goto('/comptia-net-plus')
  await expect(page.getByRole('heading', { name: /CompTIA Network\+/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Start Diagnostic|Open Study Plan/i })).toBeVisible()
})

test('practice route starts and accepts an answer', async ({ page }) => {
  await page.goto('/clf-c02/quiz')
  await page.getByRole('button', { name: /Start Practice Session/i }).click()
  await expect(page.getByText(/Practice Quiz/i)).toBeVisible()

  await page.locator('button').filter({ hasText: /^A/ }).first().click()

  await expect(page.getByText(/Correct!|Incorrect/i)).toBeVisible()
  await expect(page.getByRole('button', { name: /Next Question|See Results/i })).toBeVisible()
})

test('exam route can submit and display results', async ({ page }) => {
  await page.goto('/clf-c02/exam')
  await page.getByRole('button', { name: /Begin Readiness Simulation/i }).click()
  await expect(page.getByRole('heading', { name: /Exam Simulator/i })).toBeVisible()

  await page.getByRole('button', { name: /^Submit Exam$/i }).click()
  await expect(page.getByRole('dialog', { name: /Submit with/i })).toBeVisible()
  await page.getByRole('button', { name: /Submit Anyway/i }).click()

  await expect(page).toHaveURL(/\/clf-c02\/results/)
  await expect(page.getByRole('heading', { name: /Readiness Results/i })).toBeVisible()
})

test('live cert exam forms expose the high-value interaction formats', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'desktop-only format sweep keeps the smoke suite quick')
  test.setTimeout(60_000)

  await beginExam(page, '/comptia-net-plus')
  await expectQuestionSignals(page, [
    /Interpret command output/i,
    /Read the topology/i,
    /Repair the config/i,
    /Subnetting drill/i,
  ], 90)

  await beginExam(page, '/comptia-a-plus-core-1')
  await expectQuestionSignals(page, [/PBQ-lite matching/i], 90)

  await beginExam(page, '/terraform-associate')
  await expectQuestionSignals(page, [/True or false/i], 57)

  await beginExam(page, '/splunk-core-certified-user')
  await expectQuestionSignals(page, [/Search evidence/i], 60)
})

test('dashboard progress can be exported and imported', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'desktop-only data-control smoke keeps CI fast')

  await page.goto('/clf-c02')

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: /Export/i }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(/^freecertprep-progress-\d{4}-\d{2}-\d{2}\.json$/)

  await page.locator('input[type="file"]').setInputFiles({
    name: 'freecertprep-progress-import.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({
      'clf-c02': {
        quizHistory: [],
        examHistory: [],
      },
    })),
  })

  await expect(page.getByRole('heading', { name: /AWS Cloud Practitioner/i })).toBeVisible()
})
