import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from './Button'

const BASE_URL = 'http://localhost:8080'

function ProductCard({ order, setOrder }) {
    // Solicitar a lista de produtos ao servidor
    const [isFetching, setIsFetching] = useState(true)
    const [products, setProducts] = useState([])
    useEffect(() => {
        if(isFetching) fetchData()
      }, [isFetching])
    const fetchData = async () => {
        const products = (await axios.get(BASE_URL + '/products')).data
        setProducts(products)
        setSelectedProduct({...products[0], quantity: 0})
        setIsFetching(false)
    }

    // Escolher o produto pra adicionar no pedido
    const DEFAULT_PRODUCT = {
        id:"0",
        name: "",
        multiple: 1,
        quantity: 0,
        price: 0
      }
    const [selectedProduct, setSelectedProduct] = useState(DEFAULT_PRODUCT)
    const handleSelectChange = (e) => {
        const selectedProductId = e.target.value
        const productFoundInOrder = order.products.find(product => product.id === selectedProductId)
        if(!productFoundInOrder) {
            const selectedProductData = products.find(product => product.id === selectedProductId)
            setSelectedProduct({...selectedProductData, quantity: 0})
        }
        else{
            setSelectedProduct(productFoundInOrder)
        }
    }

    // Definir a quantidade do produto
    const handleQuantityChange = (e) => {
        if(e.target.value >= 0) {
            const quantity = e.target.value * selectedProduct.multiple
            setSelectedProduct(selectedProduct => {return {...selectedProduct, quantity}})
        }
	}

    // Definir o preço do produto
    const handlePriceChange = (e) => {
        const price = e.target.value
                        .replace(/\./g, "")
                        .replace(',', "")
        const isValid = /^\d+$/.test(price)
        if(isValid) {
            setSelectedProduct({...selectedProduct, price })
        }
    }
    const profitability = (() => {
        if(!isFetching) {
            const defaultProduct = products.find(product => product.id === selectedProduct.id)
            const defaultPrice = defaultProduct.price
            if(selectedProduct.price >= defaultPrice) return "great"
            else if(selectedProduct.price >= defaultPrice * 9 / 10) return "good"
            return "bad"
        }
    })()

    // Adicionar no pedido
    const isAddBtnDisabled = (() => {
        const productInOrder = order.products.find(product => product.id === selectedProduct.id)

        if(!isFetching && selectedProduct.id !== "0") {
            if(selectedProduct.quantity > 0 && ["great", "good"].includes(profitability)) return false
            if(selectedProduct.quantity > 0 && !["great", "good"].includes(profitability)) return true
            if(!productInOrder) return true
            return false
        }
        else return true
    })()

    const getAddBtnText = (() => {
        if(selectedProduct.quantity > 0) {
            if(isAddBtnDisabled) return "Low price!"
            return "Update order"
        }

        const productInOrder = order.products.find(product => product.id === selectedProduct.id)
        if(!isFetching && productInOrder && productInOrder.quantity > 0) return "Remove"
        return "Low quantity!"
    })()

    const getAddBtnColor = (() => {
        switch (getAddBtnText) {
            case "Update order": return "btn-primary"
            case "Remove": return "btn-danger"
            default: return "btn-dark"
        }
    })()

    const handleAddBtnClick = () => {
        const productIndexInOrder = order.products.findIndex(product => product.id === selectedProduct.id)

        if(selectedProduct.quantity > 0) {
            if(productIndexInOrder < 0) {
                const newOrderData = {
                    ...order,
                    products: [...order.products, selectedProduct]}
                setOrder(newOrderData)
            }
            else if(productIndexInOrder >= 0) {
                let newProductsData = [...order.products]
                newProductsData[productIndexInOrder] = selectedProduct
                const newOrderData = {
                    ...order,
                    products: newProductsData
                }
                setOrder(newOrderData)
            }
        }
        else if(productIndexInOrder >= 0) {
            const productsBefore = order.products.slice(0, productIndexInOrder)
            const productsAfter = order.products.slice(productIndexInOrder + 1)
            const newProductsData = [...productsBefore, ...productsAfter]
            const newOrderData = {
                ...order,
                products: newProductsData
            }
            setOrder(newOrderData)
        }
    }

    // Utilidades
    const calculateSubtotal = (product) => {
        const rawValue = product.price * product.quantity
        return formatValue(rawValue)
    }
    const formatValue = (rawValue) => {
        return (rawValue / 100)
                .toFixed(2)
                .toString()
                .split('')
                .map((digit, index, arr) => ((arr.length - index - 3) % 3 === 0 && (arr.length - (index + 1)) > 0 && (arr.length - index - 3) / 3 > 0) && index > 0 ? "." + digit : digit)
                .join('')
                .replace(/.(\d\d)$/, ',$1')
    }

    return (
        <div className="productCard card text-center border-dark align-items-center m-3 rounded-3" style={{boxShadow: "0px 0px 15px black", backgroundColor: "#323B44", maxHeight: "300px"}}>

            <div className="card-header w-100 h-25 border-dark">
                <select
                    value={selectedProduct.id}
                    onChange={handleSelectChange}
                    style={{outline: "none"}}
                >
                    { products.map(product => <option key={product.id} value={product.id}>{product.name}</option>) }
                </select>
            </div>
            <div className="card-body w-100">

                <div className="card-text" style={{color: "#E7E7E7"}}>
                    <span style={{fontSize: "0.75em", color: "#B5B5B5"}}>R$ </span>
                    <input
                        type="text"
                        value={ formatValue(selectedProduct.price) }
                        onChange={handlePriceChange}
                        style=
                            { profitability === "great" ?  {outline: "none", borderColor: "#0D6EFD"}
                                : profitability === "good" ? {outline: "none"}
                                : {outline: "none", borderColor: "#DC3545"}
                            }
                    />
                    <p style={{fontSize: "0.7em"}}>{"Profitability: " + profitability}</p>
                </div>

                <div className="d-flex p-1 justify-content-center">
                    <input
                        type="number"
                        name="multipleQuantity"
                        className="input-group-text w-50 rounded-circle"
                        style={{outline: "none"}}
                        value={ selectedProduct.quantity / selectedProduct.multiple }
                        onChange={ handleQuantityChange }
                    />
                    <div className="bg-dark rounded-circle" style={{position: "absolute", right: "calc(100% / 4)", backgroundColor: "black"}}>
                        <p className="card-text p-1" style={{fontSize: "0.6em", width: "2.4em"}}>x{ selectedProduct.multiple } </p>
                    </div>
                </div>
                <p className="card-text mt-1" style={{fontSize: "0.7em", color: "#B5B5B5"}}>Quantity: { selectedProduct.quantity }</p>
            </div>
            <div className="card-footer w-100">
                <p className="card-text my-0"  style={{fontSize: "0.9em", color: "#B5B5B5"}}>Subtotal</p>
                <p className="card-text"> R$ { calculateSubtotal(selectedProduct) }</p>
                <Button
                    color={ getAddBtnColor }
                    onClick={ handleAddBtnClick }
                    disabled={ isAddBtnDisabled }
                    text={ getAddBtnText }
                />
            </div>
        </div>
    )
}

export default ProductCard;