import Clients from './pages/Clients.js'
import Orders from './pages/Orders.js'
import NewOrder from './pages/NewOrder.js'

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
  const [clientToken, setClientToken] = useState('')

  return (
    <div className="App container-fluid d-flex justify-content-center align-items-center p-3" style={{backgroundColor: "black", height: "100vh"}}>
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            {auth ? <Redirect to='/new-order' />
            : <Clients
                setAuth={ setAuth }
                setClientToken={ setClientToken }
              />}
          </Route>

          <Route path="/new-order">
            {auth ? <NewOrder
                      clientToken={ clientToken }
                      setAuth={ setAuth }
                      setClientToken={ setClientToken }
                    />
            : <Redirect to='/' />}
          </Route>

          <Route path="/orders">
            {auth ? <Orders clientToken={ clientToken } />
            : <Redirect to='/' />}
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
