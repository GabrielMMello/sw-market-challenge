import ProductCard from './components/ProductCard.js'

import { useEffect, useState } from 'react'
import{ useHistory } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

function ProductList({ token, setAuth, setToken, setOrders }) {
  const [isFetching, setIsFetching] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    if(isFetching) fetchData()
  }, [isFetching])

  const fetchData = async () => {
    const products = (await axios.get(BASE_URL + '/products')).data
    setProducts(products)
    setIsFetching(false)
  }

  let history = useHistory()

  const handleClick = () => {
    history.push('/orders')
  }

  const handleChange = ({productId, quantity}) => {
    const index = products.findIndex(product => product.id === productId)
    let productsCopy = [...products]
    productsCopy[index] = {...products[index], quantity}
    setProducts(productsCopy)
  }

  const handleSubmit = () => {
    postOrder()
    fetchData()
  }

  const postOrder = async () => {
    let config = {
      headers: {
        "Authentication": token,
      }
    }
    const newOrder = {products: products.filter(product => product.hasOwnProperty("quantity") && product.quantity > 0)}
    newOrder.hasOwnProperty("products") && newOrder.products.length > 0 && await axios.post((BASE_URL + '/orders'), newOrder, config)
  }

  const handleLogout = () => {
    setAuth(false)
    setToken('')
    history.push('/')
  }

  return (
      <div className="productList">

          { products.map(product => 
              <ProductCard
                key={product.id}
                product={ product }
                onChange={ handleChange } 
              />
            )
          }

          <p>Total: R$ {(products.reduce((total, product) => total + product.price * ((product.hasOwnProperty("quantity") && product.quantity) || 0), 0) / 100).toFixed(2).toString().replace('.', ',')}</p>
          <button onClick={ handleSubmit }>Submit</button>
          <button onClick={ handleLogout }>Logout</button>
          <button onClick={ handleClick }>Orders</button>
      </div>
  )
}

export default ProductList;