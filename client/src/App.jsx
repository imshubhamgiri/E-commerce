import { Button } from "@/components/ui/button"
import Home from "./pages/Home.jsx"
import Loginpage from "./pages/Loginpage.jsx"
import {Navigate, useLocation , Route, Routes } from "react-router-dom"
import Promotion from './components/Promotion'
import Navbar2 from './components/Navbar2'
import Footer from './components/layout/Footer'
import Product from './pages/Product'
import Productdetails from './pages/Productdetails'
import Cart from './pages/Cart'
import Notfound from './pages/Notfound'
import About from "./pages/About.jsx"
import { CartStateProvider } from "./Context/CartContext.jsx";
import Checkout from "./pages/Checkout.jsx";
import Registration from './components/Registration.jsx'
import UserProfile from "./pages/UserProfile.jsx";
import Success from "./pages/Success.jsx"
import Order from "./components/Order.jsx"
import ScrollToTop from "./components/Scrolltop.jsx"

function RequireAuth({ children }) {
  const IsLoggedIn = Boolean(localStorage.getItem("token"));
  const location = useLocation();
  return IsLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function App() {
  return (
    <CartStateProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Promotion />
        <Navbar2 />

        <main className="flex-1">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Loginpage/>}/>
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product/>}/>
            <Route path="/product/:id" element={<Productdetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Notfound />} />
            <Route path="cart/checkout" element={<Checkout />} />
            <Route path="user/profile" element={
              <RequireAuth>
              <UserProfile />
              </RequireAuth>} />
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/orders" element={<Order />} />
          </Routes>
        </main>

        <Footer/>
      </div>
    </CartStateProvider>
  )
}

export default App