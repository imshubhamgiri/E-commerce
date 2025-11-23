import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import paymentRouter from './routes/Payment.js' // ✅ Import the payment router

// Load environment variables
dotenv.config();


const app = express();

// export const razorpay = new Razorpay({
//   key_id: process.env.KEY_ID,
//   key_secret: process.env.KEY_SECRET,
// });

// Middleware
// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }));
// Connect to Database
connectDB();
// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payments', paymentRouter); // ✅ Add this

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Root route accessed');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});