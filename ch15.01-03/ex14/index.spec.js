import { test, expect } from "@playwright/test";

test.describe("Category select", () => {
  test("When initial value is 'all', all items are visible", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");

    await page.getByTestId('select').selectOption('all');

    await expect(page.getByTestId('food1')).toBeVisible();
    await expect(page.getByTestId('stationery1')).toBeVisible();
    await expect(page.getByTestId('stationery2')).toBeVisible();
  });

  test("When 'food' is selected, only food items are visible", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");

    await page.getByTestId('select').selectOption('food');

    await expect(page.getByTestId('food1')).toBeVisible();
    await expect(page.getByTestId('stationery1')).not.toBeVisible();
    await expect(page.getByTestId('stationery2')).not.toBeVisible();
  });

  test("When 'stationery' is selected, only stationery items are visible", async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");

    await page.getByTestId('select').selectOption('stationery');

    await expect(page.getByTestId('stationery1')).toBeVisible();
    await expect(page.getByTestId('stationery2')).toBeVisible();
    await expect(page.getByTestId('food1')).not.toBeVisible();
  });
});