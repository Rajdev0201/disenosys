// app/dashboard/page.js
import Navbar from "./Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import Home from "../component/dashboardPages/Home";

export default function DashboardPage() {
    return (
        <div className="h-screen">
        <Navbar />
        <div className="grid grid-cols-12 h-full mt-16">
          {/* Sidebar with full height */}
          <div className="col-span-2 bg-[#182073] h-full">
            <Sidebar />
          </div>
      
          {/* Main content area with full height */}
          <div className="col-span-10 h-full bg-blue-50">
            <Home />
          </div>
        </div>
      </div>
      
    );
}
