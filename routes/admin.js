// Importações
const express = require('express');
const router = express.Router();
const adminModel = require('../models/AdminModel.js');
const { isLogged } = require('../helpers/access.js');
const { userValidationRules, validateNewUser } = require('../validators/userValidator.js');

// Rota GET para a página '/admin', que só é acessível se o usuário estiver autenticado
// Utiliza middleware isLogged para verificar se o usuário está logado
router.get('/admin', isLogged, (req, res) => {
    res.render('admin')
})

// Rota POST para a página '/admin' para adicionar um novo administrador
// Utiliza middleware isLogged para verificar se o usuário está logado
// Utiliza middleware userValidationRules e validateNewUser para validar as entradas do usuário
router.post('/admin', isLogged, userValidationRules(), validateNewUser, (req, res) => {
    // Obtém os dados do formulário
    const { user, password } = req.body;
    // Tenta adicionar o novo administrador usando o método do AdminModel
    if (adminModel.addAdministrator(user, password)) {
        // Redireciona para a página admin após adicionar com sucesso
        res.redirect('/admin');
    } else {
        // Renderiza a página admin com mensagem de erro em caso de falha
        res.render('admin', { error: "Erro ao criar usuário." });
    }
});

module.exports = router