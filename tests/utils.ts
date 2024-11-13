import * as data from './constants/data';

interface User {
    nome: string;
    email: string;
    password: string;
    administrador: string;
}

async function createAdmUser(): Promise<string> {
    const userADM: User = {
        nome: data.name,
        email: data.validEmailAdmin,
        password: data.password,
        administrador: 'true'
    };
    console.log('Enviando dados do usuário:', userADM);

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
        nome: data.name,
        email: data.validEmail,
        password: data.password,
        administrador: 'false'
    };

    console.log('Enviando dados do usuário:', user);
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

export { createAdmUser, createUser };