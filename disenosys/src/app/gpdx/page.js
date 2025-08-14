import BlinkingAlert from "../component/Blink/BlinkingPopup";
import Footer from "../component/Navbar/Footer";
import Navbar from "../component/Navbar/Navbar";
import LandingPage from "./LandingPage";



 
export default function GPdxPage(){
    return(
        <div>
            <BlinkingAlert/>
            <Navbar/>
            <LandingPage/>
            <Footer/>
        </div>
    )
}