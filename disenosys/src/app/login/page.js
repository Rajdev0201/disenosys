"use client"
import React from 'react'
import { useRouter } from "next/navigation";

export default function page () {
    const router = useRouter();
    if(router){
        alert("hi successfully sigined")
        router.push("/");
    }
  return (
        <div>
            <h1>hi user</h1>
        </div>
  )
}


