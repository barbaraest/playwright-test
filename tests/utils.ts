import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';

interface User {
    nome: string;
    email: string;
    password: string;
    administrador: string;
}

async function createAdmUser(): Promise<User> {
    const userADM: User = {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
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
            return userADM;
        } else {
            throw new Error('Falha ao criar usuário');
        }
    } catch (error) {
        throw new Error(`Erro na requisição: ${error}`);
    }
}

async function createNonAdmUser(): Promise<User> {
    const userNonADM: User = {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'false'
    };

    const apiUrl = 'https://serverest.dev';

    try {
        const response = await fetch(`${apiUrl}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userNonADM)
        });

        const responseData = await response.json();

        if (response.status === 201 && responseData.message === 'Cadastro realizado com sucesso') {
            return userNonADM;
        } else {
            throw new Error('Falha ao criar usuário');
        }
    } catch (error) {
        throw new Error(`Erro na requisição: ${error}`);
    }
}

export { createAdmUser, createNonAdmUser, User };