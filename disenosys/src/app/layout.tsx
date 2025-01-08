import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "./component/Navbar/Navbar";
// import Footer from "./component/Navbar/Footer";
import { Providers } from "./Redux/Provide";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingWrapper from "./component/LoadingWrapper";
// import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";
// import { usePathname } from "next/navigation";
// import DynamicMetadata from "./DynamicMetadata";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
  absolute:"",
  default:"Disenosys",
  template:"%s | Disenosys"
  },
  description:"We provide various Post Graduate courses on Automotive Body Design in a range of domains such as BIW, Plastic Trims, Seating and many more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})


{
  return (
    <html lang="en">
      <Head>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Josefin+Sans:wght@400;600&family=Nunito:wght@400;700&display=swap" rel="stylesheet" />

      </Head>
      <body className={inter.className}>
      {/* <DynamicMetadata />  */}
        <Providers>
          <LoadingWrapper>
            {children}
            <Analytics/>
            <ToastContainer />
          </LoadingWrapper>
        </Providers>
      
      </body>
    </html>
  );
}
