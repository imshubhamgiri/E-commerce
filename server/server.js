import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import paymentRouter from './routes/Payment.js'

dotenv.config();

const app = express();

// export const razorpay = new Razorpay({
//   key_id: process.env.KEY_ID,
//   key_secret: process.env.KEY_SECRET,
// });

// ============ CORS Configuration ============
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'e-commerce-three-beta-70.vercel.app' // 
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// ============ End CORS Configuration ============

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payments', paymentRouter);

app.get('/', (req, res) => {
  res.send('E-commerce API is running!');
  console.log('Root route accessed');
});

// Use PORT from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});