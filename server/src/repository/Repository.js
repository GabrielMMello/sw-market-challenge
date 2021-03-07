class Repository {
    constructor(DBConnection) {
        this.Database = DBConnection
    }

    getUsers = async () => {
        return await this.Database.getUsers();
    }
    getProducts = async () => {
        return await this.Database.getProducts()
    }
    
    getOrders = async () => {
        return await this.Database.getOrders()
    }
    
    postOrder = async (newOrder) => {
        return await this.Database.postOrder(newOrder)
    }
}

module.exports = Repository