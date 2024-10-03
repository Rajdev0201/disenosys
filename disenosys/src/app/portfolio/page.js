// app/dashboard/page.js
import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";
import Models from "./Models";
import Blink from "../component/Blink/BlinkingPopup"
export default function PortfolioMainPage() {
    return (
        <div>
            <Blink/>
            <Navbar/>
            <Models/>
            <Footer/>
        </div>
      
    );
}
