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
    <div>
      <h1 className="text-warning">Star Wars Market - Products</h1>
      <div className="productList card bg-dark align-items-center p-3 text-light rounded-3">
        
        <div className="card-body card-group">
          { products.map((product, index, arr) =>
              <ProductCard
                key={product.id}
                product={ product }
                onChange={ handleChange } 
              />
            )
          }
        </div>

        <div className="card-footer">
          <p style={{fontSize: "1.5em"}}>Total: R$ {(products.reduce((total, product) => total + product.price * ((product.hasOwnProperty("quantity") && product.quantity) || 0), 0) / 100).toFixed(2).toString().replace('.', ',')}</p>
          <div>
            <button className="btn-warning m-2 border-0" style={{boxShadow: "0px 0px 15px black"}} onClick={ handleSubmit }>Submit</button>
            <button className="btn-secondary m-2 border-0" style={{boxShadow: "0px 0px 15px black"}} onClick={ handleLogout }>Logout</button>
            <button className="btn-warning m-2 border-0" style={{boxShadow: "0px 0px 15px black"}} onClick={ handleClick }>Orders</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList;