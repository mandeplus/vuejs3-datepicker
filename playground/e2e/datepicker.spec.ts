import { test, expect } from '@playwright/test';

// UTC handling bugs only show up when the browser is ahead of or behind UTC
const timezones = ['UTC', 'Asia/Beirut', 'America/New_York', 'Pacific/Pago_Pago', 'Pacific/Kiritimati'];

for (const timezoneId of timezones) {
  test.describe(`timezone ${timezoneId}`, () => {
    test.use({ timezoneId });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('day view with use-utc selects the clicked day', async ({ page }) => {
      const section = page.locator('#day');
      await section.locator('.vuejs3-datepicker__value').click();
      await section.locator('.cell.day:not(.blank)', { hasText: /^20$/ }).click();

      await expect(page.getByTestId('day-value')).toHaveText('2024-01-20T00:00:00.000Z');
      await expect(section.locator('.vuejs3-datepicker__value')).toContainText('2024-01-20');
    });

    test('month view with use-utc selects the clicked month', async ({ page }) => {
      const section = page.locator('#month');
      await section.locator('.vuejs3-datepicker__value').click();
      await section.locator('.cell.month', { hasText: /^Mar/ }).click();

      await expect(page.getByTestId('month-value')).toHaveText('2024-03-01T00:00:00.000Z');
    });

    test('disabled range covers its start and end dates', async ({ page }) => {
      const disabled = await page.locator('#range .cell.day.disabled').allTextContents();

      expect(disabled.map((text) => text.trim())).toEqual(['10', '11', '12']);
    });
  });
}
