const express = require('express')
const PORT = 8080

const Services = require('./src/services/Services.js')
const Repository = require('./src/repository/Repository.js')
const Database = require('./src/database/Database.js')

const DBConnection = (new Database(__dirname + '/src/database/data/')).connect()
const RepositoryInstance = new Repository(DBConnection)

const {
  getUsers,
  getProducts,
  getOrders,
  postOrder
} = new Services(RepositoryInstance)

const HOME_MESSAGE = {
  message: 'Hello! This server is API only. For details about the endpoints please check the README in https://github.com/GabrielMMello/sw-market-challenge'
}

const app = express()
const dir = __dirname + '/public'
app.use(express.static(dir));
app.use(express.json())

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
  .get(async (_req, res) => {
    const ordersData = await getOrders()
    res.json(ordersData)
  })
  .post(async (req, res) => {
    const newOrder = req.body
    const newOrdersData = await postOrder(newOrder)
    res
      .status(201)
      .json(newOrdersData)
  })


app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))