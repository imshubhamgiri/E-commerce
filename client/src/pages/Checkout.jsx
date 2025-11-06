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

  const isFormValid = () => {
        // Check if ALL values in the userInfo object are non-empty
        return Object.values(userInfo).every(value => value.trim() !== '');
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

  const handleCheckout = (e) => {

    toast("Order placed successfully!");
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in all fields.");
      return;
    }
    mockApiCall({ userInfo, cartItems, total })
      .then((response) => {
        if (response) {
          toast("Order placed successfully!");
          console.log("Order Details:", { userInfo, cartItems, total });
          // navigate("/");
          clearCart();
        } else {
          toast.error("Failed to place order.");
        }
      });
  };

  const mockApiCall = (data) => {
        // Replace this with your actual API call (e.g., using fetch or axios)\
        console.log("Sending order data to API:", data);
        return new Promise(resolve => {
            setTimeout(() => {
                // Simulate a successful response
                resolve(true); 
            }, 1000); // Simulate network latency
        });
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
            <div key={item.id} className="flex justify-between border-b py-1">
              <span><span><img src={item.image} alt="" className='w-15 h-15 object-cover' /></span>{item.name} × {item.qty}</span>
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
