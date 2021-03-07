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
    
    getOrders = async () => {
        return await this.Repository.getOrders()
    }
    
    postOrder = async (newOrder) => {
        return await this.Repository.postOrder(newOrder)
    }
}

module.exports = Services