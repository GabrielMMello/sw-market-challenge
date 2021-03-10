function ProductCard({ product, onChange }) {
	const handleChange = (e) => {
        if(e.target.value >= 0) {
            onChange({ productId: product.id, quantity: e.target.value * product.multiple})
        }
	}
    
    return (
        <div className="productCard card text-center border-dark align-items-center m-3 rounded-3" style={{boxShadow: "0px 0px 15px black", backgroundColor: "#323B44"}}>
            <div className="card-header w-100 h-25 border-dark">
                <h6 className="card-title h-100 m-0 font-weight-bold" style={{lineHeight: "100%"}}>{ product.name }</h6>
            </div>
            <div className="card-body w-100">
                <p className="card-text" style={{color: "#E7E7E7"}}><span style={{fontSize: "0.75em", color: "#B5B5B5"}}>R$</span> { (product.price / 100).toFixed(2).toString().replace('.', ',') } </p>
                <div className="d-flex p-1 justify-content-center">
                    <input
                        type="number"
                        name="multipleQuantity"
                        className="input-group-text w-50 rounded-circle"
                        style={{outline: "none"}}
                        value={ ((product.hasOwnProperty("quantity") && product.quantity) / product.multiple) || 0 }
                        onChange={ handleChange }
                    />
                    <div className="bg-dark rounded-circle" style={{position: "absolute", right: "calc(100% / 4)", backgroundColor: "black"}}>
                        <p className="card-text p-1" style={{fontSize: "0.6em", width: "2.4em"}}>x{ product.multiple } </p>
                    </div>
                </div>
                <p className="card-text mt-1" style={{fontSize: "0.7em", color: "#B5B5B5"}}>Quantity: { (product.hasOwnProperty("quantity") && product.quantity) || 0 }</p>
            </div>
            <div className="card-footer w-100">
                <p className="card-text my-0"  style={{fontSize: "0.9em", color: "#B5B5B5"}}>Subtotal</p>
                <p className="card-text"> R$ { (product.price * ((product.hasOwnProperty("quantity") && product.quantity) || 0) / 100).toFixed(2).toString().replace('.', ',') }</p>
            </div>
        </div>
    )
}

export default ProductCard;