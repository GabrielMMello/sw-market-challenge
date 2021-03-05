import { useState } from 'react'
import UserCard from './components/UserCard.js'

function Login() {
    const [users, setUsers] = useState([
        {id: 1, name: "Darth Vader"},
        {id: 2, name: "Obi-Wan Kenobi"},
        {id: 3, name: "Luke Skywalker"},
        {id: 4, name: "Imperador Palpatine"},
        {id: 5, name: "Han Solo"}
    ])

    return (
        <div className="login">
            {users.map(user => <UserCard key={user.id} user={user} />)}
        </div>
    )
}

export default Login;