import express from 'express';
import * as orderController from '../controllers/orderController.js';
import authMiddleware from '../middlewares/auth.js';

const orderRouter = express.Router();
// Define order-related routes here
orderRouter.post('/', authMiddleware, orderController.createPgOrder);
orderRouter.get('/:userId', orderController.getPgOrders);
orderRouter.delete('/:orderId', authMiddleware, orderController.deleteOrder);
export default orderRouter;