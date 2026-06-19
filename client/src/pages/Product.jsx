import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { fetchProducts, fetchProductFilters } from '../api/Productservice.jsx';
import { useQuery } from '@tanstack/react-query';
import Filter from '../components/ui/filter.jsx';

const Product = () => {
  const [SelectedCategory, setSelectedCategory] = useState('All')
  const [brands, setBrands] = useState([])
  const [page, setPage] = useState(1);
  const [filtersDropdown, setFiltersDropdown] = useState(false);
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

  // Query just for filter metadata (categories/brands from DB)
  const { data: filterData } = useQuery({
    queryKey: ['productFilters'],
    queryFn: fetchProductFilters,
    staleTime: 1000 * 60 * 60 * 24, // 24 Hours in milliseconds
  });


  const rawCategories = filterData?.categories || [];
  const backendBrands = filterData?.brands || [];

  const categories = [
    'All',
    ...rawCategories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
  ];

  const products = data?.products || [];
  const metadata = data?.metadata || {};


  const handleResetFilters = () => {
    setSelectedCategory('All');
    setBrands([]);
    setPriceRange({ min: 0, max: 10000 });
  };

  return (
    <div className='p-8'>
      <div className='flex justify-between mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Products</h2>
        <button
          className='px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-700'
          onClick={() => setFiltersDropdown(true)}
        >
          Filters
        </button>
      </div>

      {/* Slide-in filter drawer */}
      <Filter
        isOpen={filtersDropdown}
        onClose={() => setFiltersDropdown(false)}
        categories={categories}
        selectedCategory={SelectedCategory}
        setSelectedCategory={setSelectedCategory}
        brands={backendBrands}
        selectedBrands={brands}
        setSelectedBrands={setBrands}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        onReset={handleResetFilters}
      />

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
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className='px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300'
          >
            Previous
          </button>
          <span className='text-sm font-medium text-gray-700 mx-2'>
            Page {metadata.currentPage} of {metadata.totalPages}
          </span>
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