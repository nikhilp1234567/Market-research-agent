"use client";

import Link from "next/link";
import { Pagination, EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReferenceCard from "@/my-components/ReferenceCard";

export default function Home() {
  return (
    <div className='flex flex-col bg-black'>
      {/* Hero Section */}
      <section
        id='hero-section'
        style={{ backgroundColor: "#030303" }}
        className='flex flex-1 flex-col w-full min-h-[calc(100vh-4rem)] items-center justify-center text-center px-4'>
        <h1 className='font-light w-full md:w-[80%] text-4xl md:text-6xl lg:text-7xl text-white hover:text-gray-200 transition-colors duration-300'>
          Market Research In{" "}
          <span className='bg-gradient-to-r from-blue-500 via-indigo-500 to-green-500 bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]'>
            Minutes
          </span>
          , Not Months.
        </h1>
        <p
          className='text-lg animate-typing transition-all duration-3000 overflow-hidden whitespace-nowrap md:text-xl mt-6 text-gray-300 font-light max-w-2xl'
          style={{ direction: "ltr" }}>
          Get instant, AI-powered feedback from digital avatars of real people.
        </p>
        <div className='flex my-8 flex-row gap-6'>
          <Link
            href='/sign-up'
            className='bg-black border-2  border-white hover:bg-white hover:text-black text-white font-medium py-3 px-8 rounded-xl text-lg md:text-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl active:shadow-md'>
            Try It Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id='about-section' style={{ backgroundColor: "#070F2B" }} className='max-w-full mx-6 py-16 md:py-24 border rounded-xl border'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-light text-center mb-12 text-white animate-fade-up animate-once animate-ease-in-out'>
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
              <div
                key={index}
                className='p-8 border bg-gray-900 rounded-xl hover:bg-blue-900/20 transition-all duration-200 cursor-pointer hover:scale-105 animate-fade-up animate-once animate-ease-in-out'
                style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className='text-2xl font-light mb-4 text-white'>{item.title}</h3>
                <p className='text-gray-400'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features-section' style={{ backgroundColor: "#030303" }} className='w-full py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <h3 className='text-3xl md:text-4xl font-light text-center mb-12 text-white animate-fade-up animate-once animate-ease-in-out'>Features</h3>
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
                <div
                  key={index}
                  className='p-6 border bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 cursor-pointer animate-fade-up animate-once animate-ease-in-out'
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className='text-2xl font-light text-white mb-4'>{feature.title}</h3>
                  <p className='text-gray-400'>{feature.description}</p>
                </div>
              ))}
            </div>
            <div className='lg:col-span-2 border bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors duration-200 min-h-full md:h-[500px] animate-fade-up animate-once animate-ease-in-out'>
              <img src='/images/example.png' className='w-full border h-full rounded-xl' alt='' />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id='use-cases-section' style={{ backgroundColor: "#070F2B" }} className='max-w-full mx-6 rounded-xl border py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <h3 className='text-3xl text-center font-light text-white mb-12 animate-fade-up animate-once animate-ease-in-out'>How MarketMind Helps Businesses</h3>
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
                className='bg-gray-900 rounded-xl border p-8 flex flex-col justify-between text-center hover:bg-gray-800 transition-all duration-200 hover:scale-105 cursor-pointer animate-fade-up animate-once animate-ease-in-out'
                style={{ animationDelay: `${index * 100}ms` }}>
                <div className='text-4xl mb-4 hover:scale-110 transition-transform duration-200'>{useCase.icon}</div>
                <h4 className='text-2xl font-light text-white mb-4'>{useCase.title}</h4>
                <p className='text-gray-400'>{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id='reviews-section' style={{ backgroundColor: "#030303" }} className='w-full py-16'>
        <div className='mx-auto px-4'>
          <h3 className='text-3xl text-center font-light text-white mb-8 animate-fade-up animate-once animate-ease-in-out'>What Our Users Say</h3>
          <Swiper
            effect={"coverflow"}
            className='!p-6 max-h-[300px] md:h-[400px] animate-fade-up animate-once animate-ease-in-out'
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
              <SwiperSlide
                key={index}
                className='bg-gray-900 rounded-xl border hover:bg-gray-800 transition-colors duration-200 h-full animate-fade-up animate-once animate-ease-in-out'
                style={{ animationDelay: `${index * 100}ms` }}>
                <ReferenceCard name={review.name} reference={review.reference} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <footer id='footer' style={{ backgroundColor: "#070F2B" }} className='max-w-full h-20 flex justify-center items-center rounded-lg m-6 border'>
        <p className='text-gray-400'>&copy; 2025 MarketMind. All rights reserved.</p>
      </footer>
    </div>
  );
}
