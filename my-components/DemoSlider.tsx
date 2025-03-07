"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
  id: number;
  age: string;
  educationLevel: string;
  employmentStatus: string;
  ethnicity: string;
  gender: string;
  householdIncome: string;
  industryAndJobRole: string;
  location: string;
  maritalStatus: string;
  numberOfDependents: number;
}

interface DemoSliderProps {
  data: Slide[];
}

// age: '28',
// educationLevel: "Associate's Degree",
// employmentStatus: 'Employed Part-Time',
// ethnicity: 'Pakistani British',
// gender: 'Male',
// householdIncome: '£25,000',
// industryAndJobRole: 'Retail - Sales Assistant',
// location: 'Manchester, United Kingdom',
// maritalStatus: 'Single',
// numberOfDependents: 0

const DemoSlider: React.FC<DemoSliderProps> = ({ data }) => {
  return (
    <section className='w-full'>
      <div className=' h-full'>
        <ul className='h-full w-full'>
          <Swiper navigation pagination={{ type: "bullets", clickable: true }} autoplay={true} loop={true} modules={[Autoplay, Navigation, Pagination]}>
            {data.map(
              ({
                id,
                age,
                educationLevel,
                employmentStatus,
                ethnicity,
                gender,
                householdIncome,
                industryAndJobRole,
                location,
                maritalStatus,
                numberOfDependents,
              }) => (
                <SwiperSlide key={id}>
                  <div
                    className='h-full w-full absolute left-0 top-0'
                    style={{
                      background: `blue`,
                    }}></div>
                  <div className='h-full w-full absolute left-0 top-0 bg-black opacity-20'></div>
                  <div className='relative z-10 h-full flex items-center justify-center'>
                    <div className='text-center'>
                      <p className='text-md sm:text-xl lg:text-3xl font-semibold text-white'>demographic profile {id}</p>
                      <p className='text-3xl sm:text-6xl lg:text-8xl font-bold text-white'>
                        Age: {age}, ethnicity: {ethnicity}, gender: {gender}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default DemoSlider;
