import Navbar from "../dashboard/Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import Setting from "./Setting"

export default function AchievementPage() {
    return (
     
      <div className="bg-blue-50 min-h-screen flex flex-col">
     <Navbar />
  <div className="flex flex-grow mt-16">
    <div className="w-1/6 h-full bg-white shadow-lg">
      <Sidebar />
    </div>
    <div className="flex-1">
      <Setting />
    </div>
  </div>
</div>      
    );
}
