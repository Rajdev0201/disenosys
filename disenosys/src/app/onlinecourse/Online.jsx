import React from 'react'

const Online = () => {
  return (
<div className='container mx-auto flex justify-center items-center mt-44'>
<div id="login" class="w-96 h-full bg-[#182073] rounded shadow flex flex-col justify-between p-3">  

    <form class="text-sky-500" action="" method="post">
        <label class="text-xs font-bold after:content-['*']" for="email">Name </label>     
        <input class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-sky-500" type="email" placeholder='Enter your Name' required=""/>   
        <label class="text-xs font-bold after:content-['*']" for="password">Email  </label>
        <input class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-sky-500" type="email" placeholder='Enter your Email' required=""/>
        <label class="text-xs font-bold after:content-['*']" for="password">Phone  </label>
        <input class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-sky-500" type="text" placeholder='Enter your Number' required=""/>
        <label class="text-xs font-bold after:content-['*']" for="password">Your Course </label>
        <input class="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-sky-500" type="text" required=""/>
        <div className='flex justify-end items-end'>
        <button class="w-24 rounded bg-sky-500 text-[#182073] p-2 mt-6 text-center font-bold hover:bg-sky-400">Submit</button>
        </div>
    </form>
</div>
</div>
  )
}

export default Online