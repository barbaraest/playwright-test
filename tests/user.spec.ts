import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as data from './constants/data';
import * as id from './constants/constants';
import { createAdmUser, createNonAdmUser, User } from './utils';

let admUser: User;
let nonAdmUser: User;

test.beforeAll(async () => {
    // Cria um usuário adm e um usuário não adm via API e armazena os dados dos usuários criados
    admUser = await createAdmUser();
    nonAdmUser = await createNonAdmUser();
});

test.describe('Create user flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(data.url)
        const title = await page.title()
        expect(title).toBe('Front - ServeRest')
        await page.fill(id.emailInput, admUser.email)
        await page.fill(id.passwordInput, admUser.password)
        await page.click(id.loginButton)
        await expect(page.getByRole('heading', { name: 'Bem vindo ' + admUser.nome})).toBeVisible()
    })

    const user = {
        password: faker.internet.password(),
        newName: faker.person.firstName(),
        newEmail: faker.internet.email(),
    };

    test('Should be able to create a new user with success', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' })).toBeVisible()
 
        await page.getByTestId('nome').fill(user.newName)
        await page.getByTestId('email').fill(user.newEmail)
        await page.getByTestId('password').fill(user.password)
        await page.getByTestId('checkbox').click()
        await page.getByTestId('cadastrarUsuario').click()

        await expect(page.getByRole('heading', { name: 'Lista dos usuários' })).toBeVisible()

        await expect(page.getByRole('cell', { name: user.newName, exact: true })).toBeVisible()
    })

    test('Should not be able to create a user with same email', async ({ page }) => {
        await page.getByTestId('cadastrar-usuarios').click()
        await expect(page.getByRole('heading', { name: 'Cadastro de Usuários' })).toBeVisible()

        await page.getByTestId('nome').fill(user.newName)
        await page.getByTestId('email').fill(user.newEmail)
        await page.getByTestId('password').fill(user.password)
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

        await page.getByRole('row', { name: user.newName}).getByRole('button').nth(1).click()
        await expect(page.getByRole('cell', { name: 'Produto Teste', exact: true })).not.toBeVisible()
    })

})