import Navbar from "./Navbar";
import Sidebar from "../component/sidebar/SidebarAdmin";
import Home from "./Home"
export default function adminRoutePage() {
return(
    <div className="h-screen">
        <Navbar />
        <div className="grid grid-cols-12 h-full mt-16">
          <div className="col-span-2 bg-[#182073] h-full">
            <Sidebar />
          </div>
          <div className="col-span-10 h-full bg-blue-50">
            <Home />
          </div>
        </div>
    </div>
)
}