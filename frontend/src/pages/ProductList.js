import { useState } from 'react'
import{ useHistory } from 'react-router-dom'
import axios from 'axios'

import ProductCard from './components/ProductCard.js'
import OrderCard from './components/OrderCard.js'
import Button from './components/Button.js'

const BASE_URL = 'http://localhost:8080'

function ProductList({ token, setAuth, setToken, setOrders }) {
  const DEFAULT_ORDER = {client: token, products: []}
  const [newOrder, setNewOrder] = useState(DEFAULT_ORDER)

  let history = useHistory()

  const handleOrdersBtnClick = () => {
    history.push('/orders')
  }

  const handleLogoutBtnClick = () => {
    setAuth(false)
    setToken('')
    history.push('/')
  }

  const handleSubmit = () => {
    postOrder()
  }

  const postOrder = async () => {
    let config = {
      headers: {
        "Authentication": token,
      }
    }
    newOrder.hasOwnProperty("products")
    && newOrder.products.length > 0
    && await axios.post((BASE_URL + '/orders'), newOrder, config)
  }

  return (
    <div>
      <h1 className="text-warning">Star Wars Market - Products</h1>
      <div className="productList card bg-dark align-items-center p-3 text-light rounded-3">
        
        <div className="card-body d-flex align-items-center">
          <ProductCard
            order={ newOrder }
            setOrder={ setNewOrder } 
          />
          <div style={{maxHeight: 300, overflowY: newOrder.products.length > 0 ? "scroll" : "hidden"}}>
            <OrderCard
              order={ newOrder }
              setOrder={ setNewOrder } 
            />
          </div>
        </div>
        
        <div className="card-footer">
          <div>
            <Button
              color="btn-warning"
              onClick={ handleSubmit }
              text="Submit"
            />
            <Button
              color="btn-danger"
              onClick={ handleLogoutBtnClick }
              text="Change client"
            />
            <Button
              color="btn-warning"
              onClick={ handleOrdersBtnClick }
              text="Orders"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList;