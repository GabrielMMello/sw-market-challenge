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

    getClients = async () => {
        const filePath = path.join(this.filesFolder + 'clients.json')
        const rawClientsData = await readFile(filePath)
        const clients = JSON.parse(rawClientsData)
        return clients
    }
    
    getProducts = async () => {
        const filePath = path.join(this.filesFolder + 'products.json')
        const rawProductsData = await readFile(filePath)
        const products = JSON.parse(rawProductsData)
        return products
    }
    
    getClientOrders = async (clientId) => {
        const filePath = path.join(this.filesFolder + 'orders.json')
        const rawOrdersData = await readFile(filePath)
        const allOrders = JSON.parse(rawOrdersData)
        const clientOrders = allOrders.filter(order => order.clientId === clientId)

        return clientOrders
    }
    
    postOrder = async ({ newOrder, clientId }) => {
        const filePath = path.join(this.filesFolder + 'orders.json')
        const rawOldOrdersData = await readFile(filePath)
        const oldOrders = JSON.parse(rawOldOrdersData)
    
        const newId = this.generateId()
        const newOrderData = {
          id: newId,
          clientId,
          ...newOrder
          }
    
        const newOrdersData = [...oldOrders, newOrderData]
        await writeFile(filePath, JSON.stringify(newOrdersData))
        return await this.getClientOrders(clientId)
    }

    putOrder = async ({ newOrderData, clientId }) => {
        const filePath = path.join(this.filesFolder + 'orders.json')
        const rawOrdersData = await readFile(filePath)
        let orders = JSON.parse(rawOrdersData)
    
        const orderIndex = orders.findIndex(order => order.id === newOrderData.id)
    
        orders[orderIndex] = newOrderData
        await writeFile(filePath, JSON.stringify(orders))
        return await this.getClientOrders(clientId)
    }

    deleteOrder = async ({ deletedOrderId, clientId }) => {
        const filePath = path.join(this.filesFolder + 'orders.json')
        const rawOldOrdersData = await readFile(filePath)
        const oldOrders = JSON.parse(rawOldOrdersData)
    
        const orderIndex = oldOrders.findIndex(order => order.id === deletedOrderId)

        const newOrdersData = [...oldOrders.slice(0, orderIndex), ...oldOrders.slice(orderIndex + 1)]
        await writeFile(filePath, JSON.stringify(newOrdersData))
        return await this.getClientOrders(clientId)
    }

    generateId = () => {
        return uuidv4()
    }

    findClient = async ({ token }) => {
        const clients = await this.getClients()
        const data = clients.find(client => client.token === token)

        if(data === undefined) return {message: "Not found"}

        return {
            message: "Success",
            data
        }
    }
}

module.exports = Database