import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Navbar/Footer";
import { Providers } from "./Redux/Provide";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingWrapper from "./component/LoadingWrapper";
import Script from 'next/script';
import Blink from "./component/Blink/BlinkingPopup";
import Session from "./Session.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disenosys",
  description:"We provide various Post Graduate courses on Automotive Body Design in a range of domains such as BIW, Plastic Trims, Seating and many more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Session>
        <Providers>
          <LoadingWrapper>
            <Blink/>
            <Navbar />
        
            {children}
           
            <Footer />
            <ToastContainer />
          </LoadingWrapper>
        </Providers>
        </Session>
      </body>
    </html>
  );
}
