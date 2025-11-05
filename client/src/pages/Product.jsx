import React from 'react'
import { product } from "../data/product.js";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold mb-4'>Products</h2>
      <div className='grid grid-cols-4 gap-4'>
        {product.map(product => (
          <div key={product.id} className='border p-4'>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className='w-full h-48 object-cover mb-2' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-gray-600'>{product.description}</p>
              <p className='text-xl font-bold'>${product.price / 100}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
