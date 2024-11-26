import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Redux/Provide";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingWrapper from "./component/LoadingWrapper";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Disenosys",
    template: "%s | Disenosys",
  },
  description: "We provide various Post Graduate courses on Automotive Body Design in a range of domains such as BIW, Plastic Trims, Seating, and many more.",
  openGraph: {
    title: "Disenosys | Automotive Body Design Courses",
    description: "Explore our courses on BIW, Plastic Trims, Seating, and more.",
    images: "https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbrand-1.7ee6f1cc.png&w=3840&q=75",
    url: "https://www.disenosys.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@disenosys",
    title: "Disenosys | Automotive Body Design",
    description: "Explore our post-graduate courses on automotive body design.",
    images: "https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbrand-1.7ee6f1cc.png&w=3840&q=75",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="We provide various Post Graduate courses on Automotive Body Design." />
        <meta property="og:title" content="Disenosys | Automotive Body Design Courses" />
        <meta property="og:description" content="Explore our courses on BIW, Plastic Trims, Seating, and more." />
        <meta property="og:image" content="https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbrand-1.7ee6f1cc.png&w=3840&q=75" />
        <meta property="og:url" content="https://www.disenosys.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@disenosys" />
        <meta name="twitter:title" content="Disenosys | Automotive Body Design" />
        <meta name="twitter:description" content="Explore our post-graduate courses on automotive body design." />
        <meta name="twitter:image" content="https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbrand-1.7ee6f1cc.png&w=3840&q=75" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          <LoadingWrapper>
            {children}
            <Analytics />
            <ToastContainer />
          </LoadingWrapper>
        </Providers>
      </body>
    </html>
  );
}
