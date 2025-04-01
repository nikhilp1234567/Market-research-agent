"use client"; // <===== REQUIRED

import React, { useState } from "react";

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
    goodFitForMarket: string[];
    whatUsersLike: string[];
    painPoints: string[];
    willingnessToPay: number[];
    wouldBuy: string[];
    reason: string[];
    barrierForAdoption: string[];
    suggestedImprovements: string[];
    additionalFeedback: string[];
  };
  onDataSelect: (data: string) => void;
}

const DemoSlider: React.FC<DemoSliderProps> = ({ demographicData, responseData, onDataSelect }) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleButtonClick = (data: string | number | boolean) => {
    onDataSelect(String(data));
  };

  return (
    <div className='w-full h-full'>
      <Swiper navigation loop={true} modules={[Navigation, Pagination]} onSlideChange={(swiper) => setCurrentProfileIndex(swiper.realIndex)} className='h-full'>
        {demographicData.map(
          (
            { id, age, educationLevel, employmentStatus, ethnicity, gender, householdIncome, industryAndJobRole, location, maritalStatus, numberOfDependents },
            index
          ) => (
            <SwiperSlide key={id} className='h-full'>
              <div className='h-full flex flex-col items-center text-center'>
                <p className='text-md sm:text-xl lg:text-xl font-semibold text-white mb-2'>Demographic Profile #{id}</p>
                <div className='grid grid-cols-4 gap-1 w-full flex-1'>
                  <div className='flex flex-col gap-1'>
                    <DemoSliderButton text='Age' onClick={() => handleButtonClick(age)} data={age} />
                    <DemoSliderButton text='Gender' onClick={() => handleButtonClick(gender)} data={gender} />
                    <DemoSliderButton text='Ethnicity' onClick={() => handleButtonClick(ethnicity)} data={ethnicity} />
                    <DemoSliderButton text='Location' onClick={() => handleButtonClick(location)} data={location} />
                    <DemoSliderButton text='Education' onClick={() => handleButtonClick(educationLevel)} data={educationLevel} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <DemoSliderButton text='Employment' onClick={() => handleButtonClick(employmentStatus)} data={employmentStatus} />
                    <DemoSliderButton text='Income' onClick={() => handleButtonClick(householdIncome)} data={householdIncome} />
                    <DemoSliderButton text='Marital Status' onClick={() => handleButtonClick(maritalStatus)} data={maritalStatus} />
                    <DemoSliderButton text='Dependents' onClick={() => handleButtonClick(numberOfDependents)} data={numberOfDependents} />
                    <DemoSliderButton text='Industry' onClick={() => handleButtonClick(industryAndJobRole)} data={industryAndJobRole} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <DemoSliderButton text='Sentiment' onClick={() => handleButtonClick(responseData.sentiment[index])} data={responseData.sentiment[index]} />
                    <DemoSliderButton
                      text='Market Fit'
                      onClick={() => handleButtonClick(responseData.goodFitForMarket[index])}
                      data={responseData.goodFitForMarket[index]}
                    />
                    <DemoSliderButton
                      text='Likes'
                      onClick={() => handleButtonClick(responseData.whatUsersLike[index])}
                      data={responseData.whatUsersLike[index]}
                    />
                    <DemoSliderButton
                      text='Pain Points'
                      onClick={() => handleButtonClick(responseData.painPoints[index])}
                      data={responseData.painPoints[index]}
                    />
                    <DemoSliderButton
                      text='Willingness to Pay'
                      onClick={() => handleButtonClick(responseData.willingnessToPay[index])}
                      data={responseData.willingnessToPay[index]}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <DemoSliderButton text='Would Buy' onClick={() => handleButtonClick(responseData.wouldBuy[index])} data={responseData.wouldBuy[index]} />
                    <DemoSliderButton text='Reason' onClick={() => handleButtonClick(responseData.reason[index])} data={responseData.reason[index]} />
                    <DemoSliderButton
                      text='Adoption Barrier'
                      onClick={() => handleButtonClick(responseData.barrierForAdoption[index])}
                      data={responseData.barrierForAdoption[index]}
                    />
                    <DemoSliderButton
                      text='Improvements'
                      onClick={() => handleButtonClick(responseData.suggestedImprovements[index])}
                      data={responseData.suggestedImprovements[index]}
                    />
                    <DemoSliderButton
                      text='Additional Feedback'
                      onClick={() => handleButtonClick(responseData.additionalFeedback[index])}
                      data={responseData.additionalFeedback[index]}
                    />
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
