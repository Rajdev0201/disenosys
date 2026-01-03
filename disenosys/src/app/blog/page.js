import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";
import Blink from "../component/Blink/BlinkingPopup";
import BlogPageClient from "./BlogPageClient";

export const metadata = {
  title: "Blog",
  description: "Latest blogs from Celebria",
};

async function getBlogs() {
  const res = await fetch("https://disenosys-backendv2-9yuy.onrender.com/data", {
    next: { revalidate: 60 },
  });
 console.log("Blog API response:", res);
  if (!res.ok) {
    console.error("Blog API failed:", res.status);
    return [];
  }

  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.error("Invalid response type:", contentType);
    return [];
  }

  return res.json();
}


export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-gray-50">
      <Blink />
      <Navbar />
      <BlogPageClient blogs={blogs} />
      <Footer />
    </div>
  );
}
