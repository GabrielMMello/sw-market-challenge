const { readFile, writeFile } = require('fs').promises
const path = require('path')
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
        const filePath = path.join(this.filesFolder + 'users.json')
        const rawUsersData = await readFile(filePath)
        const users = JSON.parse(rawUsersData)
        return users
    }
    
    getProducts = async () => {
        const filePath = path.join(this.filesFolder + 'products.json')
        const rawProductsData = await readFile(filePath)
        const products = JSON.parse(rawProductsData)
        return products
    }
    
    getUserOrders = async (userId) => {
        const filePath = path.join(this.filesFolder + 'orders.json')
        const rawOrdersData = await readFile(filePath)
        const allOrders = JSON.parse(rawOrdersData)
        const userOrders = allOrders.filter(order => order.userId === userId)

        return userOrders
    }
    
    postOrder = async ({ newOrder, userId}) => {
        const filePath = path.join(this.filesFolder + 'orders.json')
        const rawOldOrdersData = await readFile(filePath)
        const oldOrders = JSON.parse(rawOldOrdersData)
    
        const newId = this.generateId()
        const newOrderData = {
          id: newId,
          userId,
          ...newOrder
          }
    
        const newOrdersData = [...oldOrders, newOrderData]
        await writeFile(filePath, JSON.stringify(newOrdersData))
        return await this.getUserOrders(userId)
    }

    generateId = () => {
        return uuidv4()
    }

    findUser = async ({ token }) => {
        const users = await this.getUsers()
        const data = users.find(user => user.token === token)

        if(data === undefined) return {message: "Not found"}

        return {
            message: "Success",
            data
        }
    }
}

module.exports = Database