import { test, expect } from '@playwright/test';
import * as data from './constants/data';
import * as id from './constants/constants';

test.describe('Product flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest')
        await page.fill(id.emailInput, data.validEmailAdmin)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo Barbara' })).toBeVisible()
    })

    test('Shoubld be able to create a new product with success', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' })).toBeVisible()

        await page.getByTestId('nome').fill('Teclado Gamer')
        await page.getByTestId('preco').fill('100')
        await page.getByTestId('descricao').fill('Teclado Gamer sem fio')
        await page.getByTestId('quantity').fill('10')
        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByRole('heading', { name: 'Lista dos Produtos' })).toBeVisible()

        await expect(page.getByRole('cell', { name: 'Teclado Gamer', exact: true })).toBeVisible()
    })

    test('Shoubld be able to create a new product with success and delete it', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' })).toBeVisible()

        await page.getByTestId('nome').fill('Produto Teste playright')
        await page.getByTestId('preco').fill('100')
        await page.getByTestId('descricao').fill('Descrição do produto teste')
        await page.getByTestId('quantity').fill('10')
        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByRole('heading', { name: 'Lista dos Produtos' })).toBeVisible()

        await expect(page.getByRole('cell', { name: 'Produto Teste playright', exact: true })).toBeVisible()

        await page.getByRole('row', { name: 'Produto Teste playright 100 Descrição' }).getByRole('button').nth(1).click()
        await expect(page.getByRole('cell', { name: 'Produto Teste playright', exact: true })).not.toBeVisible()
    })

    test('Should not be able to create a duplicated product', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' })).toBeVisible()

        await page.getByTestId('nome').fill('Teclado Gamer')
        await page.getByTestId('preco').fill('100')
        await page.getByTestId('descricao').fill('Teclado Gamer sem fio')
        await page.getByTestId('quantity').fill('10')
        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByText('×Já existe produto com esse')).toBeVisible()
    })

    test('Should not be able to create a product without mandatory fields', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' })).toBeVisible()

        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByText('×Nome é obrigatório')).toBeVisible()
        await expect(page.getByText('×Preco é obrigatório')).toBeVisible()
        await expect(page.getByText('×Descricao é obrigatório')).toBeVisible()
        await expect(page.getByText('×Quantidade é obrigatório')).toBeVisible()
    })    
})