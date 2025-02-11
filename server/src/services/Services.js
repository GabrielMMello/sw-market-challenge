class Services {
    constructor(RepositoryInstance) {
        this.Repository = RepositoryInstance;
    }

    getClients = async () => {
        return await this.Repository.getClients();
    }
    getProducts = async () => {
        return await this.Repository.getProducts()
    }
    
    getClientOrders = async (clientId) => {
        return await this.Repository.getClientOrders(clientId)
    }
    
    postOrder = async ({ newOrder, clientId }) => {
        return await this.Repository.postOrder({ newOrder, clientId })
    }

    putOrder = async ({ newOrderData, clientId }) => {
        return await this.Repository.putOrder({ newOrderData, clientId })
    }

    deleteOrder = async ({ deletedOrderId, clientId }) => {
        return await this.Repository.deleteOrder({ deletedOrderId, clientId })
    }

    authenticateClient = async (token) => {
        const result = await this.Repository.findClientByToken(token)

        if(result.hasOwnProperty("error")) return { isAuthenticated: false, client: undefined}

        return {
            isAuthenticated: true,
            clientId: result
        }
    }
}

module.exports = Services