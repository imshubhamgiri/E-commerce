import { useCart } from "../Context/CartContext";
import { useState, useEffect , useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
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
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  if (!token) {
    toast.error("Please login first");
    navigate('/login');
    return;
  }
  const getauthHeader = useCallback(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }, [token]);


  const API_URL = 'http://localhost:5000/api';

  const isFormValid = () => {
    return Object.values(userInfo).every(value => value.trim() !== '');
  };

  const user = localStorage.getItem('user')
  const { id } = user ? JSON.parse(user) : {}; //was using it earlier to pass user?.id

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

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // DEBUG: Check what's in localStorage
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('token:', localStorage.getItem('token'));
    console.log('authToken:', localStorage.getItem('authToken'));
    console.log('Auth header:', getauthHeader());


    setLoading(true);

    try {
      // Step 1: Create order in MongoDB
      const orderResponse = await fetch(`${API_URL}/orders/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' , ...getauthHeader()},
        body: JSON.stringify({
          shippingAddress: shippingData,
          items: cartItems.map(item => ({
            productId: item._id,
            qty: item.qty
          })),
          totalAmount: total
        })
      });

      console.log('Response status:', orderResponse.status);

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        console.log('Error details:', errorData);
        throw new Error(errorData.message || 'Failed to create order');
      }

      const orderData = await orderResponse.json();
      console.log("Order created:", orderData);

      // Step 2: Create Razorpay order
      const razorpayResponse = await fetch(`${API_URL}/payments/create-razorpay-order`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ orderId: orderData._id })
      });

      if (!razorpayResponse.ok) {
        throw new Error('Failed to create Razorpay order');
      }

      const razorpayData = await razorpayResponse.json();
      console.log("Razorpay order created:", razorpayData);

      // Step 3: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load Razorpay. Please try again.');
        setLoading(false);
        return;
      }

      // Step 4: Open Razorpay checkout
      const options = { 
        key: razorpayData.keyId,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        name: 'E-buy Store',
        description: 'Order Payment',
        order_id: razorpayData.orderId,
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        theme: {
          color: '#3399cc'
        },
        handler: async function (response) {
          // Step 5: Verify payment
          try {
            const verifyResponse = await fetch(`${API_URL}/payments/verify-payment`, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderData._id
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast.success('Payment successful!');
              clearCart();
              navigate('/success', { 
                state: { 
                  orderId: orderData._id,
                  paymentId: response.razorpay_payment_id 
                } 
              });
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled');
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process checkout');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleCheckout} className="space-y-4">
            <input 
              name="name" 
              placeholder="Name" 
              value={userInfo.name} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
            <input 
              name="email" 
              placeholder="Email" 
              value={userInfo.email} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
            <input 
              name="address" 
              placeholder="Address" 
              value={userInfo.address} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
            <input 
              name="phone" 
              placeholder="Phone" 
              value={userInfo.phone} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 disabled:bg-gray-400 rounded w-full"
              disabled={cartItems.length === 0 || !isFormValid() || loading}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>

          <div className="border p-4 rounded">
            <h3 className="text-lg font-medium mb-2">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between border-b py-1">
                <span>
                  <img src={item.imageUrl} alt="" className='w-15 h-15 object-cover inline' />
                  {item.name} × {item.qty}
                </span>
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
