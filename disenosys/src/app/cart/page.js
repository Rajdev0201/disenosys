
import BlinkingAlert from "../component/Blink/BlinkingPopup"
import Footer from "../component/Navbar/Footer"
import Navbar from "../component/Navbar/Navbar"

import Partner from "../home/Partner"
import Cart from "./Checkout"



export default function CartPage() {
 return(
    <div>
        <BlinkingAlert/>
        <Navbar/>
        <Cart />
        <Partner/>
        <Footer/>
    </div>
 )
}