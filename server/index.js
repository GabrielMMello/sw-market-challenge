const express = require('express')
const PORT = 8080

const app = express()

app.get('/', (_req, res) => {
  res.send('Hello! This server is API only. For details about the endpoints please check the README in https://github.com/GabrielMMello/sw-market-challenge')
})

app.get('/users', (_req, res) => {
  res.send('Hello!')
})

app.get('/products', (_req, res) => {
  res.send('Hello!')
})

app.route('/orders')
  .get((_req, res) => {
    res.send('Hello!')
  })
  .post(async (req, res) => {
    res.send('Hello!')
  })


app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))