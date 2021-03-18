class Repository {
    constructor(DBConnection) {
        this.Database = DBConnection
    }

    getClients = async () => {
        return await this.Database.getClients();
    }
    getProducts = async () => {
        return await this.Database.getProducts()
    }
    
    getClientOrders = async (clientId) => {
        return await this.Database.getClientOrders(clientId)
    }
    
    postOrder = async ({ newOrder, clientId}) => {
        return await this.Database.postOrder({ newOrder, clientId})
    }

    findClientByToken = async (token) => {
        const result = await this.Database.findClient({ token })

        if (result.hasOwnProperty("message") && result.message === "Not found") return {error: "Invalid token"}

        return result.data.id
    }
}

module.exports = Repository