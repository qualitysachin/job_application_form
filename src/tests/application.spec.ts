import { test, expect } from "@playwright/test"

test("complete application flow", async ({ page }) => {
  await page.goto("/")
  await page.fill('input[placeholder="Name"]', "John Doe")
  await page.fill('input[placeholder="Email"]', "john@test.com")
  await page.fill('input[placeholder="Phone"]', "999999999")
  await page.click("text=Next")

  await page.click("text=Add Experience")
  await page.fill('input[placeholder="Company"]', "Acme")
  await page.fill('input[placeholder="Role"]', "Dev")
  await page.fill('input[type="number"]', "3")
  await page.click("text=Next")

  await page.click("text=React")
  await page.click("text=TypeScript")
  await page.click("text=Next")

  await expect(page.locator("text=Submit")).toBeVisible()
})
