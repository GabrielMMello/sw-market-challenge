import ClientCard from '../components/ClientCard.js'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../components/Button.js'

const BASE_URL = 'http://localhost:8080'

function Clients({ setAuth, setClientToken }) {
    const [isFetching, setIsFetching] = useState(true)
    const [clients, setClients] = useState([])

    useEffect(() => {
        if(isFetching) fetchData()
    }, [isFetching])

    const fetchData = async () => {
        const clients = (await axios.get(BASE_URL + '/clients')).data
        setClients(clients)
        setSelectedClient(clients[0])
        setIsFetching(false)
    }

    const [selectedClient, setSelectedClient] = useState({id: '', name: '', imgURL:'', token: ''})
    const handleSelectChange = (e) => {
        const client = clients.find(client => client.id === e.target.value)
        setSelectedClient(client)
    }

    const handleClick = () => {
        if(!isFetching) {
            setClientToken(selectedClient.token)
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
                        value={selectedClient.id}
                        onChange={handleSelectChange}
                        style={{outline: "none"}}
                    >
                        {clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                    </select>
                    <ClientCard client={selectedClient} />
                    <Button
                        color="btn-warning"
                        onClick={ handleClick }
                        text="Choose this client"
                    />
                </div>
            </div>
        </div>
    )
}

export default Clients;
