import { useState } from 'react'
import axios from 'axios'

import ProductCard from './ProductCard.js'
import OrderCard from './OrderCard.js'
import Button from './Button.js'

const BASE_URL = 'http://localhost:8080'

function OrderEdit({ order, clientToken, setIsFetching, setIsEditing }) {
  const [newOrder, setNewOrder] = useState(order)

  const handleCancelBtnClick = () => {
    setIsEditing(false)
  }

  const handleSubmit = async () => {
      let config = {
        headers: {
          "Authentication": clientToken,
        }
      }
      newOrder.hasOwnProperty("products")
      && newOrder.products.length > 0
      && await axios.put((BASE_URL + '/orders'), newOrder, config)
      setIsFetching(true)
      setIsEditing(false)
    }

  const handleSubmitDelete = async () => {
    const config = {
      headers: {
        "Authentication": clientToken,
      },
    }
    await axios.delete((BASE_URL + `/orders/${newOrder.id}`), config)
    setIsFetching(true)
    setIsEditing(false)
  }


  return (
    <>
            
        <div className="card-body d-flex align-items-center">
            <ProductCard
                order={ newOrder }
                setOrder={ setNewOrder } 
            />
            <div className="custom-scroll" style={{maxHeight: 300, overflowY: newOrder.products.length > 0 ? "scroll" : "hidden"}}>
                <OrderCard
                order={ newOrder }
                />
            </div>
        </div>

        <div className="card-footer">
            <div>
                <Button
                  color={newOrder.products.length > 0 ? "btn-warning" : "btn-dark"}
                  onClick={ handleSubmit }
                  text={newOrder.products.length > 0 ? "Submit" : "Add products!"}
                  disabled={newOrder.products.length === 0}
                />
                <Button
                  color={"btn-danger"}
                  onClick={ handleSubmitDelete }
                  text={"Delete order"}
                />
                <Button
                  color="btn-danger"
                  onClick={ handleCancelBtnClick }
                  text="Cancel"
                />
            </div>
        </div>
    </>
  )
}

export default OrderEdit;