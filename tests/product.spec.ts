import { test, expect } from '@playwright/test';
import * as data from './constants/data';
import * as id from './constants/constants';
import { faker } from '@faker-js/faker';
import { createAdmUser, createNonAdmUser, User } from './utils';

let admUser: User;
let nonAdmUser: User;

test.beforeAll(async () => {
    // Cria um usuário adm e um usuário não adm via API e armazena os dados dos usuários criados
    admUser = await createAdmUser();
    nonAdmUser = await createNonAdmUser();
});

test.describe('Product flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest')
        await page.fill(id.emailInput, admUser.email)
        await page.fill(id.passwordInput, admUser.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo ' + admUser.nome})).toBeVisible()
    })

    const productA= {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        value: faker.number.bigInt({ max: 100n }),
        quantity: faker.number.bigInt({ max: 100n })
    }

    test('Shoubld be able to create a new product with success', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' })).toBeVisible()

        await page.getByTestId('nome').fill(productA.name)
        await page.getByTestId('preco').fill(productA.value.toString())
        await page.getByTestId('descricao').fill(productA.description)
        await page.getByTestId('quantity').fill(productA.quantity.toString())
        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByRole('heading', { name: 'Lista dos Produtos' })).toBeVisible()

        await expect(page.getByRole('cell', { name: productA.name, exact: true })).toBeVisible()
    })

    test('Shoubld be able to create a new product with success and delete it', async ({ page }) => {
        const productB = {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            value: faker.number.bigInt({ max: 100n }),
            quantity: faker.number.bigInt({ max: 100n })
        }

        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' })).toBeVisible()

        await page.getByTestId('nome').fill(productB.name)
        await page.getByTestId('preco').fill(productB.value.toString()) 
        await page.getByTestId('descricao').fill(productB.description)
        await page.getByTestId('quantity').fill(productB.quantity.toString())
        await page.getByTestId('cadastarProdutos').click()

        await expect(page.getByRole('heading', { name: 'Lista dos Produtos' })).toBeVisible()

        await expect(page.getByRole('cell', { name: productB.name, exact: true })).toBeVisible()

        await page.getByRole('row', { name: productB.name }).getByRole('button').nth(1).click()
        await expect(page.getByRole('cell', { name: productB.name, exact: true })).not.toBeVisible()
    })

    test('Should not be able to create a duplicated product', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de produtos' })).toBeVisible()

        await page.getByTestId('nome').fill(productA.name)
        await page.getByTestId('preco').fill(productA.value.toString())
        await page.getByTestId('descricao').fill(productA.description)
        await page.getByTestId('quantity').fill(productA.quantity.toString())
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