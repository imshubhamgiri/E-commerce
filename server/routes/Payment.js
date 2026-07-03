import express from 'express';
import * as paymentController from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-razorpay-order', paymentController.createPgRazorpayOrder);
paymentRouter.post('/verify-payment', paymentController.verifyPayment);

export default paymentRouter;