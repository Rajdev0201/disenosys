import Results from "./Results";

// const metaTitle = `Your English Proficiency Score: ${yourScore}%`;
const metaDescription = `Take the challenge and improve your skills! Visit now to explore your results.`;
// const metaImage = `https://www.disenosys.com/assests/brand-1-${Math.round(yourScore)}.png`;
// const metaUrl = `https://www.disenosys.com/quicktest`;

export const metadata = {
    title:"Results-page",
    description:metaDescription
} 

export default function Page() {
   return(
    <div>
        <Results/>
    </div>
   )
}