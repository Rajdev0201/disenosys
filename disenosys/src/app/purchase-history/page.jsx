import BlinkingAlert from "../component/Blink/BlinkingPopup"
import Footer from "../component/Navbar/Footer"
import Navbar from "../component/Navbar/Navbar"
import Partner from "../home/Partner"
import Purchase from "./History"



export default function PurchaseHistoryPage() {
  return(
    <div>
        <BlinkingAlert/>
        <Navbar/>
        <Purchase/>
        <Partner/>
        <Footer/>
    </div>
  )
}