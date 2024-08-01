const fs = require('fs');

// Classe para gerenciar páginas
class PageModel {
    constructor() {
        if (PageModel.instance) return PageModel.instance;
        
        this.pages = {};
        this.loadPages();

        PageModel.instance = this;
    }

    // Adiciona uma nova página
    addPage(userId, URL, title, content) {

        if (this.findPageByURL(URL)) return false;

        if (!this.pages[userId]) {
            this.pages[userId] = [];
        }

        this.pages[userId].push({ URL, title, content });
        this.savePages();

        return true;
    }

    // Edita uma página existente
    editPage(userId, URL, newTitle, newContent) {

        const page = this.pages[userId]?.find(page => page.URL === URL);

        if (!page) return false;

        page.title = newTitle;
        page.content = newContent;

        this.savePages();

        return true;
    }

    // Remove uma página
    deletePage(userId, URL) {

        const index = this.pages[userId]?.findIndex(page => page.URL === URL);

        if (index === -1 || index === undefined) return false;

        this.pages[userId].splice(index, 1);

        if (this.pages[userId].length === 0) {
            delete this.pages[userId];
        }

        this.savePages();

        return true;
    }

    // Carrega páginas do arquivo 'pages.json'
    loadPages() {
        try {
            const data = fs.readFileSync('pages.json', 'utf8');
            this.pages = JSON.parse(data);
        } catch (err) {
            console.error('Erro ao carregar as páginas:', err.message);
        }
    }

    // Salva páginas no arquivo 'pages.json'
    savePages() {
        try {
            const data = JSON.stringify(this.pages);
            fs.writeFileSync('pages.json', data);
        } catch (err) {
            console.error('Erro ao salvar as páginas:', err.message);
        }
    }

    // Retorna todas as páginas de um usuário
    getPagesByUserId(userId) {
        this.loadPages();
        return this.pages[userId] || [];
    }

    // Encontra uma página pelo URL
    findPageByURL(URL) {
        this.loadPages();
        for (const userId in this.pages) {
            const page = this.pages[userId]?.find(page => page.URL === URL);
            if (page) return page;
        }
        return null;
    }

    // Retorna todas as páginas
    getAllPages() {
        this.loadPages();
        let allPages = [];
        for (const userId in this.pages) {
            allPages = allPages.concat(this.pages[userId]);
        }
        return allPages;
    }
}

// Exporta uma instância única da classe PageModel
module.exports = new PageModel();
