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
