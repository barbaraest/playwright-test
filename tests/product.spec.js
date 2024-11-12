const { test, expect } = require('@playwright/test');
const data = require('./data');
const id = require('./constants');

test.describe('product flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest', { timeout: 3000 })
        await page.fill(id.emailInput, data.validEmailAdmin)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo Barbara' }, { timeout: 3000 })).toBeVisible()
    })

    test('Shoubld be able to create a new product with success', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' }, { timeout: 3000 })).toBeVisible()

        await page.getByTestId('nome').fill('Produto Teste')
        await page.getByTestId('preco').fill('100')
        await page.getByTestId('descricao').fill('Descrição do produto teste')
        await page.getByTestId('quantity').fill('10')
        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByRole('heading', { name: 'Lista dos Produtos' }, { timeout: 5000 })).toBeVisible()

        await expect(page.getByRole('cell', { name: 'Produto Teste', exact: true })).toBeVisible()
    })

    test('Should not be able to create a duplicated product', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' }, { timeout: 3000 })).toBeVisible()

        await page.getByTestId('nome').fill('Produto Teste')
        await page.getByTestId('preco').fill('100')
        await page.getByTestId('descricao').fill('Descrição do produto teste')
        await page.getByTestId('quantity').fill('10')
        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByText('×Já existe produto com esse', { timeout: 5000 })).toBeVisible()
    })

    test('Should not be able to create a product without mandatory fields', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' }, { timeout: 3000 })).toBeVisible()

        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByText('×Nome é obrigatório', { timeout: 5000 })).toBeVisible()
        await expect(page.getByText('×Preco é obrigatório', { timeout: 5000 })).toBeVisible()
        await expect(page.getByText('×Descricao é obrigatório', { timeout: 5000 })).toBeVisible()
        await expect(page.getByText('×Quantidade é obrigatório', { timeout: 5000 })).toBeVisible()
    })

    test('Should be able to delete a product', async ({ page }) => {
        await page.getByTestId('listar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Lista dos Produtos' }, { timeout: 5000 })).toBeVisible()

        await page.getByRole('row', { name: 'Produto Teste 100 Descrição' }).getByRole('button').nth(1).click()
        await expect(page.getByRole('cell', { name: 'Produto Teste', exact: true })).not.toBeVisible()
    })
    
})