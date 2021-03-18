import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import OrderCard from '../components/OrderCard'
import Button from '../components/Button'
import OrderEdit from '../components/OrderEdit'

const BASE_URL = 'http://localhost:8080'

function Orders({ userToken }) {
    const [isFetching, setIsFetching] = useState(true)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(isFetching) fetchOrders()
    }, [isFetching])

    const fetchOrders = async () => {
        let config = {
            headers: {
                "Authentication": userToken,
            }
        }

        const orders = (await axios.get((BASE_URL + '/orders'), config)).data
        setOrders(orders)
    }

    // Editar um pedido
    const [isEditing, setIsEditing] = useState(false)
    const [editingOrder, setEditingOrder] = useState({})

    // Navegação
    let history = useHistory()

    const handleClick = () => {
      history.push('/products')
    }
  
    return (
        <div className="h-100">
            <h1 className="text-warning">Star Wars Market - Orders</h1>

            <div className="orders card bg-dark h-75 p-3 text-light rounded-3 my-3 mx-auto" style={isEditing ? null : {width: "30vw"}}>
                {orders.length === 0 ? <p>No orders</p>
                : isEditing ? 
                    <OrderEdit
                    order={ editingOrder }
                    userToken={ userToken }
                    setIsEditing={setIsEditing}
                    />
                    : <ul className="custom-scroll" style={{overflowY: "scroll"}}>
                        {orders.map(order => 
                        <li key={order.id} style={{boxShadow: "0px 0px 15px black", backgroundColor: "#323B44", listStyle: "none"}}>
                            <OrderCard
                                order={ order }
                                setEditingOrder={setEditingOrder}
                                setIsEditing={setIsEditing}
                                hasEditButton
                            />
                        </li>
                        ) }
                    </ul>
                }

                {!isEditing && <div className="card-footer w-100">
                    <Button
                        color="btn-warning"
                        onClick={ handleClick }
                        text="New order"
                    />
                </div>}
            </div>
        </div>
    )
}

export default Orders;