import UserCard from './components/UserCard.js'

import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

function Login({ setAuth, setToken, fetchOrders }) {
    const [isFetching, setIsFetching] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(isFetching) fetchData()
    }, [isFetching])

    const fetchData = async () => {
        const users = (await axios.get(BASE_URL + '/users')).data
        setUsers(users)
        setIsFetching(false)
    }

    const handleClick = (token) => {
        setToken(token)
        setAuth(true)
        fetchOrders(token)
    }
    
    return (
        <div className="login">
            {users.map(user => <UserCard key={user.id} user={user} onClick={handleClick} />)}
        </div>
    )
}

export default Login;