
import Blink from "../component/Blink/BlinkingPopup"
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";
import Online from "./Online";
export default function description () {
    return(
        <>
        <Blink/>
        <Navbar />
        <Online/>
        <Footer/>
        </>
    )
}