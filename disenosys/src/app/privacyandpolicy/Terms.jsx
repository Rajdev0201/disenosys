"use client";
import React from "react";
import "../home/Home.css";
import { MdPolicy } from "react-icons/md";
import Link from "next/link";

const Terms = () => {
  return (
    <div>
      <div className="bg-tr lg:py-64 py-10 lg:mt-24 mt-20">
        <h1 className="font-bold lg:font-medium text-lg lg:text-6xl font-garet text-[#0d1039] px-4 lg:px-24">
          Privacy & Policy
        </h1>
        <p className="lg:text-2xl font-garet text-white font-medium lg:px-48 mt-3 px-4">
          We value your privacy
        </p>
      </div>
      <div className="grid lg:grid-cols-12  mt-24">
        <div className="col-span-12 lg:col-span-3 px-16 lg:px-12">
          <div className="flex flex-col justify-center space-y-3">
            <h4 className="text-[#0d1039] font-semibold text-xl lg:text-2xl font-garet px-6 lg:px-4 mb-4">
              Legal Information
            </h4>
            <Link
              href="/termsandcondition"
              className="border bg-gray-400 shadow-inner rounded-3xl gap-2 flex items-start justify-center w-64 text-center text-xl p-2 text-white font-garet mt-6"
            >
              <span className="text-center"> Terms & Conditions </span>
            </Link>
            <Link
              href="/privacyandpolicy"
              className="border bg-gray-400 shadow-inner rounded-3xl gap-2 flex items-start justify-center w-64 text-center text-xl py-2 text-white font-garet"
            >
              <span className="text-center"> Privacy & Policy </span>
            </Link>
            <Link
              href="/faq"
              className="border bg-gray-400 shadow-inner rounded-3xl flex items-center justify-center w-64 text-center text-xl p-2 text-white font-garet"
            >
              FAQ
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-9 mb-8 ">
          <div className="flex flex-col justify-center items-start lg:justify-start space-y-4 px-1 mt-12 lg:mt-0 leading-7 lg:px-12">
            <div className="font-garet text-lg font-medium text-black">
              <p>Effective Date: [Insert Date]</p>
              <p>Last Updated: [Insert Date]</p>
              <p>
                Welcome to Disenosys ("we," "our," or "us"). Your privacy is
                important to us, and we are committed to safeguarding your
                personal information. This Privacy Policy explains how we
                collect, use, and protect your data when you visit
                [www.disenosys.com] or use our services.
              </p>
            </div>
         
          
            <div className="font-garet text-lg font-medium text-black">
              <p className="text-xl font-semibold">1.Information We Collect</p>
              <p>We may collect the following types of information:</p>
              <li>
                Personal Information: Name, email address, phone number, company
                details, and job title.
              </li>
              <li>
                Technical Information: IP address, browser type, device details,
                and website usage data.
              </li>
              <li>
                Cookies and Tracking Technologies: We use cookies and similar
                technologies to improve user experience and analyze website
                traffic.
              </li>
            </div>

            <div className="font-garet text-lg font-medium text-black">
              <p className="text-xl font-semibold">2.How We Use Your Information</p>
              <p>We use your information to: </p>
              <li>
              Provide and improve our services.
              </li>
              <li>
              Process inquiries, job applications, and business collaborations.
              </li>
              <li>
              Send updates, newsletters, and promotional content (only if you opt-in).
              </li>
              <li>
              Ensure website security and prevent fraudulent activities.
              </li>
            </div>

            <div className="font-garet text-lg font-medium text-black">
              <p className="text-xl font-semibold">3. Sharing Your Information</p>
              <p>We do not sell your personal information. However, we may share it with:</p>
              <li>
              Service Providers: Hosting providers, analytics partners, and business tools.
              </li>
              <li>
              Legal Authorities: If required to comply with legal obligations or protect our rights.
              </li>
            </div>

            <div className="font-garet text-lg font-medium text-black">
              <p className="text-xl font-semibold">4.Data Security</p>
              <p>We implement strict security measures to protect your data, but no system is entirely secure. We encourage users to take precautions when sharing personal information online.</p>
            </div>

            <div className="font-garet text-lg font-medium text-black">
              <p className="text-xl font-semibold">5.Your Rights and Choices</p>
              <p>You have the right to:</p>
              <li>
              Access, correct, or delete your personal data.
              </li>
              <li>
              Opt out of marketing emails.
              </li>
              <li>
              Manage cookies through browser settings.
              </li>
            </div>
            
            <div className="font-garet text-lg font-medium text-black">
              <p className="text-xl font-semibold">6. Third-Party Links</p>
              <p>Our website may contain links to third-party platforms. We are not responsible for their privacy policies or practices.</p>
            </div>

            <div className="font-garet text-lg font-medium text-black">
              <p className="text-xl font-semibold">7. Updates to This Policy</p>
              <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with a revised "Last Updated" date.
              </p>
            </div>

            <div className="font-garet text-lg font-medium text-black">
              <p className="text-xl font-semibold">8. Contact Us</p>
              <p>
               If you have any questions regarding this Privacy Policy, please contact us:
              </p>
              <p>
              📧 Email: [your email] 
              </p>
              <p>
              🌐 Website: [www.disenosys.com]
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

