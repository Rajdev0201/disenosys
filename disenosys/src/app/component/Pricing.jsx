import React from 'react'

export default function Pricing() {
    return (
        <section class="py-10 bg-[#182073] sm:py-16 lg:py-24">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="max-w-2xl mx-auto text-center">
                    <h1 className='font-bold font-poppins text-[#F1F1F5] text-xl lg:text-5xl'>
                        Our <span className='text-white'>C</span>ourses
                    </h1>
                    {/* <p class="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-400">Explore our diverse course offerings designed to help you achieve your learning goals. Whether you are a beginner or an advanced learner, we have a course for you.</p>
                 */}
                </div>

                <div class="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 sm:mt-16 sm:grid-cols-2">

                    <div class="group duration-500  hover:-rotate-0 hover:skew-x-1 skew-x-0 hover:-translate-x-6  hover:-translate-y-12">
                        <div class="group-hover:duration-400 relative rounded-2xl w-64 mx-auto h-36 bg-white text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-12  before:rounded-2xl  before:absolute before:content['']  before:bg-neutral-700 before:right-3 before:top-0 before:w-64 before:h-32 before:-z-10">
                            <span class="text-5xl font-bold text-[#182073]">Online</span>
                            <p class="text-[#182073] text-base font-bold">- Course -</p>
                        </div>

                        <div class="bg-gradient-to-r from-[#182073] to-blue-300 border-r-4 border-l-4 border-t-4 border-t-[#8991ee] border-b-4 border-b-[#8991ee] border-l-[#F1F1F5]  border-r-[#F1F1F5] rounded-md">
                            <div class="p-6 md:py-10 md:px-9">
                                <div class="inline-block px-4 py-2 bg-blue-100 rounded-full">
                                    <h3 class="text-sm font-semibold text-[#182073]">Online Classes
                                    </h3>
                                </div>
                                <p class="mt-5 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-900 hover:opacity-80 focus:opacity-80">$29</p>
                                <p class="mt-2 text-base text-gray-400">Per month</p>

                                <ul class="flex flex-col mt-8 space-y-4">
                                    <li class="inline-flex items-center space-x-2">
                                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="text-base font-medium text-[#F1F1F5]">Real-time Interaction</span>
                                        <svg class="w-4 h-4 ml-0.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </li>

                                    <li class="inline-flex items-center space-x-2">
                                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="text-base font-medium text-[#F1F1F5]"> Real-time Interaction </span>
                                    </li>

                                    <li class="inline-flex items-center space-x-2">
                                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="text-base font-medium text-[#F1F1F5]">Community Building </span>
                                    </li>

                                    <li class="inline-flex items-center space-x-2">
                                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="text-base font-medium text-[#F1F1F5]">Flexible Scheduling </span>
                                    </li>

                                    <li class="inline-flex items-center space-x-2">
                                        <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                        <span class="text-base font-medium text-[#F1F1F5]">Accountability</span>
                                    </li>
                                </ul>
                                <a href="#" title="" class="inline-flex items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-white
                                 transition-all duration-200 rounded-md   bg-[#182073] hover:opacity-80 focus:opacity-80" role="button"> Get Online Course </a>

                                <p class="mt-5 text-sm text-gray-400">No Credit Card Required</p>
                            </div>
                        </div>
                    </div>

                    
                    <div class="group duration-500  hover:-rotate-0 hover:skew-x-1 skew-x-0 hover:translate-x-6  hover:translate-y-12">
                        <div class="group-hover:duration-400 relative rounded-2xl w-64 mx-auto h-36 bg-white text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-12  before:rounded-2xl  before:absolute before:content['']  before:bg-neutral-700 before:right-3 before:top-0 before:w-64 before:h-32 before:-z-10">
                            <span class="text-5xl text-[#182073] font-bold">Recorded</span>
                            <p class="text-[#182073] text-base font-bold">- Course -</p>
                        </div>

                    <div class="bg-gradient-to-r from-[#182073] to-blue-300 border-r-4 border-l-4 border-t-4 border-t-[#8991ee] shadow-inner border-b-4 border-b-[#8991ee] border-l-[#F1F1F5]  border-r-[#F1F1F5] rounded-md">
                        <div class="p-6 md:py-10 md:px-9">
                            <div class="inline-block px-4 py-2 bg-blue-100 rounded-full">
                                <h3 class="text-sm font-semibold text-[#182073]">Pre-Recorded Classes</h3>
                            </div>
                            <p class="mt-5 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-900 hover:opacity-80 focus:opacity-80">$49</p>
                            <p class="mt-2 text-base text-gray-400">Per month</p>

                            <ul class="flex flex-col mt-8 space-y-4">
                                <li class="inline-flex items-center space-x-2">
                                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-base font-medium text-[#F1F1F5]">Learn at Your Own Pace</span>
                                    <svg class="w-4 h-4 ml-0.5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </li>

                                <li class="inline-flex items-center space-x-2">
                                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-base font-medium text-[#F1F1F5]">Lifetime Access </span>
                                </li>

                                <li class="inline-flex items-center space-x-2">
                                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-base font-medium text-[#F1F1F5]"> Cost-Effective </span>
                                </li>

                                <li class="inline-flex items-center space-x-2">
                                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-base font-medium text-[#F1F1F5]"> Consistency </span>
                                </li>

                                <li class="inline-flex items-center space-x-2">
                                    <svg class="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="text-base font-medium text-[#F1F1F5]">Accessibility</span>
                                </li>

                            </ul>

                            <a href="#" title="" class="inline-flex items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-white transition-all duration-200 rounded-md 
                            bg-[#182073]
                            hover:opacity-80 focus:opacity-80" role="button"> Get Pre-record  </a>

                            <p class="mt-5 text-sm text-gray-400">No Credit Card Required</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
