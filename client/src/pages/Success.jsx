import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Redirect to home after 10 seconds
    const timer = setTimeout(() => {
      // navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center transform hover:scale-[1.02] transition-transform duration-300">
          {/* Animated Success Icon */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <CheckCircle 
              className="relative text-green-500 w-24 h-24 md:w-32 md:h-32 animate-bounce" 
              strokeWidth={1.5}
            />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Order Placed Successfully! 🎉
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-md mx-auto">
            Thank you for your purchase! Your order has been received and is being processed.
          </p>

          {/* Order Details Card */}
          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="text-blue-600 w-6 h-6" />
              <h2 className="text-xl font-semibold text-gray-800">What's Next?</h2>
            </div>
            <ul className="text-left space-y-3 max-w-md mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl">✓</span>
                <span className="text-gray-700">Order confirmation email sent to your inbox</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl">✓</span>
                <span className="text-gray-700">Your items are being prepared for shipment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-xl">✓</span>
                <span className="text-gray-700">Track your order from your account</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/orders" 
              className="group flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <Package className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Track Order
            </Link>
            
            <Link 
              to="/" 
              className="group flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
            
            <Link 
              to="/products" 
              className="group flex items-center gap-2 text-blue-600 px-6 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Support Message */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Need help? Contact our{' '}
              <a href="/support" className="text-blue-600 hover:underline font-medium">
                customer support
              </a>
            </p>
          </div>
        </div>

        {/* Floating Decoration */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Success;