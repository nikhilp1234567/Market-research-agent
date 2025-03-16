"use client";

import { ClassNames } from "@emotion/react";
import Link from "next/link";
import { Pagination, EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReferenceCard from "@/my-components/ReferenceCard";

export default function Home() {
  return (
    <div className='flex flex-col'>
      <div id='hero-section' className='flex flex-1 flex-col bg-[#070F2B] w-full min-h-[calc(100vh-4rem)] items-center justify-center text-center'>
        <h1 className='w-[80%] text-7xl font-bold text-white'>Market Research In Minutes, Not Months.</h1>
        <p className='text-xl mt-6 text-white font-extralight'>Get instant, AI-powered feedback from digital avatars of real people.</p>
        <button className='mt-8 bg-black hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg text-xl transition-colors duration-200'>
          <Link href='/sign-in'>Try It Now</Link>
        </button>
      </div>
      <div id='about-section' className='w-full min-h-[50vh] items-center justify-center bg-[#070F2B]'>
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
      <div id='features-section' className='w-full min-h-[50vh] bg-[#070F2B] py-16'>
        <h3 className='text-3xl text-center font-semibold text-white mb-12'>Features</h3>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid grid-cols-3 gap-8'>
            <div className='col-span-1 space-y-8'>
              <div>
                <h3 className='text-2xl font-semibold text-white mb-4'>Real-Time Feedback</h3>
                <p className='text-gray-300'>Get instant responses from AI-powered avatars that simulate real consumer behavior.</p>
              </div>
              <div>
                <h3 className='text-2xl font-semibold text-white mb-4'>Diverse Profiles</h3>
                <p className='text-gray-300'>Access a wide range of demographic and psychographic profiles for comprehensive insights.</p>
              </div>
              <div>
                <h3 className='text-2xl font-semibold text-white mb-4'>Actionable Analytics</h3>
                <p className='text-gray-300'>Receive clear, data-driven recommendations to inform your business strategy.</p>
              </div>
            </div>
            <div className='col-span-2 bg-gray-800 rounded-lg'></div>
          </div>
        </div>
      </div>
      <div id='reviews-section' className='w-full min-h-[50vh] items-center justify-center bg-[#070F2B]'>
        <h3 className='text-3xl text-center font-semibold text-white mb-4'>Reviews</h3>
        <Swiper
          effect={"coverflow"}
          className='!p-6 h-[300px]'
          loop={true}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={true}
          coverflowEffect={{
            rotate: 50, // How many degrees each slide rotates
            stretch: 0, // How much the slides stretch (positive) or compress (negative)
            depth: 100, // The depth effect/perspective (how far the slides appear to go "into" the screen)
            modifier: 1, // Multiplier for all effects (higher = more intense)
            slideShadows: false, // Whether to show shadows under the slides
          }}
          navigation
          modules={[Pagination, EffectCoverflow, Navigation, Autoplay]}>
          <SwiperSlide className='bg-black border rounded-[2rem] flex flex-col text-left p-6'>
            <ReferenceCard name='hello' reference='bye' />
          </SwiperSlide>
          <SwiperSlide className='bg-black border  rounded-[2rem] flex flex-col text-left p-6 '>
            <ReferenceCard name='hello' reference='bye' />
          </SwiperSlide>
          <SwiperSlide className='bg-black border  rounded-[2rem] flex flex-col text-left p-6 '>
            <ReferenceCard name='hello' reference='bye' />
          </SwiperSlide>
          <SwiperSlide className='bg-black border  rounded-[2rem] flex flex-col text-left p-6 '>
            <ReferenceCard name='hello' reference='bye' />
          </SwiperSlide>
        </Swiper>
      </div>
      <div id='footer' className='w-full bg-[#070F2B] py-8'>
        <div className='border-t border-gray-700 mt-8 pt-8 text-center'>
          <p className='text-gray-300 text-sm'>&copy; 2025 MarketMind. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
