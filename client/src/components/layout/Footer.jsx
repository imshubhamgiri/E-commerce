import { Facebook, SendHorizontal } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-linear-to-r from-gray-950 via-slate-600 pl-30 to-gray-800 text-stone-400 py-6 w-full'>
      <div className='container  m-auto  grid grid-cols-5 mb-4'>
          {/* <p className='text-sm'>Follow us on social media:</p>
          <div className='flex flex-col gap-4 ml-4'>
            <a href="#" className='hover:text-white'>Facebook</a>
            <a href="#" className='hover:text-white'>Twitter</a>
            <a href="#" className='hover:text-white'>Instagram</a>
          </div> */}
          
          <div className='flex gap-3 flex-col text-white'>
            <h2 className='text-2xl hover:underline cursor-pointer'>Exclusive</h2>
            <p className='hover:underline cursor-pointer'>Subscribe</p>
            <p className='hover:underline cursor-pointer'>Get 10% off your first order</p>
           <div className='flex relative w-fit items-center mt-2'>
             <input type="email" placeholder='Enter your email' className='py-2 px-4 outline-none border w-full border-gray-500 rounded-md'/>  
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
            <h2 className='text-2xl hover:underline cursor-pointer'>Account</h2>

            <Link to="/account" className=' pr-28 text-md hover:underline cursor-pointer'>My Account</Link>
            <Link to="/Login" className=' pr-28 text-md hover:underline cursor-pointer'>Login/Signup</Link>
            <Link to="/cart" className=' pr-28 text-md hover:underline cursor-pointer'>Cart</Link>
            <Link to="/wishlist" className=' pr-28 text-md hover:underline cursor-pointer'>Wishlist</Link>
            <Link to="/product" className=' pr-28 text-md hover:underline cursor-pointer'>Shop</Link>
          </div>
        
          <div className='flex gap-3 flex-col text-white'>
            <h2 className='text-2xl hover:underline cursor-pointer'>Quick Links</h2>

            <Link to="/account" className='  text-md hover:underline cursor-pointer'>Privacy Policy</Link>
            <Link to="/Login" className='  text-md hover:underline cursor-pointer'>Terms of Use</Link>
            <Link to="/cart" className='  text-md hover:underline cursor-pointer'>FaQ</Link>
            <Link to="/wishlist" className='  text-md hover:underline cursor-pointer'>Contact</Link>
          </div>

          <div className='flex gap-3 flex-col text-white'>
            <h2 className='text-2xl hover:underline cursor-pointer'>Social Handles</h2>

            <Link to="/account" className='  text-md hover:underline cursor-pointer'> Facebook</Link>
            <Link to="/Login" className='  text-md hover:underline cursor-pointer'> Twitter</Link>
            <Link to="/cart" className='  text-md hover:underline cursor-pointer'> Instagram</Link>
            <Link to="/wishlist" className='  text-md hover:underline cursor-pointer'> LinkedIn</Link>
          </div>
        
        
        
        
        </div>
      


      {/* Copyright */}
      <div className='container mx-auto text-center'>
        <p className='hover:underline cursor-pointer'>&copy; 2023 E-commerce. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
