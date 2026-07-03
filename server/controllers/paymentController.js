import crypto from 'crypto';
import orderEvents from '../events/orderEvents.js';
import { razorpayInstance } from '../config/razorpay.js';
import Order from '../models/Order.js';
import pgPool from '../config/pgdb.js';

// Create Razorpay Order
export async function createRazorpayOrder(req, res) {
  try {
    const { orderId } = req.body;

    // Get order from database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const amountInPaise = Math.round(Number(order.totalAmount) * 100);
    // Create Razorpay order
    const options = {
      amount: amountInPaise, // amount in smallest currency unit (paise)
      currency: 'INR',
      receipt: `order_${orderId}`,
      notes: {
        orderId: orderId.toString(),
      }
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Update order with Razorpay order ID
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.KEY_ID,
    });

  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ 
      message: 'Failed to create Razorpay order', 
      error: error.message 
    });
  }
}

// Verify Payment
// export async function verifyPayment(req, res) {
//   try {
//     const { 
//       razorpay_order_id, 
//       razorpay_payment_id, 
//       razorpay_signature,
//       orderId 
//     } = req.body;

//     // Create signature
//     const sign = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac('sha256', process.env.KEY_SECRET)
//       .update(sign.toString())
//       .digest('hex');

//     // Verify signature
//     if (razorpay_signature === expectedSign) {
//       // Update order with payment details
//       const order = await Order.findById(orderId);
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }

//       order.razorpayPaymentId = razorpay_payment_id;
//       order.razorpaySignature = razorpay_signature;
//       order.paymentStatus = 'completed';
//       order.status = 'confirmed';
//       await order.save();

//       // Emit order confirmed event
//       orderEvents.emit('orderConfirmed', order);

//       res.status(200).json({
//         success: true,
//         message: 'Payment verified successfully',
//         order
//       });
//     } else {
//       // Payment verification failed
//       const order = await Order.findById(orderId);
//       if (order) {
//         order.paymentStatus = 'failed';
//         await order.save();
//       }

//       res.status(400).json({
//         success: false,
//         message: 'Invalid payment signature'
//       });
//     }

//   } catch (error) {
//     console.error('Payment verification error:', error);
//     res.status(500).json({ 
//       message: 'Payment verification failed', 
//       error: error.message 
//     });
//   }
// }


export async function createPgRazorpayOrder(req, res) {
  try {
    const { orderId } = req.body;
   console.log("Received orderId for Razorpay order creation:", orderId);

    const order = await pgPool.query('SELECT * FROM orders WHERE id = $1;', [orderId]);

    if(!order.rows.length){
      return res.status(404).json({ message: 'Order not found' });
    }

    const amount = Math.round(Number(order.rows[0].total_price) * 100); // Convert to paise

    // 1. Create order inside Razorpay instance
    const options = {
      amount: amount, // Razorpay expects paise/cents
      currency: "INR",
      receipt: orderId // 36 characters (fits perfectly under the 40-character limit)
    };
    const razorpayOrder = await razorpayInstance.orders.create(options);

    // 2. Insert a 'pending' record into your postgres PAYMENTS table
    const insertPaymentQuery = `
      INSERT INTO payments (order_id, amount, status, razorpayOrderId)
      VALUES ($1, $2, 'pending', $3);
    `;
    await pgPool.query(insertPaymentQuery, [orderId, amount, razorpayOrder.id]);

    // 3. Return the razorpay order details back to the frontend checkout modal
    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.KEY_ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
}

export async function verifyPayment(req, res) {
  const client = await pgPool.connect();

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify the signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      // Payment failed verification
      await pgPool.query("UPDATE payments SET status = 'failed' WHERE razorpayOrderId = $1;", [razorpay_order_id]);
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // ─── START POSTGRES TRANSACTION ──────────────────────────────────
    await client.query('BEGIN');

    // 1. Update PAYMENTS table record to 'completed'
    const updatePaymentQuery = `
      UPDATE payments 
      SET razorpayPaymentId = $1, razorpaySignature = $2, status = 'completed'
      WHERE razorpayOrderId = $3;
    `;
    await client.query(updatePaymentQuery, [razorpay_payment_id, razorpay_signature, razorpay_order_id]);

    // 2. Update ORDERS table status to 'confirmed'
    const updateOrderQuery = `
      UPDATE orders 
      SET status = 'confirmed' 
      WHERE id = $1 
      RETURNING id;
    `;
    const orderResult = await client.query(updateOrderQuery, [orderId]);

    if (orderResult.rows.length === 0) {
      await client.query('ROLLBACK');
      console.log("Order not found for orderId:", orderId);
      return res.status(404).json({ message: 'Order records missing' });
    }

    // 3. Fetch items from ORDER_ITEMS table so the inventory listener knows what to deduct
    const itemsQuery = 'SELECT product_id as "productId", quantity FROM order_items WHERE order_id = $1;';
    const itemsResult = await client.query(itemsQuery, [orderId]);
    const normalizedItems = itemsResult.rows;

    // 4. TRIGGER THE CUSTOM ASYNC EVENT MANUALLY
    // We pass the transaction client so it runs atomically!
    await orderEvents.emitAsync('order.inventory.update', {
      client,
      items: normalizedItems,
    });

    // If everything passes, finalize the transaction!
    await client.query('COMMIT');
    // ─────────────────────────────────────────────────────────────────

    return res.status(200).json({
      success: true,
      message: 'Payment verified and inventory secured.',
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Internal transaction verification error' });
  } finally {
    client.release();
  }
}