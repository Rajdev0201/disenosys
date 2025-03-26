import BlinkingAlert from "../component/Blink/BlinkingPopup"
import Footer from "../component/Navbar/Footer"
import Navbar from "../component/Navbar/Navbar"
import Partner from "../home/Partner"
import Payment from "./Payment"




export default function PaymentMethodsPage() {
    return(
        <div>
       <BlinkingAlert/>
        <Navbar/>
        <Payment/>
        <Partner/>
        <Footer/>
        </div>
    )
}