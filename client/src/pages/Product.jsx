import React, { useEffect } from 'react'
// import { product } from "../data/product.js";
import { Link } from "react-router-dom";
import { ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { fetchProducts } from '../api/Productservice.jsx';
const Product = () => {
  const [dbProducts, setDbProducts] = useState([]) // must be an array
  const [catdown, setcatdown] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [SelectedCategory, setCategory] = useState('All')
  const [loading, setloading] = useState(true)
  

  useEffect(() => {
    const getProducts = async () => {
      setloading(true);
      try {
        const products = await fetchProducts();
        // normalize API shape: if API returns { products: [...] } or { data: [...] }
        const list = Array.isArray(products)
          ? products
          : [];
        setDbProducts(list);
        const id = list.map(p => p._id);
        // console.log("Fetched products:", id);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setloading(false);
      }
    };

    getProducts();
  }, []);

  // Helper function to get a unique list of all categories
  const categories = ['All', ...new Set((Array.isArray(dbProducts) ? dbProducts : []).map(p => p.category))]

  useEffect(() => {
    const source = Array.isArray(dbProducts) ? dbProducts : [];
    const filtered = SelectedCategory === 'All' ? source : source.filter(p => p.category === SelectedCategory);
    setFilteredProducts(filtered);
  }, [SelectedCategory, dbProducts]);

  const setSelectedCategory = (category) => {
    setCategory(category);
    setcatdown(false); // Close the dropdown after selection
  }
  const handleblur = () => {
    setTimeout(() => {
      setcatdown(false);
    }, 250);
  }

  return (
    <div className='p-8'>
      <div className='flex justify-between mb-8'>
       <h2 className='text-2xl font-bold mb-4'>Products</h2>
        <div className='relative'>
          <button className='text-lg flex items-center font-semibold'
            onClick={() => setcatdown(!catdown)}
            onBlur={handleblur}
            >
              Category
              <span>{catdown ? <ChevronUp/> : <ChevronDown/>}</span>
            </button>
          {catdown && <div className='absolute text-black bg-gray-200 h-30 overflow-x-scroll no-scrollbar -left-18  mt-2 py-4 px-2 w-48  z-10'>
           <div className="category-filter-buttons  w-full flex flex-col gap-2">
      {categories.map(category => (
        <button
          key={category}
          // The click handler updates the state
          onClick={() => setSelectedCategory(category)}
          // Highlight the active button for better UX
          className={`text-left w-full px-3 py-2 rounded hover:bg-gray-300 ${SelectedCategory === category ? 'bg-gray-400 font-bold' : ''}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize first letter */}
        </button>
      ))}
    </div>
          </div>}
        </div>
      </div>
      {loading && <div className="flex justify-center items-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>}
      {!loading && filteredProducts.length === 0 && (
        <p className='text-gray-600'>No products found .</p>
      )}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {filteredProducts.map(product => (
          <div key={product._id} className='border p-4'>
            <Link to={`/product/${product._id}`}>
              <img src={product.imageUrl} alt={product.name} className='w-full h-36 md:h-48 object-cover mb-2' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-gray-600 hidden md:block'>{product.description}</p>
              <p className='text-xl font-bold'>₹{product.price } {product.originalPrice && <span className='line-through text-gray-500'>₹{product.originalPrice}</span>}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
