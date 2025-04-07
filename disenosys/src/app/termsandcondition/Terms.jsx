"use client"
import React from 'react'
import "../home/Home.css";
import { MdPolicy } from 'react-icons/md';
import Link from 'next/link';
import AllLinks from '../component/LegalInfo/AllLinks';


const Terms = () => {
  return (
    <div>
     <div className='bg-pr lg:py-64 py-10 lg:mt-28 mt-20'>
      <h1 className='font-bold lg:font-medium text-lg lg:text-6xl font-garet text-[#0d1039] px-4 lg:px-12'>
        Terms & Condition
      </h1>
      <p className='lg:text-2xl font-garet text-white font-medium lg:px-48 mt-3 px-4'>We value your privacy</p>
    </div>
    <div className='grid lg:grid-cols-12  mt-24'> 
    <div className='col-span-12 lg:col-span-3 px-16 lg:px-12'>
         <AllLinks/>
    </div>
    <div className="col-span-12 lg:col-span-9 mb-8">
  <div className="flex flex-col justify-center items-start lg:justify-start space-y-4 px-1 mt-12 lg:mt-0 leading-7 lg:px-12">
    
    <div className="font-garet text-lg font-medium text-black">
      {/* <p>Effective Date: [Insert Date]</p>
      <p>Last Updated: [Insert Date]</p> */}
      <p>
        Welcome to Disenosys (&apos;we,&apos; &apos;our,&apos; or &apos;us&apos;). By accessing or using our website 
        [www.disenosys.com] and services, you agree to comply with and be bound by the following 
        Terms and Conditions. Please read them carefully before using our platform.
      </p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">1. Acceptance of Terms</p>
      <p>
        By using our website, you agree to these Terms and Conditions. If you do not agree with any 
        part of these terms, you must discontinue the use of our services immediately.
      </p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">2. Use of Our Services</p>
      <p>When using our website and services, you agree to:</p>
      <li>Use the platform only for lawful purposes.</li>
      <li>Not engage in fraudulent or harmful activities.</li>
      <li>Not distribute spam, malware, or unauthorized advertisements.</li>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">3. Intellectual Property Rights</p>
      <p>All content on this website, including text, graphics, logos, images, and software, is the 
      property of Disenosys and is protected by copyright laws. You may not use, copy, or distribute 
      any content without prior written consent.</p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">4. User Accounts</p>
      <p>If you create an account with us, you are responsible for maintaining the confidentiality of 
      your login credentials. We are not liable for unauthorized access due to the misuse of your 
      credentials.</p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">5. Limitation of Liability</p>
      <p>We strive to provide accurate and up-to-date information, but we do not guarantee the 
      completeness, reliability, or accuracy of our content. We are not liable for any losses or 
      damages resulting from the use of our services.</p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">6. Third-Party Links</p>
      <p>Our website may contain links to third-party websites. We are not responsible for their content, 
      policies, or practices. Users should review third-party terms before engaging with external platforms.</p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">7. Termination of Services</p>
      <p>We reserve the right to suspend or terminate access to our website or services at our discretion, 
      without prior notice, if we detect any violation of these Terms and Conditions.</p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">8. Changes to Terms</p>
      <p>We may update these Terms and Conditions at any time. Changes will be posted on this page with a 
      revised &apos;Last Updated&apos; date. Continued use of our services implies acceptance of the updated terms.</p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">9. Governing Law</p>
      <p>These Terms and Conditions shall be governed and interpreted in accordance with the laws of [Your Country/State].</p>
    </div>

    <div className="font-garet text-lg font-medium text-black">
      <p className="text-xl font-semibold">10. Contact Us</p>
      <p>If you have any questions about these Terms and Conditions, please contact us:</p>
      <p>📧 Email: [info@Disenosys.com]</p>
      <p>🌐 Website: [www.disenosys.com]</p>
    </div>

  </div>
</div>

    </div>
    </div>
  )
}

export default Terms