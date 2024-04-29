const fs = require('fs');

// Define a classe AdminModel para gerenciar administradores e suas credenciais
class AdminModel {
    constructor() {
        // Verifica se já existe uma instância da classe e retorna ela
        if (AdminModel.instance) return AdminModel.instance
        // Inicializa a lista e carrega os administradores do arquivo admins.txt
        this.administrators = []
        this.loadAdminsFromFile()
        // Armazena a instância atual para garantir que seja única
        AdminModel.instance = this
    }

    // Método para adicionar um novo administrador
    addAdministrator(user, password) {
        // Verifica se já existe um administrador com o mesmo usuário
        const existingAdmin = this.administrators.find(admin => admin.user === user)
        // Retorna false se o administrador já existe
        if (existingAdmin) return false
        // Adiciona o novo administrador à lista e salva no arquivo
        this.administrators.push({ user, password })
        this.saveAdminsToFile()
        // Retorna true após adicionar o administrador com sucesso
        return true
    }

    // Método para validar as credenciais
    validateCredentials(user, password) {
        // Procura um administrador com o usuário especificado
        const admin = this.administrators.find(admin => admin.user === user)
        // Verifica se o administrador foi encontrado e retorna true se as credencias forem válidas
        if (admin && admin.password === password) return true
        // Retorna false se as credenciais não forem válidas
        return false
    }

    // Método para carregar os administradores do arquivo 'admins.txt'
    loadAdminsFromFile() {
        try {
            // Lê os dados do arquivo
            const data = fs.readFileSync('admins.txt', 'utf8')
            // Converte os dados para um array de objetos
            this.administrators = JSON.parse(data)
        } catch (err) {
            // Exibe mensagem de erro se houver problemas na leitura do arquivo
            console.error('Erro ao carregar administradores do arquivo:', err.message)
        }
    }

    // Método para salvar os administradores no arquivo 'admins.txt'
    saveAdminsToFile() {
        try {
            // Converte a lista de administradores para JSON
            const data = JSON.stringify(this.administrators)
            // Escreve os dados no arquivo
            fs.writeFileSync('admins.txt', data)
        } catch (err) {
            // Exibe mensagem de erro se houver problemas na escrita do arquivo
            console.error('Erro ao salvar administradores no arquivo:', err.message)
        }
    }
}

// Exporta uma instância única da classe AdminModel para ser utilizada em outros módulos
module.exports = new AdminModel()