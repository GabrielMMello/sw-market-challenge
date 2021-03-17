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
  const [userToken, setUserToken] = useState('')

  return (
    <div className="App container-fluid d-flex justify-content-center align-items-center p-3" style={{backgroundColor: "black", height: "100vh"}}>
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            {auth ? <Redirect to='/products' />
            : <Clients
                setAuth={ setAuth }
                setUserToken={ setUserToken }
              />}
          </Route>

          <Route path="/products">
            {auth ? <ProductList
                      userToken={ userToken }
                      setAuth={ setAuth }
                      setUserToken={ setUserToken }
                    />
            : <Redirect to='/' />}
          </Route>

          <Route path="/orders">
            {auth ? <Orders userToken={ userToken } />
            : <Redirect to='/' />}
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
