import { test, expect } from '@playwright/test';
import { seed } from '../src/seed.js';
import { Operation, History } from '../src/models.js'

test.describe('test', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async () => {
    await seed();
  })

  test('Deberia tener como titulo de pagina recalc', async ({ page }) => {
    await page.goto('./');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/recalc/i);
  });

  test('Deberia poder realizar una resta', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '7' }).click()
    await page.getByRole('button', { name: '9' }).click()
    await page.getByRole('button', { name: '-' }).click()
    await page.getByRole('button', { name: '9' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/sub/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(70);

    await expect(page.getByTestId('display')).toHaveValue(/70/)

    const operation = await Operation.findOne({
      where: {
        name: "SUB"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(79)
    expect(historyEntry.secondArg).toEqual(9)
    expect(historyEntry.result).toEqual(70)
  });
  
  test('Deberia poder realizar una suma', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: '9' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/add/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(14);

    await expect(page.getByTestId('display')).toHaveValue(/14/)

    const operation = await Operation.findOne({
      where: {
        name: "ADD"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(5)
    expect(historyEntry.secondArg).toEqual(9)
    expect(historyEntry.result).toEqual(14)
  });

  test('Deberia poder realizar una multiplicación', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: '*' }).click()
    await page.getByRole('button', { name: '4' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/mul/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(20);

    await expect(page.getByTestId('display')).toHaveValue(/20/)

    const operation = await Operation.findOne({
      where: {
        name: "MUL"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(5)
    expect(historyEntry.secondArg).toEqual(4)
    expect(historyEntry.result).toEqual(20)
  });

  test('Deberia poder realizar una division', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '6' }).click()
    await page.getByRole('button', { name: '0' }).click()
    await page.getByRole('button', { name: '/' }).click()
    await page.getByRole('button', { name: '2' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/div/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(30);

    await expect(page.getByTestId('display')).toHaveValue(/30/)

    const operation = await Operation.findOne({
      where: {
        name: "DIV"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(60)
    expect(historyEntry.secondArg).toEqual(2)
    expect(historyEntry.result).toEqual(30)
  });

  test('Deberia arrojar error al dividir un numero por 0', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '6' }).click()
    await page.getByRole('button', { name: '/' }).click()
    await page.getByRole('button', { name: '0' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/div/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { error } = await response.json();
    expect(error).toBe(undefined);

    await expect(page.getByTestId('display')).toHaveValue(/undefined/)
  });

  test('Debería limpiar el display', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: 'c' }).click();

    await page.waitForSelector('[data-testid="display"]');
    await expect(page.getByTestId('display')).toHaveValue('');
  });

  test('Debería poder realizar una sqrt', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '1' }).click()
    await page.getByRole('button', { name: '6' }).click()
    await page.getByRole('button', { name: '√' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/sqrt/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(4);

    await expect(page.getByTestId('display')).toHaveValue(/4/)

    const operation = await Operation.findOne({
      where: {
        name: "SQRT"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(16)
    expect(historyEntry.secondArg).toEqual(null)
    expect(historyEntry.result).toEqual(4)
  });

  test('Debería poder realizar una potencia', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '2' }).click()
    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: '^' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/pow/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(625);

    await expect(page.getByTestId('display')).toHaveValue(/625/)

    const operation = await Operation.findOne({
      where: {
        name: "POW"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(25)
    expect(historyEntry.secondArg).toEqual(null)
    expect(historyEntry.result).toEqual(625)
  });


})