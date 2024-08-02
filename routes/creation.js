const express = require('express');
const { isLogged } = require('../helpers/access');
const router = express.Router();

// rota GET para ir para a pagina de criacao de conteúdo
router.get('/creation', isLogged, (req, res) => {
    // verifica se há um parâmetro de sucesso e renderiza com o modal de feedback
    if (req.query.success) {
        res.render('creation', {
            success: true,
            url: `http://localhost:3000/${req.query.route}`
        });
    } else {
        res.render('creation');
    }
});

// rota POST para receber os dados do formulário e criar uma rota com o título e o conteúdo que o admin passou
router.post('/creation', isLogged, (req, res) => {
    const { url, title, content } = req.body;
    // registro dinâmico de nova rota
    router.get(`/${url}`, (req, res) => {
        res.render('template', { title, content });
    });

    // redireciona para /creation com parâmetro de sucess
    res.redirect(`/creation?success=true&route=${url}`);
});

module.exports = router;