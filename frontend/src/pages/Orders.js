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
        <div className="h-100">
            <h1 className="text-warning">Star Wars Market - Orders</h1>
            <div className="orders card bg-dark h-75 p-3 text-light rounded-3 my-3 mx-auto" style={{width: "30vw"}}>
                {orders.length === 0 ? <p>No orders</p>
                : <ul style={{overflowY: "scroll"}}>
                    {orders.map(order => 
                    <li key={order.id} style={{boxShadow: "0px 0px 15px black", backgroundColor: "#323B44", listStyle: "none"}}>
                        <div>
                            {order.products.map(product => {
                            return (
                                <div style={{border: "1px solid black"}}>
                                    <h6 className="card-title h-100 m-0 font-weight-bold card-header" style={{lineHeight: "100%"}}>Product: {product.name}</h6>
                                    <p className="card-text mt-1" style={{fontSize: "0.7em", color: "#B5B5B5"}}>Quantity: {product.quantity}</p>
                                    <p><span className="card-text my-0"  style={{fontSize: "0.9em", color: "#B5B5B5"}}>Subtotal</span> R$ {(product.price * product.quantity / 100).toFixed(2).toString().replace('.', ',')}</p>
                                </div>
                            )
                            }) }
                            <p className="card-footer" style={{border: "1px solid black", fontSize: "1.1em"}}>Total: R$ {(order.products.reduce((total, product) => total + product.price * product.quantity, 0) / 100).toFixed(2).toString().replace('.', ',')}</p>
                        </div>
                    </li>
                    ) }
                </ul>
                }
                <div className="card-footer w-100">
                    <button className="btn-warning m-2 border-0" style={{boxShadow: "0px 0px 15px black"}} onClick={ handleClick }>Buy more</button>
                </div>
            </div>
        </div>
    )
}

export default Orders;