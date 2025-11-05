import React, { useEffect } from 'react'
import { product } from "../data/product.js";
import { Link } from "react-router-dom";
import { ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const Product = () => {
  const [catdown, setcatdown] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(product)
  const [SelectedCategory, setCategory] = useState('All')

  // Helper function to get a unique list of all categories
  const categories = ['All', ...new Set(product.map(p => p.category))];

  useEffect(() => {
    const filtered = SelectedCategory === 'All' ? product : product.filter(p => p.category === SelectedCategory);
    setFilteredProducts(filtered);
  }, [SelectedCategory]);

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
          {catdown && <div className='absolute text-red-500 bg-opacity-100 border  -left-18  mt-2 py-4 px-2 w-48  shadow-lg z-10'>
           <div className="category-filter-buttons w-full flex flex-col gap-2">
      {categories.map(category => (
        <button
          key={category}
          // The click handler updates the state
          onClick={() => setSelectedCategory(category)}
          // Highlight the active button for better UX
          className={SelectedCategory === category ? 'active' : ''}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize first letter */}
        </button>
      ))}
    </div>
          </div>}
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {filteredProducts.map(product => (
          <div key={product.id} className='border p-4'>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className='w-full h-48 object-cover mb-2' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-gray-600'>{product.description}</p>
              <p className='text-xl font-bold'>${product.price / 100}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
