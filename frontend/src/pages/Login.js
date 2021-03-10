import UserCard from './components/UserCard.js'

import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

function Login({ setAuth, setToken }) {
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
    }

    return (
        <div>
            <h1 className="text-warning">Star Wars Market - Login</h1>
            <div className="login card bg-dark align-items-center p-3 card-group">
                {users.map(user => <UserCard key={user.id} user={user} onClick={handleClick} />)}
            </div>
        </div>
    )
}

export default Login;
