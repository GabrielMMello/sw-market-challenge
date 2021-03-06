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

import './App.css';

function App() {
  const [auth, setAuth] = useState(false)
  const [token, setToken] = useState('')
  const [orders, setOrders] = useState([ {id: '1', products: [{ name: 'Banana', price: 100, quantity: 3}] } ])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {auth ? <Redirect to='/products' />
            : <Login setAuth={ setAuth } setToken={ setToken } />}
          </Route>
          <Route path="/products">
            {auth ? <ProductList token={ token } setToken={ setToken } />
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