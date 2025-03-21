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
      {/* Hero Section */}
      <section
        id='hero-section'
        className='flex flex-1 flex-col bg-[#070F2B] w-full min-h-[calc(100vh-4rem)] items-center justify-center text-center px-4 hover:bg-[#0a1a40] transition-colors duration-300'>
        <h1 className='w-full md:w-[80%] text-4xl md:text-6xl lg:text-7xl font-bold text-white hover:text-gray-200 transition-colors duration-200'>
          Market Research In Minutes, Not Months.
        </h1>
        <p className='text-lg md:text-xl mt-6 text-white font-extralight max-w-2xl hover:text-gray-200 transition-colors duration-200'>
          Get instant, AI-powered feedback from digital avatars of real people.
        </p>
        <button className='mt-8 bg-black hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg text-lg md:text-xl transition-all duration-200 hover:scale-105'>
          <Link href='/sign-in'>Try It Now</Link>
        </button>
      </section>

      {/* About Section */}
      <section id='about-section' className='w-full py-16 md:py-24 bg-[#070F2B] hover:bg-[#0a1a40] transition-colors duration-300'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 text-white hover:text-gray-200 transition-colors duration-200'>
            Your Agentic Market Research Platform
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: "AI-Powered Insights",
                description: "Leverage advanced AI to get accurate, real-time feedback from digital avatars that represent diverse consumer profiles.",
              },
              {
                title: "Fast & Efficient",
                description: "Conduct market research in minutes instead of months, saving you time and resources while maintaining quality.",
              },
              {
                title: "Data-Driven Decisions",
                description: "Make informed business decisions with comprehensive analytics and insights derived from real consumer behavior patterns.",
              },
            ].map((item, index) => (
              <div key={index} className='text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105 cursor-pointer'>
                <h3 className='text-2xl font-semibold mb-4 text-white'>{item.title}</h3>
                <p className='text-gray-300'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features-section' className='w-full py-16 bg-[#070F2B] hover:bg-[#0a1a40] transition-colors duration-300'>
        <div className='max-w-6xl mx-auto px-4'>
          <h3 className='text-3xl text-center font-semibold text-white mb-12 hover:text-gray-200 transition-colors duration-200'>Features</h3>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='space-y-8'>
              {[
                {
                  title: "Real-Time Feedback",
                  description: "Get instant responses from AI-powered avatars that simulate real consumer behavior.",
                },
                {
                  title: "Diverse Profiles",
                  description: "Access a wide range of demographic and psychographic profiles for comprehensive insights.",
                },
                {
                  title: "Actionable Analytics",
                  description: "Receive clear, data-driven recommendations to inform your business strategy.",
                },
              ].map((feature, index) => (
                <div key={index} className='hover:bg-gray-800 p-4 rounded-lg transition-all duration-200 cursor-pointer'>
                  <h3 className='text-2xl font-semibold text-white mb-4'>{feature.title}</h3>
                  <p className='text-gray-300'>{feature.description}</p>
                </div>
              ))}
            </div>
            <div className='lg:col-span-2 bg-gray-800 rounded-lg h-96 md:h-[500px] hover:bg-gray-700 transition-colors duration-200'></div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id='use-cases-section' className='w-full py-16 bg-[#070F2B] hover:bg-[#0a1a40] transition-colors duration-300'>
        <div className='max-w-6xl mx-auto px-4'>
          <h3 className='text-3xl text-center font-semibold text-white mb-12 hover:text-gray-200 transition-colors duration-200'>
            How MarketMind Helps Businesses
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: "Product Development",
                description: "Validate new product ideas and features with real consumer feedback before launch.",
                icon: "💡",
              },
              {
                title: "Marketing Strategy",
                description: "Test ad campaigns and messaging to optimize your marketing efforts.",
                icon: "📈",
              },
              {
                title: "Customer Insights",
                description: "Understand your target audience's needs, preferences, and pain points.",
                icon: "👥",
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className='bg-gray-800 rounded-lg p-8 flex flex-col justify-between text-center hover:bg-gray-700 transition-all duration-200 hover:scale-105 cursor-pointer'>
                <div className='text-4xl mb-4 hover:scale-110 transition-transform duration-200'>{useCase.icon}</div>
                <h4 className='text-2xl font-bold text-white mb-4'>{useCase.title}</h4>
                <p className='text-gray-300'>{useCase.description}</p>
                <button className='mt-6 w-full bg-black hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105'>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id='reviews-section' className='w-full py-16 bg-[#070F2B] hover:bg-[#0a1a40] transition-colors duration-300'>
        <div className=' mx-auto px-4'>
          <h3 className='text-3xl text-center font-semibold text-white mb-8 hover:text-gray-200 transition-colors duration-200'>What Our Users Say</h3>
          <Swiper
            effect={"coverflow"}
            className='!p-6 h-[300px] md:h-[400px]'
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            navigation
            modules={[Pagination, EffectCoverflow, Navigation, Autoplay]}>
            {[
              {
                name: "Alex Martinez",
                reference:
                  "As a bootstrapped startup, MarketMind gave us the insights we needed without breaking the bank. It's like having a full research team!",
              },
              {
                name: "Priya Kapoor",
                reference: "We pivoted our product based on MarketMind's analysis and saw 3x more engagement. Essential for early-stage startups!",
              },
              {
                name: "Jordan Lee",
                reference: "The competitor analysis helped us find our niche in a crowded market. Couldn't have done it without MarketMind.",
              },
              {
                name: "Taylor Nguyen",
                reference: "We used MarketMind to validate our MVP concept. The detailed reports helped us secure our first round of funding!",
              },
            ].map((review, index) => (
              <SwiperSlide key={index} className='bg-black border rounded-[2rem] flex flex-col text-left p-6 hover:bg-gray-900 transition-colors duration-200'>
                <ReferenceCard name={review.name} reference={review.reference} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <footer id='footer' className='w-full bg-[#070F2B] pb-8 hover:bg-[#0a1a40] transition-colors duration-300'>
        <div className='border-t border-gray-700 pt-8 text-center'>
          <p className='text-gray-300 text-sm hover:text-gray-200 transition-colors duration-200'>&copy; 2025 MarketMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
