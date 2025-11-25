import React, { useState , useEffect, useCallback } from 'react'
import { fetchProductById } from '../api/Productservice';
const Order = () => {
const [Orders, setOrders] = useState([]);
const [orderdetails, setorderdetails] = useState()
const [loading, setLoading] = useState(true)

const authHeaders = useCallback(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }, []);

useEffect(() => {
    const fetchOrders = async () => {
        try {
            const user = localStorage.getItem('user')
            const {id} = user ? JSON.parse(user) : {};

        
            
            const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
              headers: authHeaders()
            });
            const data = await response.json();
            setOrders(data);
            console.log("Fetched Orders:", data);
        }
        catch (error) {
            console.error("Error fetching orders:", error);
        }finally{
            setLoading(false)
        }
    };
    fetchOrders();
}, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }
  return (
    <div>
        <div>
        <h2 className="text-2xl text-center bg-clip-text text-transparent  bg-linear-to-r from-purple-600 to-pink-500 mb-4">Your Orders</h2>
        </div>
        <div className='flex flex-col items-center w-full  px-10 py-20 bg-amber-200'>

        {loading && <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>}

      
      {Orders.map(order => (
        <div key={order._id} className='border w-full mb-6 p-4 rounded-lg bg-white shadow-md'>
          <h3>Order ID: {order._id}</h3>
          {/* <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p> */}
          
          {/* Products List */}
          <div className='mt-4'>
            <h4 className='font-semibold mb-2'>Products:</h4>
            {order.products?.map((product, index) => (
              <div key={index} className='border-t pt-2 mt-2 flex gap-4'>
                {/* Product Image */}
                {product.productId?.imageUrl && (
                  <img 
                    src={product.productId.imageUrl} 
                    alt={product.productId.name} 
                    className='w-20 h-20 object-cover rounded'
                  />
                )}
                
                <div className='flex-1'>
                  <p className='font-semibold'>{product.productId?.name}</p>
                  <p className='text-sm text-gray-600'>{product.productId?.brand}</p>
                  <p>Quantity: {product.qty}</p>
                  <p>Price: ₹{product.productId.price}</p>
                  <p className='font-semibold'>Subtotal: ₹{product.qty * product.productId.price}</p>
                     <div>
                      <p>Ordered On: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      ))}
        </div>
    </div>
  )
}

export default Order
