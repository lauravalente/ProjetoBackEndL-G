const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de receitas (pode ser substituído por um banco de dados real)
const recipesFilePath = path.join(__dirname, '../pages.json');

// Função para obter todas as receitas
function getAllRecipes() {
    if (fs.existsSync(recipesFilePath)) {
        try {
            const data = fs.readFileSync(recipesFilePath);
            const parsedData = JSON.parse(data);
            return Array.isArray(parsedData) ? parsedData : [];
        } catch (error) {
            console.error("Erro ao ler o arquivo pages.json:", error);
            return [];
        }
    }
    return [];
}



// Função para adicionar uma nova receita
function addRecipe(recipe) {
    let recipes = getAllRecipes();
    recipes.push(JSON.parse(JSON.stringify(recipe)));  // Remove referências circulares
    fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
}

function saveRecipes(recipes) {
    fs.writeFileSync(recipesFilePath, JSON.stringify(recipes, null, 2));
}


module.exports = {
    getAllRecipes,
    addRecipe,
    saveRecipes
};