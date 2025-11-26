import axios from "axios";
import API_URL from "../config/api";

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};
