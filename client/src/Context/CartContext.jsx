import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartStateProvider");
  }
  return context;
};

export const CartStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize state from localStorage immediately
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

//   const [cartItems, setCartItems] = useState(() => {
//   try {
//     return JSON.parse(localStorage.getItem("cartItems")) || [];
//   } catch {  it's safer to wrap in try-catch and more clear to understand
//     return [];
//   }
// });

  // Save cart to localStorage WHENEVER cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a product to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Clear cart completely
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems,setCartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
