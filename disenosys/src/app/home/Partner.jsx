import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';
import p1 from "../assests/Fiat.jpg";
import p2 from "../assests/ford.jpg";
import p3 from "../assests/bmw.jpg";
import p4 from "../assests/Hyu.jpg";
// import p5 from "../assests/Mahindra.jpg";
import p6 from "../assests/Ni.png";
import p7 from "../assests/Renault.jpg";
import p8 from "../assests/Tata.jpg";
import p9 from "../assests/psa.jpg";

const Partner = () => {
  return (
    <div className='mt-6 py-6'>
      <div className='flex justify-center items-center mb-7 p-5'>
        <h1 className='font-bold font-poppins text-[#182073] text-xl lg:text-5xl'>
          Hiring <span className='text-[#182073]'>C</span>ompanies
        </h1>
      </div>
      <div className='shadow-md mb-4 bg-white rounded'>
        <div className='py-6'>
          <Marquee
            speed={80}
            pauseOnHover={true}
            gradientColor='blue'
            className='flex items-center'
          >
            <div className="px-4">
              <Image src={p1} alt='Partner 1' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p2} alt='Partner 2' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p3} alt='Partner 3' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p4} alt='Partner 4' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p2} alt='Partner 5' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p6} alt='Partner 6' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p7} alt='Partner 7' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-xl bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p8} alt='Partner 8' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p9} alt='Partner 9' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
            <div className="px-4">
              <Image src={p6} alt='Partner 10' className='w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full bg-white'/>
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}

export default Partner;
