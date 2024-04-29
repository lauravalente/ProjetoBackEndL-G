module.exports = {
    // Função middleware que verifica se o usuário está autenticado
    isLogged: (req, res, next) => {
        // Verifica se a propriedade authenticated da sessão é verdadeira (ou seja, se o usuário está autenticado)
        if (req.session.authenticated) {
            // Se o usuário estiver autenticado, a função 'next()' é chamada, permitindo que o fluxo continue para o próximo middleware ou rota
            return next()
        }
        else {
            // Se o usuário não estiver autenticado, uma mensagem de erro é armazenada na sessão
            req.session.errorMessage = "Usuário não autenticado"
            // Redireciona o usuário para a rota "/login"
            res.redirect("/login")
        }
    }
}
