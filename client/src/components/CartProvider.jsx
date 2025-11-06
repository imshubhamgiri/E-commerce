import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext.jsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


const CartProvider = ({ cartItems }) => {

  const { setCartItems } = useCart();
  const { removeFromCart } = useCart();

  const QuantityChange = (id, newqty) => {
    if (newqty < 1) {
      let c = confirm("Do you want to remove this product from cart?");
      if (c) {
        removeFromCart(id);
        return;
      }

      console.log("Quantity cannot be less than 1");
      return;
    }
    console.log("Changing quantity for id:", id, "to new quantity:", newqty);
    // const storedCart = localStorage.getItem("cartItems");
    // let cartItems = storedCart ? JSON.parse(storedCart) : [];
    // cartItems = cartItems.map((item) =>
    //   item.id === id ? { ...item, qty: newqty } : item
    // );
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // window.location.reload(); // Simple way to refresh the component to reflect changes
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: newqty } : item
      )
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2);

  return (
    <div className='p-8 w-full max-w-3xl'>
      {cartItems.map(item => (
        <div key={item.id} className='border-b grid grid-cols-2 border-gray-200 py-4'>
          <div>
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} className='w-32 h-32 object-cover' />
            </Link>
          </div>
          <div>
            <h2 className='text-lg font-semibold'>{item.name}</h2>
            <p className='text-gray-600'>{item.description}</p>
            <p className='text-gray-800 font-bold'>${item.price}</p>
            <div className='mt-2 flex justify-between'>
              <div className='flex items-center gap-1.5 border w-fit p-1'>Qty {item.qty}
                <div>
                  <ChevronUp size={12} onClick={() => QuantityChange(item.id, item.qty + 1)} />
                  <ChevronDown size={12} onClick={() => QuantityChange(item.id, item.qty - 1)} />
                </div>
              </div>
              <button className='bg-red-500 text-white rounded px-2 py-1'
                onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
      <div className='mt-4 flex justify-between'>
        <div>
          <h2 className='text-lg font-semibold'>Total:</h2>
          <p className='text-gray-800 font-bold'>
            ${totalPrice}
          </p>
        </div>
        <Link to={'/cart/checkout'} className='' > <button className='px-4 py-2 cursor-pointer bg-green-500 text-white rounded'>
          Proceed to Checkout </button></Link>
      </div>
    </div>
  )
}

export default CartProvider
