// Importações
const express = require('express')
const router = express.Router()
const adminModel = require('../models/AdminModel.js');
const { userValidationRules, validateUser } = require('../validators/userValidator.js');

// Rota GET para a página de login '/login'
router.get('/login', (req, res) => {
    // Verifica se o usuário já está autenticado e redireciona para '/admin'
    if (req.session.authenticated) res.redirect('/admin')
    else {
        // Caso contrário, obtém a mensagem de erro da sessão
        const errorMessage = req.session.errorMessage
        // Limpa a mensagem de erro da sessão após renderizar a página para o erro sumir se a página for recarregada
        req.session.errorMessage = null
        // Renderiza a página de login com a mensagem de erro (se houver)
        res.render('login', { error: errorMessage })
    }
})

// Rota POST para o processo de login '/login'
// Utiliza middleware userValidationRules e validateUser para validar as entradas do usuário
router.post('/login', userValidationRules(), validateUser, (req, res) => {
    // Obtém os dados do formulário de login
    const { user, password } = req.body
    // Verifica se as credenciais são válidas usando o método do AdminModel
    if (adminModel.validateCredentials(user, password)) {
        // Define a sessão como autenticada e armazena o usuário na sessão
        req.session.authenticated = true
        req.session.user = user
        // Redireciona para a página admin após o login bem-sucedido
        res.redirect('/admin')
    } else {
        // Caso contrário, define uma mensagem de erro na sessão e redireciona de volta para '/login'
        req.session.errorMessage = "Falha ao realizar login."
        res.redirect('/login')
    }
})

// Rota GET para o processo de logout '/logout'
router.get('/logout', (req, res) => {
    // Destroi a sessão
    req.session.destroy()
    // Redireciona de volta para a página home após o logout
    res.redirect('/')
})

module.exports = router