import { ArrowLeft, ArrowRight, ChevronRight, Gamepad, Gamepad2, Handbag, Heart, Laptop, LaptopMinimalCheck, Phone, Shirt, Smartphone, Store, TestTube } from 'lucide-react'
import React, { useState , useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import Productbanner from './Products/Productbanner';
import Timestamp from './common/Timestamp';
import { Button } from './ui/button';
import { fetchProducts} from '../api/Productservice';

const Main = () => {
 
  const [data, setdata] = useState([5])
  const [dbproducts, setdbproducts] = useState([])
  const [flashproducts, setflashproducts] = useState([])
  const [loading, setloading] = useState(false)
  const[Bestselling, setBestSelling] = useState([])
 
  useEffect(() => {
    const getproducts = async() => {
      const products = await fetchProducts()
      const list = Array.isArray(products) ? products : [];
      setdbproducts(list)
      // console.log('db products:', list) // Log here, not dbproducts
    } 
    getproducts();
  }, [])

  useEffect(() => {
    if (dbproducts.length > 0) { // Add safety check
      // const filtered = dbproducts.filter(p => p.category === 'Books').slice(0,10);
      setflashproducts(dbproducts.filter(p => p.category === 'Books').slice(0,10))
      setBestSelling(dbproducts.filter(p => p.category === 'Automotive').slice(0,10))
      // console.log('flash sales:', filtered)
    }
  }, [dbproducts]) // Add dbproducts as dependency

  return (
    <>    
    <div className='no-scrollbar'>
      <div className='flex md:h-[50vh] flex-col md:flex-row justify-center mb-25 overflow-hidden'>
        {/* Left Side Content of Hero section */}
        <div className='p-2 pt-10  md:w-[30vw] md:border-r h-full flex flex-col '>
          {/* <h1 className='text-2xl font-bold'>Welcome to Our Store</h1> */}
          {/* <p className='mt-4'>Discover our latest products and exclusive offers.</p> */}
          {/* Prodcut categories */}
          <div className='flex  md:justify-end gap-4 mb-6'>
            <ul className='1.5xl:w-1/2 flex flex-col gap-4 text-left'>
              <li className='flex  justify-between items-center'>Women's Fashion <span><ChevronRight size={15} /></span></li>
              <li className='flex  justify-between items-center'>Men's Fashion <span><ChevronRight size={15} /></span></li>
              <li className='flex  justify-between items-center'>Gaming </li>
              <li className='flex  justify-between items-center'>Home And Lifestyle </li>
              <li className='flex  justify-between items-center'>Electronics </li>
              <li className='flex  justify-between items-center'>Health And Beauty </li>
              <li className='flex  justify-between items-center'>Groceries and Pets</li>
              <li className='flex  justify-between items-center'>Medicine</li>
            </ul>
          </div>
        </div>



        {/* Right Side Content of Hero section */}
        <div className='w-full flex pt-10 md:pr-30 md:px-10'>
            <Productbanner data= {data}/>
        </div>
        {/* Right side Ends */}
     </div>

        <section className="first my-12 md:ml-20 flex flex-col gap-5">
          <div>
            <h3 className="text-2xl flex gap-1 font-semibold text-gray-900 mb-1"><span className='bg-black rounded-s-2xl'>🔥</span>Today's Exclusive Deals</h3>
            </div>
             <div className=' pb-2 md:mr-20 flex overflow-hidden md:justify-between items-center'>
                <div className='flex items-center md:gap-10'>
                    <h2 className="text-3xl font-bold text-gray-800">Flash Sales</h2>
                   {/* add timestamps or countdowns */}
                    <div className="">
                     <Timestamp />
                   </div>
                </div>
                {/* <Link to="/flashsales" className="flex items-center text-red-600 font-medium hover:underline hover:scale-105 transition-transform">
                  See All Deals <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </Link> */}
                <div className='flex gap-1'>
               <span className='bg-gray-100 p-3 rounded-full '><ArrowLeft className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" /></span> 
                <span className='bg-gray-100 p-3 rounded-full '><ArrowRight className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" /></span>
                </div>
             </div>
            <div className="flex py-3 w-full overflow-x-auto gap-4 flex-nowrap no-scrollbar">  {/* keep scrolling, hide native scrollbar */}
                {flashproducts.map((items, i) => (
                    <div 
                      key={i} 
                      className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 min-w-[200px] shrink-0 group"
                    >
                        <div className="h-24 w-50">
                          <img src={items.imageUrl} className='object-cover h-full w-full' alt="" />
                          </div>

                        {/* Add to cart button — hidden until hover */}
                        <button
                          className="absolute left-1/2 -translate-x-1/2 bottom-20 w-40 cursor-pointer bg-black text-white  py-1 rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
                          aria-label={`Add Item ${i+1} to cart`}
                        >
                          Add to cart
                        </button>
                        <p className="text-sm font-medium">{items.name}</p>
                        <p className="text-lg font-bold text-stone-600 mt-1">₹{items.price}</p>
                    </div>
                ))}
            </div>
              <div className='text-center mr-20 border-b pt-9 pb-12'>
                <button className='bg-black transition-all duration-300 text-white py-2 px-4 rounded hover:text-sky-300 hover:bg-gray-800 hover:scale-105'>
                  View All Deals
                </button>
              </div>
        </section>


        <section className='md:mx-20 flex flex-col gap-5 border-b border-gray-800 pb-20 mb-20'>
          <div>
            <h3 className="text-xl flex gap-1 font-semibold text-gray-900 mb-1"><span className='bg-black rounded-s-2xl'>🛍️</span>Category</h3>
          </div>
            <div className=' pb-2  flex justify-between items-center'>
                <div className='flex items-center gap-10'>
                    <h2 className="text-3xl font-bold text-gray-800">Browse By Category</h2>
                </div>
                <div className='flex gap-1'>
                   <span className='bg-gray-100 p-3 rounded-full '><ArrowLeft className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" /></span> 
                    <span className='bg-gray-100 p-3 rounded-full '><ArrowRight className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" /></span>
                </div>
             </div>

             {/* Category Items */}
            <div className="grid grid-cols-2 md:flex py-3 w-full px-2 md:overflow-x-auto gap-4 flex-nowrap no-scrollbar">
                {[
                  { name: 'laptop', slug: 'electronics' , icon: <LaptopMinimalCheck strokeWidth={0.5} size={70} />},
                  { name: "Smartphones", slug: 'womens-fashion', icon: <Smartphone strokeWidth={0.5} size={70} /> },
                  { name: "Men's Fashion", slug: 'mens-fashion', icon: <Shirt strokeWidth={0.5} size={70} /> },
                  { name: 'Home & Lifestyle', slug: 'home-lifestyle', icon: <Store strokeWidth={0.5} size={70} /> },
                  { name: 'Gaming', slug: 'gaming', icon: <Gamepad2 strokeWidth={0.5} size={70} /> },
                  { name: 'Groceries', slug: 'groceries', icon: <Handbag strokeWidth={0.5} size={70} /> }
                ].map((cat, i) => (
                  <NavLink
                    key={i}
                    to={`/category/${cat.slug}`}
                    className={({ isActive }) =>
                      `p-4 rounded-lg shadow-md hover:shadow-xl hover:bg-purple-50 text-center hover:scale-105 transition duration-300   md:min-w-[180px] shrink-0 ${
                        isActive ? 'bg-purple-100' : 'bg-white'
                      }`
                    }
                  >
                    <div className="h-24 rounded mb-3 flex items-center justify-center font-extralight">
                     {cat.icon}
                    </div>
                    <p className="text-sm font-medium">{cat.name}</p>
                  </NavLink>
                ))}
            </div>
        </section>

       <section className="third w-100vw overflow-x-hidden my-12 md:ml-20 flex flex-col gap-5">
          <div>
            <h3 className="text-2xl flex gap-1 font-semibold text-gray-900 mb-1"><span className='bg-black rounded-s-2xl'>❕</span>This Month</h3>
            </div>
             <div className=' pb-2 px-2 md:mr-20 flex justify-between items-center'>
                <div className='flex items-center gap-10'>
                    <h2 className="text-3xl md:font-bold text-gray-800">Best Selling Products</h2>
                </div>
                {/* <Link to="/flashsales" className="flex items-center text-red-600 font-medium hover:underline hover:scale-105 transition-transform">
                  See All Deals <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </Link> */}
                <div className='flex gap-1'>
                 <Button>View All Products</Button>
                </div>
             </div>
            <div className="flex py-3 w-auto overflow-x-auto   gap-8 flex-nowrap no-scrollbar">  {/* keep scrolling, hide native scrollbar */}
                {Bestselling.map((items, i) => (
                    <div 
                      key={i} 
                      className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 min-w-[200px] shrink-0 group"
                    >

                        <div className="h-28 w-55 relative"><img src={items.imageUrl} className='w-full h-full object-cover' alt="" /> <span className='rounded-full bg-white absolute 
                        top-2 shadow-md right-2 text-black p-1'><Heart size={15} className='' /></span></div>

                        {/* Add to cart button — hidden until hover */}
                        <button
                          className="absolute left-1/2 -translate-x-1/2 bottom-20 w-40 cursor-pointer bg-black text-white  py-1 rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
                          aria-label={`Add Item ${i+1} to cart`}
                        >
                          Add to cart
                        </button>
                        <p className="text-sm font-medium">{items.name}</p>
                        <p className="text-lg font-bold text-stone-600 mt-1">₹{items.price}</p>
                    </div>
                ))}
            </div>
        </section>

        <div className='hidden md:grid h-86 grid-cols-2 p-13 bg-black mx-40 mb-20'>
           <div className='flex flex-col gap-8 items-start'>
             <button className='text-green-400 font-semibold text-md'>
              Categories
              </button> 
              <h2 className='flex flex-wrap text-white text-5xl'>
                Enhance Your Music Experience
                </h2>
                 <Link to={'/product'}>
                <Button variant="outline" className={'cursor-pointer'} size="lg">
                 Shop Now</Button>
                </Link>
            </div>
                <div
                  className='
                     
                        shadow-2xl shadow-orange-700/50 // This creates the glowing background  '>
               <img 
                      width={400} 
                      src="/boatspeaker2.png" 
                     alt="" 
                     className="bg-blend-color-dodge hover:scale-105 transition-transform" // This will blur the image itself />
               />
                  </div>
          </div>

        
    </div>
    </>
  )
}

export default Main
