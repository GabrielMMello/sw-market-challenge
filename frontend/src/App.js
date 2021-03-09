import Login from './pages/Login.js'
import Orders from './pages/Orders.js'
import ProductList from './pages/ProductList.js'

import { useState } from 'react'
import {
  BrowserRouter, 
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import axios from 'axios'

import './App.css';

const BASE_URL = 'http://localhost:8080'

function App() {
  const [auth, setAuth] = useState(false)
  const [token, setToken] = useState('')
  const [orders, setOrders] = useState([])

  const fetchOrders = async (token) => {
    let config = {
      headers: {
        "Authentication": token,
      }
    }

    const orders = (await axios.get((BASE_URL + '/orders'), config)).data
    setOrders(orders)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {auth ? <Redirect to='/products' />
            : <Login setAuth={ setAuth } setToken={ setToken } fetchOrders={ fetchOrders } />}
          </Route>
          <Route path="/products">
            {auth ? <ProductList token={ token } setToken={ setToken } fetchOrders={ fetchOrders } />
            : <Redirect to='/' />}
          </Route>
          <Route path="/orders">
            {auth ? <Orders orders={ orders } />
            : <Redirect to='/' />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;