import { test, expect } from '@playwright/test';
import * as data from './constants/data';
import { emailInput, passwordInput, loginButton } from './constants/constants';
import { createAdmUser, createUser, admUser, regularUser } from './utils';

test.beforeAll(async () => {
       // Cria um usuário adm via API
       await createAdmUser();
       // Cria um usuário via API
       await createUser();
})

test.describe('Login Flow', () => {``
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest');
    })
    
    test('login with invalid credentials', async ({ page }) => {
        await page.fill(emailInput, data.invalidEmail)
        await page.fill(passwordInput, data.password)
        await page.click(loginButton)

        const loginFail = await page.textContent('.alert.alert-secondary.alert-dismissible')
        expect(loginFail).toBe('×Email e/ou senha inválidos')

        //confere se o teste final bate com o screenshot gravado nesse arqivo
        expect(await page.screenshot()).toMatchSnapshot('invalidLogin.png'); 
    })

    test('login with sucess non admin user', async ({ page }) => {
        await page.fill(emailInput, regularUser.email)
        await page.fill(passwordInput, regularUser.password)
        await page.click(loginButton)
        await expect(page.getByRole('heading', { name: 'Serverest Store' })).toBeVisible()
    })

    test('login with sucess admin user', async ({ page }) => {
        await page.fill(emailInput, admUser.email)
        await page.fill(passwordInput, admUser.password)
        await page.click(loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo ' + admUser.name})).toBeVisible()
    })
})