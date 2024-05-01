const express = require('express');
const router = express.Router();

// Rota GET para ir para a pagina de criacao de conteúdo /creation
router.get('/creation', (req, res) => {
    res.render('creation')
})

module.exports = router