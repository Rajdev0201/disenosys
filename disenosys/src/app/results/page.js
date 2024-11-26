import Results from "./Results";

// const metaTitle = `Your English Proficiency Score: ${yourScore}%`;
const metaDescription = `Take the challenge and improve your skills! Visit now to explore your results.`;
// const metaImage = `https://www.disenosys.com/assests/brand-1-${Math.round(yourScore)}.png`;
// const metaUrl = `https://www.disenosys.com/quicktest`;


const getImageUrl = (score) => {
    return `https://www.disenosys.com/assets/profile/brand-${Math.round(score)}.png`;
  };
  
//   export const metadata = {
//     title: "Take the challenge and improve your skills! Visit now to explore your results.",
//     description: metaDescription,
//     image: getImageUrl(75), 
//   };

export default function Page() {
    const catia = 75; // Replace with dynamic value
    const product = 85; // Replace with dynamic value
    const yourScore = (catia + product) / 2; // Calculate the average score
    
    // Set dynamic metadata
    const metadata = {
      title: `Your English Proficiency Score: ${yourScore}%`,
      description: metaDescription,
      image: getImageUrl(yourScore), // Dynamic image URL based on score
    };
   return(
    <div>
        <Results/>
    </div>
   )
}