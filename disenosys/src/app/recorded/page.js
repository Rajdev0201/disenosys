
import Navbar from "../dashboard/Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import Course from "./Recorded.jsx";
import Footer from "../component/Navbar/Footer";

export default function RecordPage() {
return(
    <div>
        <div className="h-screen">
          <div className="h-full bg-white">
            <Course/>
            <Footer/>
          </div>
        </div>
      </div>
)
}