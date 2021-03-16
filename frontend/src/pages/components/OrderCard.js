function OrderCard({ order, setOrder }) {
    const calculateSubtotal = (product) => {
        const rawValue = product.price * product.quantity
        return formatValue(rawValue)
    }

    const calculateTotal = () => {
        const rawValue = order.products.reduce((total, product) => 
          total + product.price * (product.quantity || 0), 0)
          return formatValue(rawValue)
        }
    const formatValue = (rawValue) => {
        return (rawValue / 100)
                .toFixed(2)
                .toString()
                .replace('.', ',')
    }

        return (
        <div >
            {order.products.map(product => {
            return (
                <div style={{border: "1px solid black"}}>
                    <h6 className="card-title h-100 m-0 font-weight-bold card-header" style={{lineHeight: "100%"}}>Product: {product.name}</h6>
                    <p className="card-text mt-1" style={{fontSize: "0.7em", color: "#B5B5B5"}}>Quantity: {product.quantity}</p>
                    <p><span className="card-text my-0"  style={{fontSize: "0.9em", color: "#B5B5B5"}}>Subtotal</span> R$ {calculateSubtotal(product)}</p>
                </div>
            )
            }) }
            <p className="card-footer" style={{border: "1px solid black", fontSize: "1.1em"}}>Total: R$ {calculateTotal()}</p>
        </div>
    )
}

export default OrderCard;