import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

function Orders({ token }) {
    const [isFetching, setIsFetching] = useState(true)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(isFetching) fetchOrders()
    }, [isFetching])

    const fetchOrders = async () => {
        let config = {
            headers: {
                "Authentication": token,
            }
        }

        const orders = (await axios.get((BASE_URL + '/orders'), config)).data
        setOrders(orders)
    }

    let history = useHistory()

    const handleClick = () => {
      history.push('/products')
    }
  
    return (
        <div className="orders">
            {orders.length === 0 ? <p>No orders</p>
            : <ul>
                {orders.map(order => 
                <li key={order.id}>
                    <p>Order id: {order.id}</p>
                    {order.products.map(product => {
                    return (
                        <>
                        <p>Product: {product.name}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: R$ {(product.price / 100).toFixed(2).toString().replace('.', ',')}</p>
                        <p>Sub Total: R$ {(product.price * product.quantity / 100).toFixed(2).toString().replace('.', ',')}</p>
                        </>
                    )
                    }) }
                    <p>Total: R$ {(order.products.reduce((total, product) => total + product.price * product.quantity, 0) / 100).toFixed(2).toString().replace('.', ',')}</p>
                </li>
                ) }
            </ul>
            }
            <button onClick={ handleClick }>Products</button>
        </div>
    )
}

export default Orders;