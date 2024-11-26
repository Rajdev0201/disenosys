import BlinkingAlert from "../component/Blink/BlinkingPopup";
import Footer from "../component/Navbar/Footer";
import Navbar from "../component/Navbar/Navbar";
import Main from "./Main"


export default function QuickTestPage() {

    return(
        <div>
            <BlinkingAlert/>
            <Navbar/>
            <Main/>
            <Footer/>
        </div>
    )

}