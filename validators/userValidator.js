// Importações
const { body, validationResult } = require('express-validator')

// Define uma função que retorna um array de regras de validação para o usuário
const userValidationRules = () => {
    // Adiciona regras de validação para o campo user e password
    return [
        // O campo não pode estar vazio, remove espaços em branco e é escapado para evitar ataques XSS
        body('user').notEmpty().trim().escape(),
        body('password').notEmpty().trim().escape()
    ]
}

// Middleware validateUser para validar dados do usuário durante o login
const validateUser = (req, res, next) => {
    // Verifica se há erros de validação nos dados do formulário
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // Se houver erros, define uma mensagem de erro na sessão e redireciona de volta para '/login'
        req.session.errorMessage = "Preencha todos os campos corretamente."
        return res.redirect('/login')
    }
    // Chama o próximo middleware se não houver erros
    next()
};

// Middleware validateNewUser para validar dados de um novo usuário
const validateNewUser = (req, res, next) => {
    // Verifica se há erros de validação nos dados do formulário
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // Se houver erros, renderiza a página 'admin' com uma mensagem de erro
        return res.render('admin', { error: "Por favor, preencha todos os campos corretamente." })
    }
    // Chama o próximo middleware se não houver erros
    next()
}

module.exports = { userValidationRules, validateUser, validateNewUser }