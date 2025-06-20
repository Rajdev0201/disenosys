"use client"
import React, { useState } from 'react'

const Chips = () => {
    const [skill,setSkill] = useState([]);
    const [input,setInput] = useState("");
    const [count,setCount] = useState(1);

    console.log(skill)
 
    const onKeyPress = (e) => {
         if(e.key === "Enter" && input.trim() !== ""){
             const newSkills = {
                id:count,
                skill:input.trim()
             }
            setSkill([...skill,newSkills]);
            setCount(count + 1);
            setInput("");
         }
    }

    const cancelSkills = (id) => {
     setSkill(skill.filter((d) =>  d.id !== id));
    }
  return (
    <div className='flex justify-center items-center mx-auto min-h-screen'>
     <div>
        <input type='text' name='input' className='bg-blue-500 rounded' value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyPress}/>
        {
            skill.map((data,i) => (
                <div className='flex justify-between' key={i}>
                    <p>{data.id}</p>
                    <p>{data.skill}</p>
                    <p onClick={() => cancelSkills(data.id)}>cancel</p>
                </div>
            ))
        }
     </div>
    </div>
  )
}

export default Chips