const { test, expect } = require('@playwright/test');
const data = require('./constants/data');
const id = require('./constants/constants');

test.describe('user flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest', { timeout: 3000 })
        await page.fill(id.emailInput, data.validEmailAdmin)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo Barbara' }, { timeout: 3000 })).toBeVisible()
    })

    test('Should be able to create a new user with success', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' }, { timeout: 3000 })).toBeVisible()
 
        await page.getByTestId('nome').fill(data.newName)
        await page.getByTestId('email').fill(data.newEmail)
        await page.getByTestId('password').fill(data.password)
        await page.getByTestId('checkbox').click()
        await page.getByTestId('cadastrarUsuario').click()

        await expect(page.getByRole('heading', { name: 'Lista dos usuários' }, { timeout: 5000 })).toBeVisible()

        await expect(page.getByRole('cell', { name: 'BarbaraNew', exact: true })).toBeVisible()
    })

    test('Should not be able to create a user with same email', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' }, { timeout: 3000 })).toBeVisible()

        await page.getByTestId('nome').fill(data.newEmail)
        await page.getByTestId('email').fill(data.newEmail)
        await page.getByTestId('password').fill(data.password)
        await page.getByTestId('checkbox').click()
        await page.getByTestId('cadastrarUsuario').click()

        await expect(page.getByText('×Este email já está sendo usado', { timeout: 5000 })).toBeVisible()
    })

    test('Should not be able to create a user without mandatory fields', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' }, { timeout: 3000 })).toBeVisible()

        await page.getByTestId('cadastrarUsuario').click()

        await expect(page.getByText('×Nome é obrigatório', { timeout: 5000 })).toBeVisible()
        await expect(page.getByText('×Email é obrigatório', { timeout: 5000 })).toBeVisible()
        await expect(page.getByText('×Password é obrigatório', { timeout: 5000 })).toBeVisible()
    })

    test('Should be able to delete user', async ({ page }) => {
        await page.getByTestId('listar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Lista dos usuários'}, { timeout: 3000 })).toBeVisible()

        await page.getByRole('row', { name: 'BarbaraNew barbara.new@teste.com test123 true' }).getByRole('button').nth(1).click()
        await expect(page.getByRole('cell', { name: 'Produto Teste', exact: true })).not.toBeVisible()
    })

})