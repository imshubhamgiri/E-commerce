import React from 'react'
import { useParams } from "react-router-dom";
import { product } from '../data/product';


const Productdetails = () => {
    const { id } = useParams(); // this "id" comes from the URL
  // Later we’ll fetch or filter product by id
  const productDetails = product.find(item => item.id === parseInt(id));
  return (
    <div className="p-8">
      <h1>Product ID: {id}</h1>
      {productDetails ? (
        <div className='flex flex-col items-center'>
          <h2>{productDetails.name}</h2>
          <img className='max-h-[50vh] rounded-full' src={productDetails.image} alt={productDetails.name} />
          <p>{productDetails.description}</p>
          <p>Price: ${productDetails.price / 100}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  )
}

export default Productdetails
