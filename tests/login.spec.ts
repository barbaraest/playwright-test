import { test, expect } from '@playwright/test';
import * as data from './constants/data';
import * as id from './constants/constants';import { createAdmUser, createNonAdmUser, User } from './utils';

let admUser: User;
let nonAdmUser: User;

test.beforeAll(async () => {
    // Cria um usuário adm e um usuário não adm via API e armazena os dados dos usuários criados
    admUser = await createAdmUser();
    nonAdmUser = await createNonAdmUser();
});

test.describe('Login Flow', () => {``
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest');
    })
    
    test('login with invalid credentials', async ({ page }) => {
        await page.fill(id.emailInput, data.invalidEmail)
        await page.fill(id.passwordInput, data.password)
        await page.click(id.loginButton)

        const loginFail = await page.textContent('.alert.alert-secondary.alert-dismissible')
        expect(loginFail).toBe('×Email e/ou senha inválidos')

        //confere se o teste final bate com o screenshot gravado nesse arqivo
        //expect(await page.screenshot()).toMatchSnapshot('invalidLogin.png'); 
    })

    test('login with sucess non admin user', async ({ page }) => {
        await page.fill(id.emailInput, nonAdmUser.email)
        await page.fill(id.passwordInput, nonAdmUser.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Serverest Store' })).toBeVisible()
    })

    test('login with sucess admin user', async ({ page }) => {
        await page.fill(id.emailInput, admUser.email)
        await page.fill(id.passwordInput, admUser.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo ' + admUser.nome})).toBeVisible()
    })
})