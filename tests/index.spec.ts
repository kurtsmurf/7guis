import { test, expect } from '@playwright/test'

test('counter', async ({ page }) => {
  await page.goto('/')
  await page.locator('button:has-text("Count")').click();
  await page.locator('button:has-text("Count")').click();
  await page.locator('button:has-text("Count")').click();
  await page.locator('button:has-text("Count")').click();
  await page.locator('button:has-text("Count")').click();
  await expect(page.locator('text=CounterCount >> input[type="number"]')).toHaveValue('5')
})