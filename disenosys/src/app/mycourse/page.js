import Navbar from "../dashboard/Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import Course from "./Course";

export default function DashboardPage() {
    return (
     
      <div className="bg-blue-50 min-h-screen flex flex-col">
     <Navbar />
  <div className="flex flex-grow mt-16">
    <div className="w-1/6 h-full bg-white shadow-lg">
      <Sidebar />
    </div>
    <div className="flex-1 p-4">
      <Course />
    </div>
  </div>
</div>

       
      
    );
}
