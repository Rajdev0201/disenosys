import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";
import Blink from "../component/Blink/BlinkingPopup"
// import Bootcamp from "./Bootcamp";
import Update from "./Update";


export default function BootcampPage () {
    return(
        <div>
            <Blink/>
            <Navbar/>
            {/* <Bootcamp/> */}
            <Update/>
            <Footer/>
        </div>
    )
}