
import BlinkingAlert from "../component/Blink/BlinkingPopup"
import Footer from "../component/Navbar/Footer"
import Navbar from "../component/Navbar/Navbar"
import MarqueeView from "../home/Marquee"
import Partner from "../home/Partner"
import Plastic from "./Plastic"



export default function CartPage() {
 return(
    <div>
        <BlinkingAlert/>
        <Navbar/>
        <Plastic/>
        <MarqueeView/>
        <Partner/>
        <Footer/>
    </div>
 )
}