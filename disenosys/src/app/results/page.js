import Results from "./Results";

// const metaTitle = `Your English Proficiency Score: ${yourScore}%`;
const metaDescription = `Take the challenge and improve your skills! Visit now to explore your results.`;
// const metaImage = `https://www.disenosys.com/assests/brand-1-${Math.round(yourScore)}.png`;
// const metaUrl = `https://www.disenosys.com/quicktest`;


const getImageUrl = (score) => {
    return `https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fl.8f3043b1.jpg&w=3840&q=75`;
  };
  
  export const metadata = {
    title: "Take the challenge and improve your skills! Visit now to explore your results.",
    description: metaDescription,
    image: getImageUrl(75), 
  };

export default function Page() {
   return(
    <div>
        <Results/>
    </div>
   )
}