import BlinkingAlert from "../component/Blink/BlinkingPopup";
import Footer from "../component/Navbar/Footer";
import Navbar from "../component/Navbar/Navbar";
import Consultation from "./Consultation";



export default function ConsultationPage() {

    return(
        <div>
            <BlinkingAlert/>
            <Navbar/>
            <Consultation/>
            <Footer/>
        </div>
    )
}