import React from 'react';
const JobDetailCard = ({
  title,
  type,
  companyName,
  logo,
  description,

}) => {
    return (
      <div className="bg-white p-6 shadow rounded-md">
        <div className="flex items-center gap-4 mb-4">
        {/* <FcGoogle size={50} className="cursor-pointer text-gray-400 hover:text-gray-700"/> */}
        <img src={logo} alt='logo' className='w-12 h-12 object-hover'/>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">at {companyName}</p>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full mr-2">{type}</span>
            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">Featured</span>
          </div>
        </div>
  
        {/* <div>
  
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            We&apos;re a Shopify Plus agency, and we partner with brands to help them grow...
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">Velstar is a Shopify Plus agency, and we partner with brands to help them grow, we also do the same with our people!
          Here at Velstar, we don&apos;t just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and creators work together to push brands to the next level. From Platform Migration, User Experience & User Interface Design, to Digital Marketing, we have a proven track record in delivering outstanding eCommerce solutions and driving sales for our clients.
          </p>
  
          <h4 className="text-md font-medium mb-2">Requirements</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
            <li>Great troubleshooting and analytical skills</li>
            <li>Experience with React, REST APIs, etc.</li>
          </ul>
  
          <h4 className="text-md font-medium mb-2">Benefits</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Work from home Fridays</li>
            <li>Annual leave, birthday leave</li>
          </ul>
        </div> */}
                <h4 className="text-md font-semibold mb-2">Job Description</h4>
        <p
  className="mt-4 text-gray-800 font-medium text-sm sm:text-base md:text-md"
  dangerouslySetInnerHTML={{
    __html: description
      ? description
          .replace(/\n+/g, "<br/>") // Line breaks
          .replace(/<ul>/g, '<ul class="list-disc text-gray-800 pl-5 text-sm">') // Bullet lists
          .replace(/<ol>/g, '<ol class="list-decimal text-gray-800 pl-5 text-sm">') // Ordered lists
          .replace(/<li>/g, '<li class="mt-1">') // List items
          .replace(/<h1>/g, '<h1 class="text-xl font-bold mt-4 mb-2">') // Heading 1
          .replace(/<h2>/g, '<h2 class="text-md font-semibold mt-4 mb-2">') // Heading 2
          .replace(/<h3>/g, '<h3 class="text-md font-bold mt-3 mb-2">') // Heading 3
          .replace(/<strong>/g, '<strong class="font-bold">') // Bold
          .replace(/<em>/g, '<em class="italic">') // Italic
          .replace(/<u>/g, '<u class="underline">') // Underline
      : "",
  }}
></p>
      </div>
    );
  };
  
  export default JobDetailCard;
  