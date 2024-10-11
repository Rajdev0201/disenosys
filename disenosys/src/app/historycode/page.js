import Navbar from "../adminroute/Navbar";
import Sidebar from "../component/sidebar/SidebarAdmin";
import History from "./History";


export default function historyPage() {
return(
    <div className="h-screen">
        <Navbar />
        <div className="grid grid-cols-12 h-full mt-16">
          <div className="col-span-2 bg-[#182073] h-full">
            <Sidebar />
          </div>
          <div className="col-span-10 h-full bg-blue-50">
            <History />
          </div>
        </div>
    </div>
)
}