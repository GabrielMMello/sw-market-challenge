const express = require('express')
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT
const path = require('path')

const Services = require(path.join(__dirname, './src/services/Services.js'))
const Repository = require(path.join(__dirname, './src/repository/Repository.js'))
const Database = require(path.join(__dirname, './src/database/Database.js'))

const DBConnection = (new Database(path.join(__dirname, '/src/database/data/'))).connect()
const RepositoryInstance = new Repository(DBConnection)

const {
  getClients,
  getProducts,
  getClientOrders,
  postOrder,
  putOrder,
  deleteOrder,
  authenticateClient
} = new Services(RepositoryInstance)

const HOME_MESSAGE = {
  message: 'Hello! This server is API only. For details about the endpoints please check the README in https://github.com/GabrielMMello/sw-market-challenge'
}

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000'}))

const dir = path.join(__dirname, '/public')
app.use(express.static(dir))

app.get('/', (_req, res) => {
  res.json(HOME_MESSAGE)
})

app.get('/clients', async (_req, res) => {
  const clientsData = await getClients()
  res.json(clientsData)
})

app.get('/products', async (_req, res) => {
  const productsData = await getProducts()
  res.json(productsData)
})

app.route('/orders')
  .get(async (req, res) => {
    const {isAuthenticated, clientId} = await authenticateClient(req.headers.authentication)

    if(!isAuthenticated) {
      res
        .status(400)
        .json({error: "Unauthorized"})
    } 
    else {
      const ordersData = await getClientOrders(clientId)
      res.json(ordersData)
    }
  })
  .post(async (req, res) => {
    const {isAuthenticated, clientId} = await authenticateClient(req.headers.authentication)

    if(!isAuthenticated) {
      res
        .status(400)
        .json({error: "Unauthorized"})
    } 
    else {
      const newOrder = req.body
      const newOrdersData = await postOrder({ newOrder, clientId })
      res
        .status(201)
        .json(newOrdersData)
    }
  })
  .put(async (req, res) => {
    const {isAuthenticated, clientId} = await authenticateClient(req.headers.authentication)

    if(!isAuthenticated) {
      res
        .status(400)
        .json({error: "Unauthorized"})
    } 
    else {
      const newOrderData = req.body
      const newOrdersData = await putOrder({ newOrderData, clientId })
      res
        .status(201)
        .json(newOrdersData)
    }
  })

app.route('/orders/:orderId')
  .delete(async (req, res) => {
    const {isAuthenticated, clientId} = await authenticateClient(req.headers.authentication)
console.log(req.params.orderId)
    if(!isAuthenticated) {
      res
        .status(400)
        .json({error: "Unauthorized"})
    } 
    else {
      const deletedOrderId = req.params.orderId
      const newOrdersData = await deleteOrder({ deletedOrderId, clientId })
      res
        .status(201)
        .json(newOrdersData)
    }
  })


app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))
