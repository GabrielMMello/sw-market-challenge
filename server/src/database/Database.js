const { readFile, writeFile } = require('fs').promises
const uuidv4 = require('uuid').v4

class Database {
    constructor(filesFolder) {
        this.filesFolder = filesFolder
    }

    connect = () => {
        console.log('Database successfully connected!')
        return this
    }

    getUsers = async () => {
        const path = this.filesFolder + 'users.json'
        const rawUsersData = await readFile(path)
        const usersData = JSON.parse(rawUsersData)
        return usersData
    }
    
    getProducts = async () => {
        const path = this.filesFolder + 'products.json'
        const rawProductsData = await readFile(path)
        const productsData = JSON.parse(rawProductsData)
        return productsData
    }
    
    getOrders = async () => {
        const path = this.filesFolder + 'orders.json'
        const rawOrdersData = await readFile(path)
        const ordersData = JSON.parse(rawOrdersData)
        return ordersData
    }
    
    postOrder = async (newOrder) => {
        const path = this.filesFolder + 'orders.json'
        const rawOldOrdersData = await readFile(path)
        const oldOrdersData = JSON.parse(rawOldOrdersData)
    
        const newId = this.generateId()
        const newOrderData = {
          id: newId,
          ...newOrder
          }
    
        const newOrdersData = [...oldOrdersData, newOrderData]
        await writeFile(path, JSON.stringify(newOrdersData))
        return newOrdersData
    }

    generateId = () => {
        return uuidv4()
    }
}

module.exports = Database