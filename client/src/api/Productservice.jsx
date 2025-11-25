import axios from "axios";

const API_URL = "https://e-commerce-l5st.onrender.com/api/products";

export const fetchProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};
