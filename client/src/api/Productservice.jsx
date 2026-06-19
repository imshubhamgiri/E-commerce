import axios from "axios";
import API_URL from "../config/api";

export const fetchProducts = async (query) => {
  const { data } = await axios.get(`${API_URL}/products/pg`, { params: query });
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};

export const fetchProductFilters = async () => {
  const res = await fetch(`${API_URL}/products/filters`);
  if (!res.ok) throw new Error('Failed to fetch filters');
  return res.json();
};



// // Replace your hardcoded import with this query hook
// const { data: filterData, isLoading: filtersLoading } = useQuery({
//   queryKey: ['productFilters'],
//   queryFn: fetchProductFilters,
//   staleTime: 1000 * 60 * 60 * 24, // 24 Hours in milliseconds
// });

// // Format your arrays safely with fallbacks
// const rawCategories = filterData?.categories || [];
// const backendBrands = filterData?.brands || [];

// // Capitalize categories dynamically from the DB data
// const categories = [
//   'All', 
//   ...rawCategories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
// ];
