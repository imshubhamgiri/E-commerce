import { Facebook, SendHorizontal } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-linear-to-r from-gray-950 via-slate-600 to-gray-800  text-stone-400 py-6'>
        <div className='container mx-20 items-start grid grid-cols-5 mb-4'>
          {/* <p className='text-sm'>Follow us on social media:</p>
          <div className='flex flex-col gap-4 ml-4'>
            <a href="#" className='hover:text-white'>Facebook</a>
            <a href="#" className='hover:text-white'>Twitter</a>
            <a href="#" className='hover:text-white'>Instagram</a>
          </div> */}
          
          <div className='flex gap-3 flex-col text-white'>
            <h2 className='text-2xl'>Exclusive</h2>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
           <div className='flex relative w-fit items-center mt-2'>
             <input type="email" placeholder='Enter your email' className='py-2 px-4 outline-none border border-gray-500 rounded-md'/>  
             <SendHorizontal size={18} className=' mr-1 cursor-pointer absolute right-1' />
           </div>
          </div>

          <div className='flex gap-3 flex-col text-white'>
            <h2 className='text-2xl'>Support</h2>

            <p className=' pr-28 text-md'>sector12 Laxmi Nagar,Noida 40203, India</p>
            <p className='text-md'>Exlusive@support.com</p>
            <p className='text-md'>+1234567890</p>
          </div>

          <div className='flex gap-3 flex-col text-white'>
            <h2 className='text-2xl'>Account</h2>

            <Link to="/account" className=' pr-28 text-md'>My Account</Link>
            <Link to="/Login" className=' pr-28 text-md'>Login/Signup</Link>
            <Link to="/cart" className=' pr-28 text-md'>Cart</Link>
            <Link to="/wishlist" className=' pr-28 text-md'>Wishlist</Link>
            <Link to="/shop" className=' pr-28 text-md'>Shop</Link>
          </div>
        
          <div className='flex gap-3 flex-col text-white'>
            <h2 className='text-2xl'>Quick Links</h2>

            <Link to="/account" className='  text-md'>Privacy Policy</Link>
            <Link to="/Login" className='  text-md'>Terms of Use</Link>
            <Link to="/cart" className='  text-md'>FaQ</Link>
            <Link to="/wishlist" className='  text-md'>Contact</Link>
          </div>

          <div className='flex gap-3 flex-col text-white'>
            <h2 className='text-2xl'>Social Handles</h2>

            <Link to="/account" className='  text-md'> Facebook</Link>
            <Link to="/Login" className='  text-md'> Twitter</Link>
            <Link to="/cart" className='  text-md'> Instagram</Link>
            <Link to="/wishlist" className='  text-md'> LinkedIn</Link>
          </div>
        
        
        
        
        </div>
      


      {/* Copyright */}
      <div className='container mx-auto text-center'>
        <p>&copy; 2023 E-commerce. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
