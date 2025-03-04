import BlinkingAlert from "../component/Blink/BlinkingPopup.jsx"
import Footer from "../component/Navbar/Footer.jsx"
import Navbar from "../component/Navbar/Navbar.jsx"
import Partner from "../home/Partner.jsx"
import ScholarShip from "./Scholarship.jsx"


export default function ScholarShipPage () {
    return(
        <div>
            <BlinkingAlert/>
            <Navbar/>
            <ScholarShip/>
            <Partner/>
            <Footer/>
        </div>
    )
}