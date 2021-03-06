import UserCard from './components/UserCard.js'

import { useState } from 'react'

function Login({ setAuth, setToken }) {
    const [users, setUsers] = useState([
        {id: 1, name: "Darth Vader"},
        {id: 2, name: "Obi-Wan Kenobi"},
        {id: 3, name: "Luke Skywalker"},
        {id: 4, name: "Imperador Palpatine"},
        {id: 5, name: "Han Solo"}
    ])
    const handleClick = (userId) => {
        const token = fetchToken(userId)
        setToken(token)
        setAuth(true)
    }
    
      const fetchToken = (userId) => {
        return 'token'
    }

    return (
        <div className="login">
            {users.map(user => <UserCard key={user.id} user={user} onClick={handleClick} />)}
        </div>
    )
}

export default Login;