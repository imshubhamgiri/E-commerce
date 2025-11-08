import { SendHorizontal } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-linear-to-r from-gray-950 via-slate-800 to-gray-900 text-stone-400 py-6 w-full'>
      <div className='container m-auto px-3 lg:px-8'>
        <div className='grid grid-cols-2 sm:grid-cols-2 justify-center  md:grid-cols-5 gap-3 sm:gap-6 mb-6'>
          
          {/* Exclusive */}
          <div className='flex gap-2 flex-col text-white'>
            <h2 className='text-xs sm:text-lg lg:text-2xl font-bold hover:underline cursor-pointer'>Exclusive</h2>
            <p className='text-xs hover:underline cursor-pointer'>Subscribe</p>
            <p className='text-xs'>Get 10% off your first order</p>
            <div className='flex relative w-full items-center mt-1'>
              <input 
                type="email" 
                placeholder='Enter your email' 
                className='py-1 px-2 outline-none border w-full border-gray-500 rounded-md text-xs text-black'
              />  
              <SendHorizontal size={14} className='mr-1 cursor-pointer absolute right-1' />
            </div>
          </div>

          {/* Support */}
          <div className='flex gap-2 flex-col text-white'>
            <h2 className='text-xs sm:text-lg lg:text-2xl font-bold'>Support</h2>
            <p className='text-xs'>Sector 12 Laxmi Nagar, Noida 201301, India</p>
            <p className='text-xs break-all'>Exclusive@support.com</p>
            <p className='text-xs'>+1 234 567 890</p>
          </div>

          {/* Account */}
          <div className='flex gap-2 flex-col text-white'>
            <h2 className='text-xs sm:text-lg lg:text-2xl font-bold hover:underline cursor-pointer'>Account</h2>
            <Link to="/account" className='text-xs hover:underline cursor-pointer'>My Account</Link>
            <Link to="/login" className='text-xs hover:underline cursor-pointer'>Login/Signup</Link>
            <Link to="/cart" className='text-xs hover:underline cursor-pointer'>Cart</Link>
            <Link to="/wishlist" className='text-xs hover:underline cursor-pointer'>Wishlist</Link>
            <Link to="/product" className='text-xs hover:underline cursor-pointer'>Shop</Link>
          </div>
        
          {/* Quick Links */}
          <div className='flex gap-2 flex-col text-white'>
            <h2 className='text-xs sm:text-lg lg:text-2xl font-bold hover:underline cursor-pointer'>Quick Links</h2>
            <Link to="#" className='text-xs hover:underline cursor-pointer'>Privacy Policy</Link>
            <Link to="#" className='text-xs hover:underline cursor-pointer'>Terms of Use</Link>
            <Link to="#" className='text-xs hover:underline cursor-pointer'>FAQ</Link>
            <Link to="#" className='text-xs hover:underline cursor-pointer'>Contact</Link>
          </div>

          {/* Social Handles */}
          <div className='flex gap-2 flex-col text-white'>
            <h2 className='text-xs sm:text-lg lg:text-2xl font-bold hover:underline cursor-pointer'>Follow Us</h2>
            <Link to="#" className='text-xs hover:underline cursor-pointer'>Facebook</Link>
            <Link to="#" className='text-xs hover:underline cursor-pointer'>Twitter</Link>
            <Link to="#" className='text-xs hover:underline cursor-pointer'>Instagram</Link>
            <Link to="#" className='text-xs hover:underline cursor-pointer'>LinkedIn</Link>
          </div>
        
        </div>

        {/* Copyright */}
        <div className='border-t border-gray-700 pt-4'>
          <p className='text-xs text-center hover:underline cursor-pointer'>&copy; 2025 Exclusive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
