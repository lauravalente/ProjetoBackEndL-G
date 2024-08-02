const express = require('express');
const RecipeModel = require('./RecipeModel');
const router = express.Router();

// Função para carregar rotas dinamicamente
function loadDynamicRoutes(app) {
  const recipes = RecipeModel.getAllRecipes();
  
  // Remove rotas antigas
  app._router.stack = app._router.stack.filter(r => !(r.route && r.route.path && recipes.some(recipe => recipe.url === r.route.path)));

  // Adiciona novas rotas para cada receita
  recipes.forEach(recipe => {
    app.get(`/${recipe.url}`, (req, res) => {
      res.render('template', { title: recipe.title, content: recipe.content });
    });
  });
}

module.exports = loadDynamicRoutes;
