// "use client"
import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./home/Home'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})
const Box = dynamic(() => import('./home/Box'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const Testimonials = dynamic(() => import("./home/Testimonials"),{
  ssr:false,
  loading: () => <p>Loading...</p>,
})

const  WhyChoose = dynamic(() => import("./home/WhyChoose"),{
  ssr:false,
  loading: () => <p>Loading...</p>,
})

const Partner = dynamic(() => import("./home/Partner"),{
  ssr:false,
  loading: () => <p>Loading...</p>,
})

const Course = dynamic(() => import("./home/Course"),{
  ssr:false,
  loading: () => <p>Loading...</p>,
})

const Count = dynamic(() => import("./home/Count"),{
  ssr:false,
  loading: () => <p>Loading...</p>,
})

import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Navbar/Footer";
import Blink from "./component/Blink/BlinkingPopup";

const Marquee = dynamic(() => import("./home/Marquee"),{
  ssr:false,
  loading: () => <p>Loading...</p>,
})

const Placement = dynamic(() => import("./home/Placement"),{
  ssr:false,
  loading: () => <p>Loading...</p>,
})

const Education  = dynamic(() => import("./home/Education"),{
  ssr:false,
  loading: () => <p>Loading...</p>,
})

import Who from './home/Who'
import Announce from './home/Announce';
import Check from "./home/CheckCertificate";




export const metadata = () => { 
  return{
    title:"Home"
  }
}

export default function Page() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllCarts());
  // }, [dispatch]);

  // const [hasReachedTestimonials, setHasReachedTestimonials] = useState(false); 
  // const [isTestimonialsInView, setTestimonialsInView] = useState(false);
  // const [showAlert, setShowAlert] = useState(false); 
  // const user = useSelector((state) => state.user);
  // const name = user?.user?.user?.userName ||  user?.user?.name || user?.user?.userName ;


 
  // useEffect(() => {
  //   if (isTestimonialsInView && !name) {
  //     setHasReachedTestimonials(true);
  //   }
  // }, [isTestimonialsInView, name]);
  // useEffect(() => {
  //   if (hasReachedTestimonials && !name) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [hasReachedTestimonials, name]);

  return (
    // <div className={hasReachedTestimonials && !name ? "" : ""}>
    //   {showAlert && (
    //     <div className="fixed inset-0 bg-[#182073] bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
    //       <LoginAlert />
    //     </div>
    //   )}
      <div>
      <Blink/>
      <Navbar />
       <Announce/>
      <Home />
      <Education/>
      <Who/>
      <div className='bg-[#0d1039] h-10 w-full'>
      </div>
      <Box />
      <Count />
      <Marquee/>
      {/* <Testimonials setTestimonialsInView={setTestimonialsInView} /> */}
      <Testimonials/>
      <WhyChoose />
      <Placement/>
      <Course name="Other Online Courses"/>
      <Check/>
      <Partner />
      <Footer />
    </div>
  );
}
