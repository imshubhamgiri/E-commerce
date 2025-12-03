import crypto from 'crypto';
import { razorpayInstance } from '../config/razorpay.js';
import Order from '../models/Order.js';

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
export async function verifyPayment(req, res) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderId 
    } = req.body;

    // Create signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    // Verify signature
    if (razorpay_signature === expectedSign) {
      // Update order with payment details
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = razorpay_signature;
      order.paymentStatus = 'completed';
      order.status = 'confirmed';
      await order.save();

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        order
      });
    } else {
      // Payment verification failed
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'failed';
        await order.save();
      }

      res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      message: 'Payment verification failed', 
      error: error.message 
    });
  }
}