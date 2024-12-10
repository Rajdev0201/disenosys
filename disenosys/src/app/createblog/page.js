import Sidebar from "../component/sidebar/Sidebar";
import Navbar from "../dashboard/Navbar";
import CreateBlog from "./CreateBlog";



export default function BlogPage () {
return(
    <div className="h-screen">
        <Navbar />
        <div className="grid grid-cols-12 h-full mt-16">
          <div className="col-span-2 bg-[#182073] h-full">
            <Sidebar />
          </div>
          <div className="col-span-10 h-full bg-blue-50">
           <CreateBlog/>
          </div>
        </div>
      </div>
)
}