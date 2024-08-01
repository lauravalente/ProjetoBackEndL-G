const express = require('express');
const router = express.Router();
const pageModel = require('../models/PageModel.js');
const { isLogged } = require('../helpers/access.js');

// Registra uma rota dinâmica
const addDynamicRoute = (url, title, content) => {
    removeDynamicRoute(url);
    router.get(`/pages/${url}`, (req, res) => {
        res.render('template', { title, content });
    });
}

// Remove uma rota existente
const removeDynamicRoute = (url) => {
    const routePath = `/pages/${url}`;
    const routesToRemove = router.stack.filter(layer => layer.route && layer.route.path === routePath);
    routesToRemove.forEach(route => {
        router.stack.splice(router.stack.indexOf(route), 1);
    });
}

// Inicializa rotas dinâmicas a partir do modelo de páginas
const setupDynamicRoutes = () => {
    const allPages = pageModel.getAllPages();
    allPages.forEach(page => {
        addDynamicRoute(page.URL, page.title, page.content);
    });
}

// Adiciona uma nova página
router.post('/newPage', isLogged, (req, res) => {
    const { url, title, content } = req.body;
    const userId = req.session.admin.id;

    if (!pageModel.addPage(userId, url, title, content)) {
        return res.status(400).json({ errors: ['Uma página com essa URL já existe.'] });
    }

    addDynamicRoute(url, title, content);
    return res.redirect('/admin');
});

// Edita uma página existente
router.post('/editPage', isLogged, (req, res) => {
    const { url, title, content } = req.body;
    const userId = req.session.admin.id;

    if (!pageModel.editPage(userId, url, title, content)) {
        return res.status(400).json({ errors: ['Não foi possível encontrar a página para editar.'] });
    }

    addDynamicRoute(url, title, content);
    res.redirect('/admin');
});

// Exclui uma página
router.post('/deletePage', isLogged, (req, res) => {
    const { url } = req.body;
    const userId = req.session.admin.id;

    if (!pageModel.deletePage(userId, url)) {
        return res.status(400).json({ error: 'Erro ao excluir a página.' });
    }

    removeDynamicRoute(url);
    res.redirect('/admin');
});

// Configura as rotas dinâmicas ao iniciar o servidor
setupDynamicRoutes();

module.exports = router;
