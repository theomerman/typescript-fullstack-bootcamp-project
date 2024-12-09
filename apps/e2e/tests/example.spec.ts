import { test, expect } from '@playwright/test'

test.describe('Search page description', () => {
    test('has title collection', async ({ page }) => {
        await page.goto('http://localhost:5173')
        const collectionSummer = page.getByText('summer')
        await collectionSummer.dblclick()
        await page.getByRole('button', { name: '$230.00 USD' }).click()
        await expect(page.getByText('Green')).toBeVisible()
    })
})
