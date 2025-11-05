import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import CartProvider from '../components/CartProvider'
import { useCart } from '../Context/CartContext.jsx';


const Cart = () => {
  const { cartItems, clearCart } = useCart();

  // useEffect(() => {
  //   const storedCart = localStorage.getItem('cartItems');
  //   if (storedCart) {
  //     setCartItems(JSON.parse(storedCart));
  //   }
  // }, []);
  // const handleclarCart = () => {  
  //   localStorage.removeItem('cartItems');
  //   setCartItems([]);
  // }


  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-semibold bg-linear-to-r from-black via-sky-600 to-sky-800 bg-clip-text text-transparent'>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
         <div className='flex flex-col my-4 items-center'>
        <p className='text-shadow-md text-lg '>Your cart is currently empty.</p>
        <img src="/grocery.gif" width={300} alt="" />
        <Link to={'/'}>
        <button  className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
            Continue Shopping
        </button>
        </Link>
        </div> 
      ) : (
        <div>
          <div>
          <button onClick={clearCart} className='mb-4 px-4 py-2 bg-red-500 text-white rounded'>
            Clear Cart
          </button>
          </div>
          <CartProvider cartItems={cartItems} />
        </div>
      )}
    </div>
  )
}

export default Cart
