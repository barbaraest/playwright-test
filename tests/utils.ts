import * as data from './constants/data';
import { faker } from '@faker-js/faker';

interface User {
    nome: string;
    email: string;
    password: string;
    administrador: string;
}

const admUser = {
    password: faker.internet.password(),
    name: faker.person.firstName(),
    email: faker.internet.email()
};

const regularUser = {
    password: faker.internet.password(),
    name: faker.person.firstName(),
    email: faker.internet.email()
};

async function createAdmUser(): Promise<string> {
    const userADM: User = {
        nome: admUser.name,
        email: admUser.email,
        password: admUser.password,
        administrador: 'true'
    };

    const apiUrl = 'https://serverest.dev';

    try {
        const response = await fetch(`${apiUrl}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userADM)
        });

        const responseData = await response.json();

        if (response.status === 201 && responseData.message === 'Cadastro realizado com sucesso') {
            return responseData._id;
        } else {
            throw new Error('Falha ao criar usuário');
        }
    } catch (error) {
        throw new Error(`Erro na requisição: ${error}`);
    }
}

async function createUser(): Promise<string> {
    const user: User = {
        nome: regularUser.name,
        email: regularUser.email,
        password: regularUser.password,
        administrador: 'false'
    };

    const apiUrl = 'https://serverest.dev';

    try {
        const response = await fetch(`${apiUrl}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const responseData = await response.json();

        if (response.status === 201 && responseData.message === 'Cadastro realizado com sucesso') {
            return responseData._id;
        } else {
            throw new Error('Falha ao criar usuário');
        }
    } catch (error) {
        throw new Error(`Erro na requisição: ${error}`);
    }
}

export { createAdmUser, createUser, admUser, regularUser };