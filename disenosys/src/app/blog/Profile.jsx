import React from 'react'

const Profile = ({name,designation}) => {
  return ( 
  <>
  {name ? (
<div class="flex items-center p-3 w-68 h-32 bg-white rounded-md shadow-sm">
  <section class="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
    <svg viewBox="0 0 15 15" class="w-7 h-7 fill-gray-700">
      <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z">
      </path>
    </svg>
  </section>

  <section class="block border-l border-gray-300 m-3">
    <div class="pl-3">
      <h3 class="bg-clip-text text-transparent bg-gradient-to-l from-[#005BC4] w-44 to-[#27272A] text-lg font-bold">{name}</h3>
      <h3 class="text-gray-600 font-semibold text-sm ">{designation}
      </h3>
    </div>
    <div class="flex gap-3 pt-2 pl-3">
      <svg stroke="currentColor" viewBox="0 0 24 24" class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
        </path>
      </svg>
      <svg stroke="currentColor" viewBox="0 0 24 24" class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z">
        </path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
      <svg stroke="currentColor" viewBox="0 0 24 24" class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
        </path>
      </svg>
      <svg stroke="currentColor" viewBox="0 0 24 24" class="w-4 hover:scale-125 duration-200 hover:cursor-pointer fill-white stroke-2">
        <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
      </svg>
    </div>
  </section>
</div>
  ) : (
      <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Please Select the link and read the blog</p>
    </div>
  )}
</>
  )
}

export default Profile