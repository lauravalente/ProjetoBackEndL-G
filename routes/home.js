// Importações
const express = require('express');
const router = express.Router();

// Rota GET para a página inicial '/', que renderiza a página 'home'
router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router