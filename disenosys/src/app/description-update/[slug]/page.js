import BlinkingAlert from "../../component/Blink/BlinkingPopup";
import Footer from "../../component/Navbar/Footer";
import Navbar from "../../component/Navbar/Navbar";
import Description from "./Description";




export function generateMetadata ({params}) {
    const { slug } = params;
    const decodedSlug = decodeURIComponent(slug);
    return {
        title:decodedSlug,
        description: `Comprehensive course covering essential concepts, practical skills, and industry insights to enhance your expertise. ${decodedSlug}`
      }
}


export default function descriptionPage({params}) {
    const { slug } = params;
    const decodedSlug = decodeURIComponent(slug);
    return(
            <div>
           <BlinkingAlert/>
           <Navbar />
          <Description slug={decodedSlug} />
          <Footer/>
          </div>
    )
}