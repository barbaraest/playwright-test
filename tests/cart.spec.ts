import { test, expect } from '@playwright/test';
import * as data from './constants/data';
import * as id from './constants/constants';

test.describe('Cart Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest')
        await page.fill(id.emailInput, data.validEmail)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Serverest Store' })).toBeVisible()
    })

    test('Should be able to add product shopping list and add to cart with non admin user', async ({ page }) => {
        await page.getByTestId('adicionarNaLista').first().click()
        await expect(page.url()).toBe('https://front.serverest.dev/minhaListaDeProdutos')
        await expect(page.getByRole('heading', { name: 'Lista de Compras' })).toBeVisible()

        await page.getByTestId('adicionar carrinho').click()
        await expect(page.url()).toBe('https://front.serverest.dev/carrinho')
    })

    test('Should be able to add product shopping list and add to a cart and remove it with non admin user', async ({ page }) => {
        await page.getByTestId('adicionarNaLista').first().click()
        await expect(page.url()).toBe('https://front.serverest.dev/minhaListaDeProdutos')
        await expect(page.getByRole('heading', { name: 'Lista de Compras' })).toBeVisible()

        await page.getByTestId('limparLista').click()
        await expect(page.getByTestId('shopping-cart-empty-message')).toHaveText('Seu carrinho está vazio')
    })

    test('Should be able to search product by text in shopping list with non admin user ', async ({ page }) => {
        await page.fill('[data-testid="pesquisar"]', 'Teclado Gamer')
        await page.getByTestId('botaoPesquisar').click()

        const productName = await page.textContent('.card-title.negrito')
        expect(productName).toBe('Teclado Gamer')
    })

    test('Should be able to see error message for searching no existing product by text in shopping list with non admin user ', async ({ page }) => {
        await page.fill('[data-testid="pesquisar"]', 'Teclado testes')
        await page.getByTestId('botaoPesquisar').click()

        const productNotFound = await page.textContent('#root > div > div > div.container-fluid > div > section > div > div > div > p')
        expect(productNotFound).toBe('Nenhum produto foi encontrado')
    })
})