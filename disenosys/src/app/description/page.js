import {Description} from "./Description";
import Blink from "../component/Blink/BlinkingPopup"
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";
export default function description () {
    return(
        <>
           <Blink/>
           <Navbar />
        <Description/>
        <Footer/>
        </>
    )
}