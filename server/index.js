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
  getUsers,
  getProducts,
  getUserOrders,
  postOrder,
  authenticateUser
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

app.get('/users', async (_req, res) => {
  const usersData = await getUsers()
  res.json(usersData)
})

app.get('/products', async (_req, res) => {
  const productsData = await getProducts()
  res.json(productsData)
})

app.route('/orders')
  .get(async (req, res) => {
    const {isAuthenticated, userId} = await authenticateUser(req.headers.authentication)

    if(!isAuthenticated) {
      res
        .status(400)
        .json({error: "Unauthorized"})
    } 
    else {
      const ordersData = await getUserOrders(userId)
      res.json(ordersData)
    }
  })
  .post(async (req, res) => {
    const {isAuthenticated, userId} = await authenticateUser(req.headers.authentication)

    if(!isAuthenticated) {
      res
        .status(400)
        .json({error: "Unauthorized"})
    } 
    else {
      const newOrder = req.body
      const newOrdersData = await postOrder({ newOrder, userId})
      res
        .status(201)
        .json(newOrdersData)
    }

  })


app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))
