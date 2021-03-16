import UserCard from './components/UserCard.js'

import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

function Clients({ setAuth, setToken }) {
    const [isFetching, setIsFetching] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(isFetching) fetchData()
    }, [isFetching])

    const fetchData = async () => {
        const users = (await axios.get(BASE_URL + '/users')).data
        setUsers(users)
setSelectedUser(users[0])
        setIsFetching(false)
    }

    const [selectedUser, setSelectedUser] = useState({id: '', name: '', imgURL:'', token: ''})
    const handleSelectChange = (e) => {
        const user = users.find(user => user.id === e.target.value)
        setSelectedUser(user)
    }

    const handleClick = () => {
        if(!isFetching) {
            setToken(selectedUser.token)
            setAuth(true)
        }
    }

    return (
        <div>
            <h1 className="text-warning">Star Wars Market - Clients</h1>
            <div className="login card bg-dark align-items-center p-3">
                <div className="card-header">
                    <h2 className="text-light">Please choose a client</h2>
                </div>
                <div className="card-body card bg-secondary text-dark border-dark">
                    <select 
                        className="card-header bg-light"
                        value={selectedUser.id}
                        onChange={handleSelectChange}
                        style={{outline: "none"}}
                    >
                        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                    <UserCard user={selectedUser} />
                    <button className="btn-warning m-2 border-0" style={{boxShadow: "0px 0px 15px black"}} onClick={handleClick}>Choose this client</button>
                </div>
            </div>
        </div>
    )
}

export default Clients;
