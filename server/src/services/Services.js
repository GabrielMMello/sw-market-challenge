class Services {
    constructor(RepositoryInstance) {
        this.Repository = RepositoryInstance;
    }

    getUsers = () => {
        return this.Repository.getUsers();
    }
    getProducts = () => {
        return this.Repository.getProducts()
    }
    
    getOrders = () => {
        return this.Repository.getOrders()
    }
    
    postOrder = (newOrder) => {
        return this.Repository.postOrder(newOrder)
    }
}

module.exports = Services