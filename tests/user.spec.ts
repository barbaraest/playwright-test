import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as data from './constants/data';
import * as id from './constants/constants';


test.describe('Create user flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest')
        await page.fill(id.emailInput, data.validEmailAdmin)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo Barbara'})).toBeVisible()
    })

    const fake = {
        password: faker.internet.password(),
        newName: faker.name.firstName(),
        newEmail: faker.internet.email(),
    };

    test('Should be able to create a new user with success', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' })).toBeVisible()
 
        await page.getByTestId('nome').fill(fake.newName)
        await page.getByTestId('email').fill(fake.newEmail)
        await page.getByTestId('password').fill(fake.password)
        await page.getByTestId('checkbox').click()
        await page.getByTestId('cadastrarUsuario').click()

        await expect(page.getByRole('heading', { name: 'Lista dos usuários' })).toBeVisible()

        await expect(page.getByRole('cell', { name: fake.newName, exact: true })).toBeVisible()
    })

    test('Should not be able to create a user with same email', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' })).toBeVisible()

        await page.getByTestId('nome').fill(fake.newName)
        await page.getByTestId('email').fill(fake.newEmail)
        await page.getByTestId('password').fill(fake.password)
        await page.getByTestId('checkbox').click()
        await page.getByTestId('cadastrarUsuario').click()

        await expect(page.getByText('×Este email já está sendo usado')).toBeVisible()
    })

    test('Should not be able to create a user without mandatory fields', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' })).toBeVisible()

        await page.getByTestId('cadastrarUsuario').click()

        await expect(page.getByText('×Nome é obrigatório')).toBeVisible()
        await expect(page.getByText('×Email é obrigatório')).toBeVisible()
        await expect(page.getByText('×Password é obrigatório')).toBeVisible()
    })

    test('Should be able to delete user', async ({ page }) => {
        await page.getByTestId('listar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Lista dos usuários'})).toBeVisible()

        await page.getByRole('row', { name: fake.newName}).getByRole('button').nth(1).click()
        await expect(page.getByRole('cell', { name: 'Produto Teste', exact: true })).not.toBeVisible()
    })

})