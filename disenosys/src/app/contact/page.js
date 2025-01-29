import BlinkingAlert from "../component/Blink/BlinkingPopup";
import Footer from "../component/Navbar/Footer";
import Navbar from "../component/Navbar/Navbar";
import Announce from "../home/Announce";
import { Contact } from "./Contact";

export default function home () {
    return(
        <>
        <BlinkingAlert/>
        <Navbar />
        {/* <Announce/> */}
        <Contact/>
        <Footer/>
        </>
       
    )
}