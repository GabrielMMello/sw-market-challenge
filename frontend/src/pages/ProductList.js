import { useState } from 'react'
import ProductCard from './components/ProductCard.js'

function ProductList() {
    const [ products, setProducts ] = useState([
        {
          id: 1,
          name: "Millenium​ ​Falcon",
          price: 55000000,
          multiple: 1
        },
        {
          id: 2,
          name: "X-Wing",
          price: 6000000,
          multiple: 2
        },
        {
          id: 3,
          name: "Super​ ​Star​ ​Destroyer",
          price: 457000000,
          multiple: 1
        },
        {
          id: 4,
          name: "TIE​ ​Fighter",
          price: 7500000,
          multiple: 2
        },
        {
          id: 5,
          name: "Lightsaber",
          price: 600000,
          multiple: 5
        },
        {
          id: 6,
          name: "DLT-19​ ​Heavy​ ​Blaster​ ​Rifle",
          price: 580000,
          multiple: 1
        },
        {
          id: 7,
          name: "DL-44​ ​Heavy​ ​Blaster​ ​Pistol",
          price: 150000,
          multiple: 10
        }
      ])

    return (
        <div className="productList">
            { products.map(product => <ProductCard product={ product } />) }
        </div>
    )
}

export default ProductList;