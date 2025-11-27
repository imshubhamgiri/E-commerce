# 🛒 E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB. Features include user authentication, product catalog, shopping cart, order management, and payment integration.

## 🌐 Live Demo

**Frontend**: https://e-commerce-three-beta-70.vercel.app
**Backend API**: https://e-commerce-l5st.onrender.com/api

> **Note**: Backend may take 30-60 seconds to wake up on first request (free tier cold start)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## ✨ Features

### Current Features
- 🔐 User authentication (Registration & Login)
- 🛍️ Browse products with categories
- ⚡ Flash sales and best-selling products
- 🛒 Shopping cart management
- 💳 Secure checkout process
- 📦 Order tracking and history
- 👤 User profile management

### Coming Soon 🚀
- 🔍 Product search and filtering
- 📊 Admin dashboard for product management
- 📈 Advanced analytics
- ⭐ Product reviews and ratings

### Technical Features
- 🔒 JWT-based authentication
- 💰 Payment gateway integration (Razorpay)
- 📱 Responsive design
- ⚡ Real-time loading states with skeletons
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Context API

## 🛠️ Tech Stack

### Frontend
- **React** (v18) - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Razorpay** - Payment gateway

## 📁 Project Structure

```
E-commerce/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── api/           # API service files
│   │   ├── components/    # React components
│   │   ├── config/        # Configuration files
│   │   ├── Context/       # Context providers
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend application
│   ├── config/           # Database & service configs
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/imshubhamgiri/E-commerce.git
cd E-commerce
```

### Install Dependencies

#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd server
npm install
```

## 🔐 Environment Variables

### Client (.env)
Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Server (.env)
Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_key_secret
```

## 🏃 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Build

#### Build Frontend
```bash
cd client
npm run build
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api (Development)
https://e-commerce-l5st.onrender.com/api (Production)
```

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get All Products
```http
GET /products
```

#### Get Product by ID
```http
GET /products/:id
```

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "products": [...],
  "totalAmount": 5000,
  "shippingAddress": {...}
}
```

#### Get User Orders
```http
GET /orders/user
Authorization: Bearer <token>
```

### Payment Endpoints

#### Create Payment Order
```http
POST /payments/create-order
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 5000
}
```

#### Verify Payment
```http
POST /payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "razorpay_order_id": "order_id",
  "razorpay_payment_id": "payment_id",
  "razorpay_signature": "signature"
}
```

## 🚀 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Set root directory to `client`
4. Add environment variable:
   - `VITE_API_URL`: `https://e-commerce-l5st.onrender.com/api`
5. Deploy

### Backend (Render)

1. Push your code to GitHub
2. Create new Web Service in Render
3. Set root directory to `server`
4. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `KEY_ID`
   - `KEY_SECRET`
5. Deploy

### Update CORS in Backend
Add your deployed frontend URL to the `allowedOrigins` array in `server.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app'
];
```

## 📝 Key Components

### Frontend

- **CartProvider**: Global cart state management using Context API
- **Navbar**: Responsive navigation with cart badge counter
- **Main**: Homepage with flash sales and best sellers sections
- **Product**: Product listing with category filtering
- **Cart**: Shopping cart with quantity management
- **Checkout**: Multi-step order placement flow
- **Payment**: Razorpay payment integration

### Backend

- **User Controller**: Authentication and user management
- **Product Controller**: Product CRUD operations
- **Order Controller**: Order processing and tracking
- **Payment Controller**: Payment gateway integration
- **Auth Middleware**: JWT verification and route protection

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- CORS configuration for specific origins
- Input validation
- Secure payment processing with Razorpay

## 🐛 Known Issues & Solutions

### CORS Error
If you encounter CORS errors, ensure:
1. Backend `allowedOrigins` includes your frontend URL (no trailing slash)
2. Backend is running and accessible
3. Render service is awake (check logs)

### Build Errors
- Use lowercase file names for imports (case-sensitive in production)
- Ensure all environment variables are set in deployment platforms
- Check that [`api.js`](../../../e:/DevProjects/E-commerce/client/src/config/api.js ) file exists with correct case

### Render Cold Start
- Free tier services sleep after inactivity
- First request may take 30-60 seconds
- Subsequent requests will be faster

## 🎯 Future Enhancements

- [ ] Admin dashboard for product and order management
- [ ] Advanced product search with filters
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Order status tracking
- [ ] Multiple payment options
- [ ] Discount codes and promotions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Your Name**  
Developed with assistance from GitHub Copilot (Claude Sonnet 4.5)

## 📧 Contact

- GitHub: [@imshubhamgiri](https://github.com/imshubhamgiri)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB for flexible database solution
- Vercel & Render for free hosting
- Tailwind CSS for rapid UI development

---

**Note**: This is a learning project. For production use, additional security measures, testing, and optimizations are recommended.