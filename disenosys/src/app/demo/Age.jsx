"use client"
import React, { useState } from 'react'

const Age = () => {
    const[date,setDate] = useState("");
    const [age,setAge] = useState("");  
    console.log(date)

    const handleSumit = () => {
         const today = new Date();
         const birth = new Date(date);
           if(birth > today){
            alert("error")
         }
         const year = today.getFullYear() - birth.getFullYear(); //2025 - 2001
         const month = today.getMonth() - birth.getMonth(); //july - jan
         const day = today.getDate() - birth.getDate(); //04 - 02
         setAge({year,month,day})
         console.log({year,month,day}) 
    }

  return (
    <div>
        <input type='date' name='age' value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={handleSumit}>Check</button>

        <p className='text-red-500 '>years - {age.year} - months -{age.month} - day {age.day} </p>
    </div>
  )
}

export default Age