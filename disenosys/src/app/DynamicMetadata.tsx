// "use client"; // This is a client component

// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import Head from "next/head"; // Using next/head for dynamic meta tag management

// const DynamicMetadata = () => {
//   const pathname = usePathname();
//   const [metaDescription, setMetaDescription] = useState<string>("");

//   useEffect(() => {
//     if (pathname === "/results") {
//         console.log("Updating meta description to results page...");
//         setMetaDescription("The result page of the Disenosys platform with detailed information.");
//         document.title = "Result Page - Disenosys";
//     } else {
//         console.log("Updating meta description to default...");
//         setMetaDescription("We provide various Post Graduate courses on Automotive Body Design in a range of domains such as BIW, Plastic Trims, Seating and many more.");
//         document.title = "Disenosys";
//     }
// }, [pathname]); 


//   return (
//     <Head>
//       {/* Dynamically update the meta description */}
//       <meta name="description" content={metaDescription || "Default description if not dynamically set."} />
//     </Head>
//   );
// };

// export default DynamicMetadata;
