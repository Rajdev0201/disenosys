// app/dashboard/page.js
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";
// import Blink from "../component/Blink/BlinkingPopup"
import Description from "../portfolio/Description";
export default function profileDescriptionPage() {
    return (
        <div>
            {/* <Blink/>
            <Navbar/> */}
             <Description/>
            <Footer/>
        </div>
      
    );
}
