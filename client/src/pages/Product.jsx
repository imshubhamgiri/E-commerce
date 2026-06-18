import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchProducts } from '../api/Productservice.jsx';
import { useQuery } from '@tanstack/react-query';
import { Categories } from '../data/product.js';
const Product = () => {
  const [catdown, setcatdown] = useState(false)
  const [SelectedCategory, setCategory] = useState('All')
  const [brands, setBrands] = useState([])
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const query = {
    category: SelectedCategory !== 'All' ? SelectedCategory : undefined,
    brand: brands.length > 0 ? brands.join(',') : undefined,
    page: page,
    limit: 20,
    price: `${priceRange.min}-${priceRange.max}`
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', query],
    queryFn: () => fetchProducts(query),
    staleTime: 40000,
  });

  const categories = ['All', ...new Set(Categories.map(category => category.charAt(0).toUpperCase() + category.slice(1)))];

  const products = data?.products || [];
  const metadata = data?.metadata || {};

  console.log('metadata:', metadata);
  console.log('products:', products);

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
            <span>{catdown ? <ChevronUp /> : <ChevronDown />}</span>
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
      {isLoading && <div className="flex justify-center items-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>}
      {!isLoading && products.length === 0 && (
        <p className='text-gray-600'>No products found .</p>
      )}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {products.map(product => (
          <div key={product.id} className='border p-4'>
            <Link to={`/product/${product.id}`}>
              <img src={product.image_url} alt={product.name} className='w-full h-36 md:h-48 object-cover mb-2' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-gray-600 hidden md:block'>{product.description}</p>
              <p className='text-xl font-bold'>₹{product.price} {product.original_price && <span className='line-through text-gray-500'>₹{product.original_price}</span>}</p>
            </Link>
          </div>
        ))}
      </div>
      {metadata.totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-8 w-full max-w-5xl mx-auto'>
          {/* Previous Button */}
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className='px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300'
          >
            Previous
          </button>

          {/* Page Status Indicator */}
          <span className='text-sm font-medium text-gray-700 mx-2'>
            Page {metadata.currentPage} of {metadata.totalPages}
          </span>

          {/* Next Button */}
          <button
            disabled={page >= metadata.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className='px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300'
          >
            Next
          </button>
        </div>
      )}

    </div>
  )
}

export default Product
