
import BlinkingAlert from "../component/Blink/BlinkingPopup"
import Footer from "../component/Navbar/Footer"
import Navbar from "../component/Navbar/Navbar"
import Partner from "../home/Partner"
import Tab from "./Table"
import Contact from "./Contact"


export default function CartPage() {
 return(
    <div>
        <BlinkingAlert/>
        <Navbar/>
        <Tab />
        <Contact/>
        <Partner/>
        <Footer/>
    </div>
 )
}