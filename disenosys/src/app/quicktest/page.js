import BlinkingAlert from "../component/Blink/BlinkingPopup";
import Footer from "../component/Navbar/Footer";
import Navbar from "../component/Navbar/Navbar";
import Main from "./Main"

const getImageUrl = (score) => {
    return `https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fl.8f3043b1.jpg&w=3840&q=75`;
  };
  
  export async function generateMetadata({ params, searchParams }) {
    const catia = parseFloat(searchParams.catia);
    const product = parseFloat(searchParams.product);
    const yourScore = (catia + product) / 2;
  
    const metaDescription = `Automotive Product Design quiz!`;
  
    return {
      title: `Take the challenge and improve your skills!`,
      description: metaDescription,
      image: getImageUrl(yourScore),
    };
  }
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