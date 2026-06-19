// client/src/components/ui/filter.jsx

import React from 'react';
import { X } from 'lucide-react';

const Filter = ({
  isOpen,
  onClose,
  categories = ['All'],
  brands = [],
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  onReset,
}) => {
  const priceBuckets = [
    { label: 'All', min: 0, max: 10000 },
    { label: '$0 - $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200+', min: 200, max: 10000 },
  ];

  const toggleBrand = (brand) => {
    if (brand === 'All') {
      setSelectedBrands([]);
      return;
    }
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sliding drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white text-black shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="flex flex-col gap-1">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left w-full px-3 py-2 rounded hover:bg-gray-100 ${
                      selectedCategory === category ? 'bg-gray-200 font-semibold' : ''
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold mb-2">Brands</h3>
            <ul className="flex flex-col gap-1">
              <li>
                <button
                  onClick={() => toggleBrand('All')}
                  className={`text-left w-full px-3 py-2 rounded hover:bg-gray-100 ${
                    selectedBrands.length === 0 ? 'bg-gray-200 font-semibold' : ''
                  }`}
                >
                  All
                </button>
              </li>
              {brands.map((brand) => (
                <li key={brand}>
                  <label className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <ul className="flex flex-col gap-1">
              {priceBuckets.map((bucket) => (
                <li key={bucket.label}>
                  <button
                    onClick={() => setPriceRange({ min: bucket.min, max: bucket.max })}
                    className={`text-left w-full px-3 py-2 rounded hover:bg-gray-100 ${
                      priceRange.min === bucket.min && priceRange.max === bucket.max
                        ? 'bg-gray-200 font-semibold'
                        : ''
                    }`}
                  >
                    {bucket.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="w-full py-2 rounded bg-gray-900 text-white hover:bg-gray-700"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;