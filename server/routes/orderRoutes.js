import express from 'express';
import * as orderController from '../controllers/orderController.js';

const orderRouter = express.Router();
// Define order-related routes here
orderRouter.post('/', orderController.createOrder);
orderRouter.get('/:orderId', orderController.getUserOrders);
export default orderRouter;