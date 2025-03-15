"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import DemoSliderButton from "./DemoSliderButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface DemoSliderProps {
  demographicData: {
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
  }[];
  responseData: {
    sentiment: string[];
    goodFitForMarket: boolean[];
    whatUsersLike: string[];
    painPoints: string[];
    willingnessToPay: number[];
    wouldBuy: boolean[];
    reason: string[];
    barrierForAdoption: string[];
    suggestedImprovements: string[];
    additionalFeedback: string[];
  };
}

const DemoSlider: React.FC<DemoSliderProps> = ({ demographicData, responseData }) => {
  return (
    <div className='w-full max-h-full'>
      <Swiper navigation loop={true} modules={[Navigation, Pagination]}>
        {demographicData.map(
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
              <div className=' h-full flex flex-col items-center text-center justify-center'>
                <p className='text-md sm:text-xl lg:text-xl font-semibold text-white mb-4'>Demographic Profile #{id}</p>
                <div className='grid grid-cols-4 gap-2 w-full'>
                  <div className='flex flex-col gap-1'>
                    <DemoSliderButton text='Age' />
                    <DemoSliderButton text='Gender' />
                    <DemoSliderButton text='Ethnicity' />
                    <DemoSliderButton text='Location' />
                    <DemoSliderButton text='Education' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <DemoSliderButton text='Employment' />
                    <DemoSliderButton text='Income' />
                    <DemoSliderButton text='Marital Status' />
                    <DemoSliderButton text='Dependents' />
                    <DemoSliderButton text='Industry' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <DemoSliderButton text='Sentiment' />
                    <DemoSliderButton text='Market Fit' />
                    <DemoSliderButton text='Likes' />
                    <DemoSliderButton text='Pain Points' />
                    <DemoSliderButton text='Willingness to Pay' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <DemoSliderButton text='Would Buy' />
                    <DemoSliderButton text='Reason' />
                    <DemoSliderButton text='Adoption Barrier' />
                    <DemoSliderButton text='Improvements' />
                    <DemoSliderButton text='Additional Feedback' />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default DemoSlider;
