import express from 'express';
import * as paymentController from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-razorpay-order', paymentController.createRazorpayOrder);
paymentRouter.post('/verify-payment', paymentController.verifyPayment);

export default paymentRouter;