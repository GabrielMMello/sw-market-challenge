class Services {
    constructor(RepositoryInstance) {
        this.Repository = RepositoryInstance;
    }

    getUsers = async () => {
        return await this.Repository.getUsers();
    }
    getProducts = async () => {
        return await this.Repository.getProducts()
    }
    
    getUserOrders = async (userId) => {
        return await this.Repository.getUserOrders(userId)
    }
    
    postOrder = async ({ newOrder, userId}) => {
        return await this.Repository.postOrder({ newOrder, userId})
    }

    authenticateUser = async (token) => {
        const result = await this.Repository.findUserByToken(token)

        if(result.hasOwnProperty("error")) return { isAuthenticated: false, user: undefined}

        return {
            isAuthenticated: true,
            userId: result
        }
    }
}

module.exports = Services