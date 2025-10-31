import { Heart, ShoppingCart, Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import React from 'react'

const Navbar2 = () => {
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
                            to="/contact" 
                            className={({ isActive }) => 
                                isActive ? 'underline ' : ''
                            }
                        >
                            Contact
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
                <span><Heart size={18}/></span>
                <span><ShoppingCart size={18} /></span>
            </div>
        </div>
    </div>
  )
}

export default Navbar2
