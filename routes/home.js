// Importações
const express = require('express');
const router = express.Router();
const RecipeModel = require('../models/RecipeModel');

// Rota GET para a página inicial '/', que renderiza a página 'home'
router.get('/', (req, res) => {
    const recipes = RecipeModel.getAllRecipes();
    res.render('home', {recipes})
})

module.exports = router