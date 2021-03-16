import Clients from './pages/Clients.js'
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

  return (
    <div className="App container-fluid d-flex justify-content-center align-items-center p-3" style={{backgroundColor: "black", height: "100vh"}}>
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            {auth ? <Redirect to='/products' />
            : <Clients
                setAuth={ setAuth }
                setToken={ setToken }
              />}
          </Route>

          <Route path="/products">
            {auth ? <ProductList
                      token={ token }
                      setAuth={ setAuth }
                      setToken={ setToken }
                    />
            : <Redirect to='/' />}
          </Route>

          <Route path="/orders">
            {auth ? <Orders token={ token } />
            : <Redirect to='/' />}
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
