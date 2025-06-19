import Navbar from "../component/Navbar/Navbar";
import Footer from "../component/Navbar/Footer";
import Blink from "../component/Blink/BlinkingPopup";
import BlogPageClient from "./BlogPageClient";

export const metadata = {
  title: "Blog",
  description: "Latest blogs from Celebria",
};

async function getBlogs() {
  const res = await fetch("https://disenosys-dkhj.onrender.com/api/blog/data", {
    next: { revalidate: 60 }, // for ISR
  });
  const data = await res.json();
  return data;
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
