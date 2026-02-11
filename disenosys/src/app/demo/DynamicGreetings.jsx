import React from 'react'

const DynamicGreetings = () => {

  const data = [
    {
        name:"riya",
        age:"24",
        city:"chennai",
        skils:["mern"],
        bio:{
            caption:"im good at mern"
        }
    },
     {
        name:"ramya",
        age:"22",
        city:"chennai",
        skils:["mern"],
        bio:{
            caption:"im good at mern"
        }
    },
     {
        name:"vino",
        age:"21",
        city:"chennai",
        skils:["mern"],
        bio:{
            caption:"im good at mern"
        }
    },
    ]
  return (
    <div >
     {
      data.map((std,id) => (
        <div className='' key={id}>
           {std.skils.map((s) => (
             <li>
              {s}
             </li>
           ))}
        </div>
      ))
     }
    </div>
  )
}

export default DynamicGreetings