function ProductCard({ product, onChange }) {
	const handleChange = (e) => {
        if(e.target.value >= 0) {
            onChange({ productId: product.id, quantity: e.target.value * product.multiple})
        }
	}
    
    return (
        <div className="productCard card">
            <p>Name: { product.name }</p>
            <p>Price per unit: R$ { (product.price / 100).toFixed(2).toString().replace('.', ',') } </p>
            <label htmlFor="multipleQuantity">Packages: </label>
            <input
                type="number"
                name="multipleQuantity"
                value={ ((product.hasOwnProperty("quantity") && product.quantity) / product.multiple) || 0 }
                onChange={ handleChange }
            />
            <p>Package units: x{ product.multiple } </p>
            <p>Total Quantity: { (product.hasOwnProperty("quantity") && product.quantity) || 0 }</p>
            <p>Sub Total: R$ { (product.price * ((product.hasOwnProperty("quantity") && product.quantity) || 0) / 100).toFixed(2).toString().replace('.', ',') }</p>
        </div>
    )
}

export default ProductCard;