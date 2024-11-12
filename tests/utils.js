// utils.js
const axios = require('axios');
const data = require('./constants/data');

async function createAdmUser() {
    const response = await axios.post(`${data.apiUrl}/usuarios`, {
        nome: data.nome,
        email: data.validEmailAdmin,
        password: data.password,
        administrador: 'true'
    });

    if (response.status === 201 && response.data.message === 'Cadastro realizado com sucesso') {
        return response.data._id;
    } else {
        throw new Error('Falha ao criar usuário');
    }
}

async function createUser() {
    const response = await axios.post(`${data.apiUrl}/usuarios`, {
        nome: data.nome,
        email: data.validEmail,
        password: data.password,
        administrador: 'false'
    });

    if (response.status === 201 && response.data.message === 'Cadastro realizado com sucesso') {
        return response.data._id;
    } else {
        throw new Error('Falha ao criar usuário');
    }
}

async function loginAdm() {
    const response = await axios.post(`${data.apiUrl}/login`, {
        email: data.validEmailAdmin,
        password: data.password,
    });

    if (response.status === 200 && response.data.message === 'Login realizado com sucesso') {
        return response.data._id;
    } else {
        throw new Error('Email e/ou senha inválidos');
    }
}



module.exports = { createAdmUser, createUser, loginAdm };