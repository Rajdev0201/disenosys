import Results from "./Results";

const getImageUrl = (score) => {
  return `https://www.disenosys.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fl.8f3043b1.jpg&w=3840&q=75`;
};

export async function generateMetadata({ params, searchParams }) {
  const catia = parseFloat(searchParams.catia) || 0;
  const product = parseFloat(searchParams.product) || 0;
  const yourScore = (catia + product) / 2;

  const metaDescription = `Your English proficiency score is ${yourScore}%. Take the challenge and improve your skills!`;

  return {
    title: `Your English Proficiency Score: ${yourScore}% ,Take the challenge and improve your skills!`,
    description: metaDescription,
    image: getImageUrl(yourScore),
  };
}

export default function Page() {
  return (
    <div>
      <Results />
    </div>
  );
}
