const { test, expect } = require('@playwright/test');
const data = require('./constants/data');
const id = require('./constants/constants');
const { createAdmUser, createUser } = require('./utils');


test.beforeAll(async () => {
       // Cria um usuário adm via API
       await createAdmUser();
       // Cria um usuário via API
       await createUser();
})

test.describe('Login Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest', { timeout: 3000 })
    })
    
    test('login with invalid credentials', async ({ page }) => {
        await page.fill(id.emailInput, data.invalidEmail)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)

        const loginFail = await page.textContent('.alert.alert-secondary.alert-dismissible')
        expect(loginFail).toBe('×Email e/ou senha inválidos')

        //confere se o teste final bate com o screenshot gravado nesse arqivo
        //expect(await page.screenshot()).toMatchSnapshot('invalidLogin.png', { threshold: 0.2 }); 
    })

    test('login with sucess non admin user', async ({ page }) => {
        await page.fill(id.emailInput, data.validEmail)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Serverest Store' })).toBeVisible()
    })

    test('login with sucess admin user', async ({ page }) => {
        await page.fill(id.emailInput, data.validEmailAdmin)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo Barbara' })).toBeVisible()
    })
})