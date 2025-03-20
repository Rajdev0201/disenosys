// app/dashboard/page.js
import Navbar from "./Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import Home from "../component/dashboardPages/Home";

export default function DashboardPage() {
    return (
       
      <div className="bg-blue-50 lg:min-h-screen flex flex-col">
     <Navbar />
  <div className="flex flex-grow mt-16">
    <div className="w-1/6 h-full bg-white shadow-lg">
      <Sidebar />
    </div>
    <div className="flex-1">
      <Home />
    </div>
  </div>
</div>
      
    );
}
