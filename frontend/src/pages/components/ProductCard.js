import { useState } from 'react'

function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(0)
	const handleChange = (e) => {
		setQuantity(e.target.value)
	}
    
    return (
        <div className="productCard card">
            <p>Name: { product.name }</p>
            <p>Price per unity: { product.price } </p>
            <p>Amount multiple: { product.multiple } </p>
            <label for="quantity">Quantity: </label><input type="number" name="quantity" value={quantity} onChange={handleChange} />
        </div>
    )
}

export default ProductCard;