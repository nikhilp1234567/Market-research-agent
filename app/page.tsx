"use client";

import { ClassNames } from "@emotion/react";
import Link from "next/link";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  return (
    <>
      <div id='hero-section' className='flex flex-1 flex-col bg-[#070F2B] w-full min-h-[calc(100vh-4rem)] items-center justify-center text-center'>
        <h1 className='w-[80%] text-7xl font-bold text-white'>Market Research In Minutes, Not Months.</h1>
        <p className='text-xl mt-6 text-white font-extralight'>Get instant, AI-powered feedback from digital avatars of real people.</p>
        <button className='mt-8 bg-black hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg text-xl transition-colors duration-200'>
          <Link href='/sign-in'>Try It Now</Link>
        </button>
      </div>
      <div id='about-section' className='w-full py-20 bg-[#070F2B]'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-8'>Your Agentic Market Research Platform</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <h3 className='text-2xl font-semibold mb-4'>AI-Powered Insights</h3>
              <p className='text-gray-600'>
                Leverage advanced AI to get accurate, real-time feedback from digital avatars that represent diverse consumer profiles.
              </p>
            </div>
            <div className='text-center'>
              <h3 className='text-2xl font-semibold mb-4'>Fast & Efficient</h3>
              <p className='text-gray-600'>Conduct market research in minutes instead of months, saving you time and resources while maintaining quality.</p>
            </div>
            <div className='text-center'>
              <h3 className='text-2xl font-semibold mb-4'>Data-Driven Decisions</h3>
              <p className='text-gray-600'>
                Make informed business decisions with comprehensive analytics and insights derived from real consumer behavior patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id='slider-holder' className='w-full py-20 bg-[#070F2B]'></div>
    </>
  );
}
