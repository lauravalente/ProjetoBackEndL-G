# CMS Simples com Node.js e Mustache

Este é um projeto de CMS (Content Management System) simples, desenvolvido com Node.js e Mustache. O objetivo é fornecer uma plataforma fácil de usar para gerenciar conteúdo de páginas da web.

## Recursos

1. **Sistema de Login**: O sistema possui um mecanismo de login para o administrador de conteúdo. As credenciais são armazenadas em um arquivo de configuração `.env`.

2. **Criação Dinâmica de Páginas**: Os administradores logados podem criar novas páginas, especificando a URL e o conteúdo desejado. O conteúdo pode incluir marcação HTML ou Markdown.

3. **Edição de Conteúdo**: Os administradores podem editar o conteúdo de qualquer página, mas a URL definida não pode ser modificada.

4. **Exclusão de Páginas**: Os administradores podem excluir páginas, removendo permanentemente seu conteúdo e rota do sistema.

5. **Página Inicial**: A página inicial lista todas as páginas criadas e fornece links para acessá-las. Não é necessário login para visualizar a página inicial.

6. **Visualizador de Páginas**: Qualquer pessoa pode acessar o conteúdo de uma página a partir da URL definida na criação da página.

7. **Recurso Extra**: Nosso CMS possui um recurso extra de adição de múltiplos usuários administradores.

## Como Usar

1. Clone este repositório.
2. Instale as dependências com `npm install`.
3. Configure o arquivo `.env` com suas credenciais de administrador.
4. Inicie o servidor com `npm start`.
5. Acesse `http://localhost:3000` em seu navegador.
