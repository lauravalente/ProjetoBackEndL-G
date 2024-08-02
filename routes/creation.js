const express = require('express');
const { isLogged } = require('../helpers/access');
const router = express.Router();
const RecipeModel = require('../models/RecipeModel');
const loadDynamicRoutes = require('../models/DynamicRoutes');


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
    const newRecipe = { url, title, content, createdAt: new Date() };
    RecipeModel.addRecipe(newRecipe);

    // Recarrega as rotas dinâmicas
    loadDynamicRoutes(req.app);

    res.redirect(`/creation?success=true&route=${url}`);
});

// Rota para exibir o formulário de edição de uma receita
router.get('/edit/:url', isLogged, (req, res) => {
    const url = req.params.url;
    const recipes = RecipeModel.getAllRecipes();
    const recipe = recipes.find(r => r.url === url);
    if (recipe) {
        res.render('edit', { recipe });
    } else {
        res.status(404).send('Página não encontrada');
    }
});

router.get('/:url', (req, res) => {
    const recipe = RecipeModel.getAllRecipes().find(r => r.url === req.params.url);
    if (recipe) {
        res.render('template', {
            title: recipe.title,
            content: recipe.content,
            url: req.params.url
        });
    } else {
        res.status(404).send('Receita não encontrada');
    }
});

// Rota para deletar uma receita específica
router.post('/delete/:url', isLogged, (req, res) => {
    let recipes = RecipeModel.getAllRecipes();
    recipes = recipes.filter(r => r.url !== req.params.url); // Remove a receita correspondente

    RecipeModel.saveRecipes(recipes); // Salva a lista de receitas atualizada

    // Recarrega as rotas dinâmicas para refletir a remoção
    loadDynamicRoutes(req.app);

    res.redirect('/'); // Redireciona para a página inicial ou outra página apropriada
});

// Rota para salvar a edição da receita
router.post('/edit/:url', isLogged, (req, res) => {
    const url = req.params.url;
    const { title, content } = req.body;
    let recipes = RecipeModel.getAllRecipes();

    const recipeIndex = recipes.findIndex(r => r.url === url);
    if (recipeIndex !== -1) {
        recipes[recipeIndex].title = title;
        recipes[recipeIndex].content = content;
        RecipeModel.saveRecipes(recipes);

        // Recarrega as rotas dinâmicas
        loadDynamicRoutes(req.app);

        res.redirect(`/${url}`);
    } else {
        res.status(404).send('Página não encontrada');
    }
});

module.exports = router;