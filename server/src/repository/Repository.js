class Repository {
    constructor(DBConnection) {
        this.DBConnection = DBConnection
    }

    getUsers = () => {
        return {
            "user": "Bob"
        }
    }
    getProducts = () => {
        return {
            "products": "Bananas"
        }
    }
    
    getOrders = () => {
        return {
            "orders": "Some"
        }
    }
    
    postOrder = (newOrder) => {
        return [
            {
                "orders": "Some"
            },
            newOrder
        ]
    }

}

module.exports = Repository