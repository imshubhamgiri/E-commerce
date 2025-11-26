import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../Context/CartContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { fetchProductById } from '../api/Productservice.jsx';

const Productdetails = () => {
  const { cartItems, addToCart } = useCart();

  // accept either param name (id or _id) so route name doesn't break the component
  const params = useParams();
  const productId = params.id || params._id;
  const navigate = useNavigate();
  
  const [productDetails, setProductDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartItemsState, setCartItems] = useState(cartItems || []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const product = await fetchProductById(productId);
        // normalize shape if API returns { product: {...} } or { data: {...} }
        const p = product?.product || product?.data || product;
        setProductDetails(p);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // format price the same way as Product page (use actual value, don't divide by 100)
  const formatPrice = (value) => {
    if (typeof value !== 'number') return '-';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  }
  
  // useEffect(() => {
  //   console.log('Cart updated:', cartItems);
  // }, [cartItems, productDetails?.name]);

  const handleBuyNow = () => {
    // use _id or id depending on API shape
    const idForCheckout = productDetails?._id || productDetails?.id;
    navigate('/cart/checkout', { state: { productId: idForCheckout, qty: 1 } });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!productDetails) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Link to="/products" className="text-sm text-sky-600 hover:underline">← Back to products</Link>
        <div className="mt-6 text-center text-gray-600">Product not found</div>
      </div>
    )
  }

  const images = Array.isArray(productDetails.imageUrl) && productDetails.imageUrl.length
    ? productDetails.imageUrl
    : [productDetails.imageUrl];

  return (
    <>
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link to="/product" className="text-sm text-sky-600 hover:underline">← Back to products</Link>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <Truck size={16} /> Free shipping over $50
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <div className="rounded-md bg-gray-50 p-4 flex items-center justify-center">
            <img
              src={images[selectedImage]}
              alt={productDetails.name}
              className="max-h-[55vh] object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-md overflow-hidden border ${selectedImage === idx ? 'border-sky-500' : 'border-gray-200'}`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={src} alt={`${productDetails.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{productDetails.name}</h1>
            <p className="mt-2 text-gray-600">{productDetails.shortDescription || productDetails.description}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(productDetails.price)}</span>
              {productDetails.originalPrice && (
                <span className="text-sm line-through text-gray-400">{formatPrice(productDetails.originalPrice)}</span>
              )}
            </div>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><Truck size={16} /> Fast shipping</li>
              <li className="flex items-center gap-2"><RotateCcw size={16} /> 30-day returns</li>
              {productDetails.stock !== undefined && (
                <li className={`font-medium ${productDetails.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {productDetails.stock > 0 ? 'In stock' : 'Out of stock'}
                </li>
              )}
            </ul>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <button
              onClick={() => addToCart(productDetails)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-md shadow hover:bg-sky-700 transition"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} /> Add to cart
            </button>

            <button
              onClick={() => handleBuyNow()}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md shadow hover:bg-emerald-700 transition"
              aria-label="Buy now"
            >
              Buy now
            </button>

            <button
              className="ml-auto inline-flex items-center gap-2 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              aria-label="Add to wishlist"
            >
              <Heart size={16} />
              Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow-sm rounded-md p-4">
        <h3 className="text-lg font-medium text-gray-900">Product details</h3>
        <p className="mt-2 text-sm text-gray-700">{productDetails.description}</p>
      </div>
    </div>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default Productdetails
