import BlinkingAlert from "../component/Blink/BlinkingPopup";
import Footer from "../component/Navbar/Footer";
import Navbar from "../component/Navbar/Navbar";
import FAQ from "./FAQ";

export default function TermsPage() {
  return(
    <div>
       <BlinkingAlert/>
       <Navbar/>
        <FAQ/>
        <Footer/>
    </div>
  )
}