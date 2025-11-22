import { useCart } from "../Context/CartContext";
import { useState ,useEffect } from "react";
import {ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const API_URL = 'http://localhost:5000/api/orders';

  const isFormValid = () => {
        // Check if ALL values in the userInfo object are non-empty
        return Object.values(userInfo).every(value => value.trim() !== '');
    };

    
const user = localStorage.getItem('user')
const {id} = user ? JSON.parse(user) : {};

//shippingData
const shippingData = {
  name: userInfo.name,
  email: userInfo.email,
  phone: userInfo.phone,
  address: userInfo.address,
};

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log("User Info:", userInfo);
  }, [userInfo]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const success = await placeOrder({ shippingData, cartItems, total });

    if (success) {
      toast("Order placed successfully!");
      console.log("Order Details:", { shippingData, cartItems, total });
      navigate("/success");
      clearCart();
    } else {
      toast.error("Failed to place order.");
    }
  };

  const placeOrder = async (data) => {
        console.log("Sending order data to API:", data);
        
        const payload = {
            userId: id,
            shippingAddress: shippingData, // ✅ Remove array wrapping
            items: data.cartItems.map(item => ({
                productId: item._id,
                qty: item.qty
            })),
            totalAmount: data.total
        };

        try {
          const res = await fetch(`${API_URL}/`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(payload)
          });
          
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to place order');
          }

          const Apidata = await res.json();
          console.log("API Response Data:", Apidata);
          return true;

        } catch (error) {
          console.error("Error sending order data to API:", error);
          return false;
        }
    }

  return (
    <>
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: User Form */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <input name="name" placeholder="Name" value={userInfo.name} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="email" placeholder="Email" value={userInfo.email} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="address" placeholder="Address" value={userInfo.address} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="phone" placeholder="Phone" value={userInfo.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 disabled:bg-gray-400 rounded w-full"
           disabled={cartItems.length === 0 || !isFormValid()}>
            Place Order
          </button>
        </form>

        {/* Right: Order Summary */}
        <div className="border p-4 rounded">
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b py-1">
              <span><span><img src={item.imageUrl} alt="" className='w-15 h-15 object-cover' /></span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-3">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
      />
    </>

  );
};

export default Checkout;
