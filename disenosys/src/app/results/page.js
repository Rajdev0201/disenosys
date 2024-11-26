import Head from 'next/head';
import Results from './Results';

const getImageUrl = (score) => {
    return `https://www.disenosys.com/assets/profile/score-image-${score}.png`; // Dynamic URL based on score
};

export default function Page() {
    const score = 75; // Replace with the actual score you want to display
    const imageUrl = getImageUrl(score);

    return (
        <>
            <Head>
                {/* Open Graph metadata */}
                <meta property="og:title" content="Your English Proficiency Score" />
                <meta property="og:description" content="Take the challenge and improve your skills! Visit now to explore your results." />
                <meta property="og:image" content={imageUrl} /> {/* Dynamic image URL */}
                <meta property="og:url" content="https://www.disenosys.com/quicktest" />

                {/* Twitter Card metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Your English Proficiency Score" />
                <meta name="twitter:description" content="Take the challenge and improve your skills! Visit now to explore your results." />
                <meta name="twitter:image" content={imageUrl} />

                {/* Title */}
                <title>Your English Proficiency Score</title>
            </Head>

            <div>
                <Results />
            </div>
        </>
    );
}
