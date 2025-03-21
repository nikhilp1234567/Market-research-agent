"use client";

import { ClassNames } from "@emotion/react";
import Link from "next/link";
import { Pagination, EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReferenceCard from "@/my-components/ReferenceCard";
import { CheckoutForm } from "@/my-components/CheckoutForm";

export default function Home() {
  return (
    <div className='flex flex-col bg-black'>
      {/* Hero Section */}
      <section
        id='hero-section'
        style={{ backgroundColor: "#070F2B" }}
        className='flex flex-1 flex-col w-full min-h-[calc(100vh-4rem)] items-center justify-center text-center px-4'>
        <h1 className='w-full md:w-[80%] text-4xl md:text-6xl lg:text-7xl font-semibold text-white hover:text-gray-200 transition-colors duration-300'>
          Market Research In{" "}
          <span className='animate-gradient-fast bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 bg-clip-text text-transparent animate-duration-[1s] animate-iteration-count-infinite animate-ease-linear animate-alternate-reverse'>
            Minutes
          </span>
          , Not Months.
        </h1>
        <p className='text-lg md:text-xl mt-6 text-gray-300 font-light max-w-2xl'>Get instant, AI-powered feedback from digital avatars of real people.</p>
        <div className='flex my-8 flex-row gap-6'>
          <Link
            href='/sign-in'
            className='bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-lg text-lg md:text-xl transition-all duration-200 hover:scale-105'>
            Try It Now
          </Link>
          <CheckoutForm />
        </div>
      </section>

      {/* About Section */}
      <section id='about-section' style={{ backgroundColor: "#070F2B" }} className='w-full py-16 md:py-24'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-semibold text-center mb-12 text-white'>Your Agentic Market Research Platform</h2>
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
              <div key={index} className='p-8 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 cursor-pointer hover:scale-105'>
                <h3 className='text-2xl font-semibold mb-4 text-white'>{item.title}</h3>
                <p className='text-gray-400'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features-section' style={{ backgroundColor: "#070F2B" }} className='w-full py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <h3 className='text-3xl text-center font-semibold text-white mb-12'>Features</h3>
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
                <div key={index} className='p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 cursor-pointer'>
                  <h3 className='text-2xl font-semibold text-white mb-4'>{feature.title}</h3>
                  <p className='text-gray-400'>{feature.description}</p>
                </div>
              ))}
            </div>
            <div className='lg:col-span-2 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors duration-200 h-96 md:h-[500px]'></div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id='use-cases-section' style={{ backgroundColor: "#070F2B" }} className='w-full py-16'>
        <div className='max-w-6xl mx-auto px-4'>
          <h3 className='text-3xl text-center font-semibold text-white mb-12'>How MarketMind Helps Businesses</h3>
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
                className='bg-gray-900 rounded-xl p-8 flex flex-col justify-between text-center hover:bg-gray-800 transition-all duration-200 hover:scale-105 cursor-pointer'>
                <div className='text-4xl mb-4 hover:scale-110 transition-transform duration-200'>{useCase.icon}</div>
                <h4 className='text-2xl font-semibold text-white mb-4'>{useCase.title}</h4>
                <p className='text-gray-400'>{useCase.description}</p>
                <button className='mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:scale-105'>
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id='reviews-section' style={{ backgroundColor: "#070F2B" }} className='w-full py-16'>
        <div className='mx-auto px-4'>
          <h3 className='text-3xl text-center font-semibold text-white mb-8'>What Our Users Say</h3>
          <Swiper
            effect={"coverflow"}
            className='!p-6 max-h-[300px] md:h-[400px]'
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
              <SwiperSlide key={index} className='bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors duration-200 h-full'>
                <ReferenceCard name={review.name} reference={review.reference} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <footer id='footer' style={{ backgroundColor: "#070F2B" }} className='w-full pb-8'>
        <div className='border-t border-gray-700 pt-8 text-center'>
          <p className='text-gray-400'>&copy; 2025 MarketMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
