import { Heart, ShoppingCart, Search } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import React from 'react'
import { useCart } from '../Context/CartContext.jsx';

const Navbar2 = () => {
  const { cartItems } = useCart();

  return (
    <div className='px-12 pt-8 pb-4 border-b'>
        <div className='flex  justify-around items-center'>
            <div>
            <h2 className='text-3xl font-medium '>Exclusive</h2>
            </div>
            <div >
                <ul className='flex gap-10'>
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                isActive ? 'underline ' : ''
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/product" 
                            className={({ isActive }) => 
                                isActive ? 'underline ' : ''
                            }
                        >
                            Explore
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                isActive ? 'underline' : ''
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) => 
                                isActive ? 'underline ' : ''
                            }
                        >
                            SignUp
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex gap-2 items-center'>
                <div className='relative'>
                    <input 
                        type="text"  
                        className='border rounded-sm w-64 px-2 py-1 pr-8' 
                        placeholder='Search Here'
                    />
                    <Search 
                        size={18} 
                        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
                    />
                </div>
                <span className='relative'><Heart size={18}/>
                 </span>
                <Link to="/cart" className='cursor-pointer relative'><ShoppingCart size={18} />
                {cartItems.length > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1'>
                       {cartItems.length}
                    </span>
                )}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar2
