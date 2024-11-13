import { test, expect } from '@playwright/test';
import * as data from './constants/data';
import * as id from './constants/constants';

test.describe('user flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest')
        await page.fill(id.emailInput, data.validEmailAdmin)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo Barbara'})).toBeVisible()
    })

    test('Should be able to create a new user with success', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' })).toBeVisible()
 
        await page.getByTestId('nome').fill(data.newName)
        await page.getByTestId('email').fill(data.newEmail)
        await page.getByTestId('password').fill(data.password)
        await page.getByTestId('checkbox').click()
        await page.getByTestId('cadastrarUsuario').click()

        await expect(page.getByRole('heading', { name: 'Lista dos usuários' })).toBeVisible()

        await expect(page.getByRole('cell', { name: 'BarbaraNew', exact: true })).toBeVisible()
    })

    test('Should not be able to create a user with same email', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' })).toBeVisible()

        await page.getByTestId('nome').fill(data.newEmail)
        await page.getByTestId('email').fill(data.newEmail)
        await page.getByTestId('password').fill(data.password)
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

        await page.getByRole('row', { name: 'BarbaraNew barbara.new@teste.com test123 true' }).getByRole('button').nth(1).click()
        await expect(page.getByRole('cell', { name: 'Produto Teste', exact: true })).not.toBeVisible()
    })

})