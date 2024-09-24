"use client"
import Home from './home/Home'
import Box from "./home/Box"
import WhyChoose from "./home/WhyChoose"
import Partner from "./home/Partner"
import Course from "./home/Course"
import Count from "./home/Count"
import { useDispatch } from 'react-redux'
import { getAllCarts } from './Redux/action/addToCart.js'
import { useEffect} from 'react'
// import Pricing from "./component/Pricing"
import Testimonials from "./home/Testimonials"
export default function Page() {
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    dispatch(getAllCarts())
  }, [dispatch])


  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen bg-gray-800">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Home />
      <Count />
      <Box />
      <Testimonials/>
      <WhyChoose />
      <Course />
      <Partner />
      {/* <Pricing /> */}
    </div>
  );
}
