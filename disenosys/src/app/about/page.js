import Partner from "../home/Partner";
import { About } from "./About";
import Founder from "./Founder";
import Vision from "./Vision";
import { Weare } from "./Weare";
import Blink from "../component/Blink/BlinkingPopup";
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";


export const metadata = () => { 
    return{
      title:"About Us"
    }
  }

export default function about () {
    return(
        <>
        <Blink/>
        <Navbar />
         <About/>
         <Vision/>
         <Weare/>
         <Founder/>
         <Partner/>
         <Footer/>
        </>
       
    )
}