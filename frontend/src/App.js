import Login from './pages/Login.js'
import Orders from './pages/Orders.js'
import ProductList from './pages/ProductList.js'

import { useState } from 'react'

import './App.css';

function App() {
  const [orders, setOrders] = useState([ {id: '1', products: [{ name: 'Banana', price: 100, quantity: 3}] } ])

  return (
    <div className="App">
      <Login />
      <ProductList />
      <Orders orders={ orders } />
    </div>
  );
}

export default App;
