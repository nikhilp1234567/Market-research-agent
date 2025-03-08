"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Navigation, Pagination } from "swiper/modules";
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
    <section className='w-full'>
      <div className=' h-full'>
        <ul className='h-full w-full'>
          <Swiper navigation pagination={{ type: "bullets", clickable: true }} autoplay={true} loop={true} modules={[Navigation, Pagination]}>
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
                  <div
                    className='h-full w-full absolute left-0 top-0'
                    style={{
                      background: `blue`,
                    }}></div>
                  <div className='h-full w-full absolute left-0 top-0 bg-black opacity-20'></div>
                  <div className='relative z-10 h-full flex items-center justify-center'>
                    <div className='text-center max-w-4xl p-6 bg-black/50 rounded-lg'>
                      <p className='text-md sm:text-xl lg:text-3xl font-semibold text-white mb-4'>Demographic Profile #{id}</p>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-white'>
                        <div className='space-y-2 text-left'>
                          <p className='text-lg'>
                            <span className='font-semibold'>Age:</span> {age}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Gender:</span> {gender}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Ethnicity:</span> {ethnicity}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Location:</span> {location}
                          </p>
                        </div>
                        <div className='space-y-2 text-left'>
                          <p className='text-lg'>
                            <span className='font-semibold'>Education:</span> {educationLevel}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Employment:</span> {employmentStatus}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Income:</span> {householdIncome}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Marital Status:</span> {maritalStatus}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Dependents:</span> {numberOfDependents}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Industry:</span> {industryAndJobRole}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Sentiment:</span> {responseData.sentiment[id - 1]}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Market Fit:</span> {responseData.goodFitForMarket[id - 1] ? "Yes" : "No"}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Likes:</span> {responseData.whatUsersLike[id - 1]}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Pain Points:</span> {responseData.painPoints[id - 1]}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Willingness to Pay:</span> ${responseData.willingnessToPay[id - 1]}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Would Buy:</span> {responseData.wouldBuy[id - 1] ? "Yes" : "No"}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Reason:</span> {responseData.reason[id - 1]}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Adoption Barrier:</span> {responseData.barrierForAdoption[id - 1]}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Improvements:</span> {responseData.suggestedImprovements[id - 1]}
                          </p>
                          <p className='text-lg'>
                            <span className='font-semibold'>Additional feedback:</span> {responseData.additionalFeedback[id - 1]}
                          </p>
                        </div>
                      </div>
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
