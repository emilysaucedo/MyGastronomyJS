import Navbar from "./components/navbar/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/footer/footer"

export default function App() {
    return (
      <>
        <Navbar></Navbar>
        <main>
        <Outlet></Outlet>
        </main>
        <Footer/>

      </>
    )
}


