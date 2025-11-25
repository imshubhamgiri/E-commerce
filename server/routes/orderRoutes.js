import express from 'express';
import * as orderController from '../controllers/orderController.js';
import authMiddleware from '../middlewares/auth.js';

const orderRouter = express.Router();
// Define order-related routes here
orderRouter.post('/', authMiddleware, orderController.createOrder);
orderRouter.get('/:userId', orderController.getUserOrders);
export default orderRouter;