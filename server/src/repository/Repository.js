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
    
    getUserOrders = async (userId) => {
        return await this.Database.getUserOrders(userId)
    }
    
    postOrder = async ({ newOrder, userId}) => {
        return await this.Database.postOrder({ newOrder, userId})
    }

    findUserByToken = async (token) => {
        const result = await this.Database.findUser({ token })

        if (result.hasOwnProperty("message") && result.message === "Not found") return {error: "Invalid token"}

        return result.data.id
    }
}

module.exports = Repository