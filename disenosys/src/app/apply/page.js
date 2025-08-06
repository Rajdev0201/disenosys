import Form from "./Form";



export function generateMetadata () {
    return {
        title:"Application Form",
        description: 'Disenosys is the preferred training and hiring partner for leading automotive OEMs and design studios. We equip mechanical engineers with real-world skills in BIW, Trims, Seating and more through industry-aligned programs that produce job-ready talent.'
      }
}



export default function LeadsPage(){
    return(
        <div>
            <Form/>
        </div>
    )
}