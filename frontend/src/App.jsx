import Navbar from "./components/navbar/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/footer/footer"
import { CartProvider } from "./context/useCartContext"

export default function App() {
    return (
      <>
      <CartProvider>
      <Navbar></Navbar>
        <main>
        <Outlet></Outlet>
        </main>
        <Footer/>
      </CartProvider>


      </>
    )
}


