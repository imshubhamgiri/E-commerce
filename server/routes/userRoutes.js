import express from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

// Public routes (no auth required)
userRouter.post('/register', userController.RegisterPg);
userRouter.post('/login', userController.pgLogin);

export default userRouter;
