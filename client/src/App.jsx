import { Button } from "@/components/ui/button"
import Home from "./pages/Home.jsx"
import Loginpage from "./pages/Loginpage.jsx"
import { Route, Routes } from "react-router-dom"
import Promotion from './components/Promotion'
import Navbar2 from './components/Navbar2'
import Footer from './components/layout/Footer'
import Product from './pages/Product' // if present
import Productdetails from './pages/Productdetails' // if present
import Cart from './pages/Cart' // if present
import Notfound from './pages/Notfound' // if present
import About from "./pages/About.jsx"

function App() {
  return (
    // full viewport, column layout
    <div className="min-h-screen flex flex-col">
      <Promotion />
      <Navbar2 />

      {/* main grows to fill remaining space so footer is pushed to bottom when content is short */}
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product/>}/>
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>

      <Footer/>
    </div>
  )
}

export default App