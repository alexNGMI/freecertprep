import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear()
    Math.random = () => 0.001
  })
})

test('home, catalog, docs, and live cert dashboard render', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Choose a direction/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Browse All Certs/i })).toBeVisible()

  await page.goto('/catalog')
  await expect(page.getByRole('heading', { name: /Live certs first/i })).toBeVisible()
  await expect(page.getByText('9 live modules')).toBeVisible()
  await expect(page.getByRole('link', { name: /Cisco CCST Networking/i })).toBeVisible()
  await expect(page.getByLabel(/Cisco CCNA coming soon/i)).toBeVisible()

  await page.goto('/docs')
  await expect(page.getByRole('heading', { name: 'freecertprep' })).toBeVisible()

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
