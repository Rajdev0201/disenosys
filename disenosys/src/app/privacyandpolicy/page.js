import BlinkingAlert from "../component/Blink/BlinkingPopup";
import Footer from "../component/Navbar/Footer";
import Navbar from "../component/Navbar/Navbar";
import Terms from "./Terms";

export default function TermsPage() {
  return(
    <div>
       <BlinkingAlert/>
       <Navbar/>
        <Terms/>
        <Footer/>
    </div>
  )
}