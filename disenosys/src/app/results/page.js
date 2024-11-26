import Results from "./Results";

// const metaTitle = `Your English Proficiency Score: ${yourScore}%`;
const metaDescription = `Take the challenge and improve your skills! Visit now to explore your results.`;
// const metaImage = `https://www.disenosys.com/assests/brand-1-${Math.round(yourScore)}.png`;
// const metaUrl = `https://www.disenosys.com/quicktest`;


const getImageUrl = (score) => {
    return `https://www.disenosys.com/assets/profile/l.jpg`;
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