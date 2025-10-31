import { Button } from "@/components/ui/button"
import Home from "./pages/Home.jsx"
import Loginpage from "./pages/Loginpage.jsx"
import { Route, Routes } from "react-router-dom"
import Navbar2 from "./components/Navbar2.jsx"
import Promotion from "./components/Promotion.jsx"

function App() {
  return (
    <>
     <Promotion/>
      <Navbar2/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Loginpage/>}/>
    </Routes>
    </>

  )
}

export default App