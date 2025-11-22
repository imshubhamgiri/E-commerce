import { Heart, ShoppingCart, Search, User } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useCart } from '../Context/CartContext.jsx';
  
const Navbar2 = () => {
  const { cartItems } = useCart();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  // Re-check token on mount and whenever the route changes (e.g. after login redirect)
  useEffect(() => {
    const token = localStorage.getItem('token');
    // setIsLoggedIn(!!token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, [location]);
  
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  setIsLoggedIn(false)
}

  return (
    <div className='lg:px-12 pt-8 pb-4 border-b'>
        <div className='flex gap-4 flex-col md:flex-row justify-between items-center'>
            <div className=''>
            <h2 className='text-3xl font-medium '>Exclusive</h2>
            </div>
            <div></div>
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
                        {IsLoggedIn && <button className='cursor-pointer' onClick={logout} >Log Out</button>}
                       {!IsLoggedIn && <NavLink 
                            to="/login" 
                            className={({ isActive }) => 
                                isActive ? 'underline ' : ''
                            }
                        >
                            SignUp
                        </NavLink>
                        }
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
                <Link to="/user/profile" className='cursor-pointer relative'><User size={18} />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar2
