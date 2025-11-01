import React from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1>Your Shopping Cart</h1>
      {/* Cart items will be displayed here */}
      <div className='flex flex-col items-center'>
        <p>Your cart is currently empty.</p>
        <img src="/grocery.gif" width={300} alt="" />
        <Link to={'/'}>
        <button  className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
            Continue Shopping
        </button>
        </Link>
        </div>
    </div>
  )
}

export default Cart
