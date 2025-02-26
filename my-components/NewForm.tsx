"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AgeSlider from "./AgeSlider";

export default function NewForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();

  switch (currentStep) {
    case 1:
      return (
        <div
          id='blue-background-holder'
          style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }}
          className='p-32 justify-center flex flex-1 gap-6 flex-col w-full h-full'>
          <h1 className='flex w-fit text-4xl'>Market Research Campaign Name:</h1>
          <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
            <textarea {...register("name")} placeholder='Enter Name Here...' autoFocus className='w-full outline-none bg-transparent' id=''></textarea>
          </div>
          <button
            onClick={() => {
              handleSubmit((data) => {
                console.log(data || "nothing");
                setCurrentStep(currentStep + 1);
              })();
            }}
            className='bg-slate-700 px-6 transition-all hover:bg-white hover:text-black py-3 rounded-md w-fit'>
            Next
          </button>
        </div>
      );
    case 2:
      return (
        <div
          id='blue-background-holder'
          style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }}
          className='p-32 justify-center flex flex-1 gap-6 flex-col w-full h-full'>
          <h1 className='flex w-fit text-4xl'>Market Research Campaign Goal:</h1>
          <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
            <select {...register("goal")} className='outline-none bg-transparent rounded-xl w-full'>
              <option value=' '>Select Campaign Goal</option>
              <option value='validatePMF'>Validate product-market fit</option>
              <option value='digitalAd'>Test a digital ad</option>
              <option value='customerInsights'>Gather customer insights</option>
            </select>
          </div>

          <button
            onClick={() => {
              handleSubmit((data) => {
                console.log(data);
                setCurrentStep(currentStep + 1);
              })();
            }}
            className='bg-slate-700 px-6 transition-all hover:bg-white hover:text-black py-3 rounded-md w-fit'>
            Next
          </button>
        </div>
      );
    case 3:
      return (
        <div
          id='blue-background-holder'
          style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }}
          className='px-32 py-16 flex flex-1 gap-6 justify-between overflow-auto flex-col w-full max-h-full h-full'>
          <h1 className='flex w-fit text-4xl'>Campaign Demographic Controls:</h1>
          <div className='w-[70%]'>
            <label htmlFor='age'>Age Range:</label>
            <div className='mt-3'>
              <AgeSlider />
            </div>
          </div>
          <div>
            <label htmlFor=''>Gender:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <select {...register("gender")} className='bg-transparent w-full outline-none'>
                <option value=' '>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Male, Female'>Both</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor=''>Interests:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <textarea
                className='w-full h-full outline-none bg-transparent'
                placeholder='Enter interests as a comma separated list (eg backpacking, web-app development)'
                name=''
                id=''></textarea>
            </div>
          </div>
          <div>
            <label htmlFor=''>Locations:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <textarea
                className='w-full h-full outline-none bg-transparent'
                placeholder='Enter locations as a comma separated list. Cities, regions, countries and areas accepted.'
                name=''
                id=''></textarea>
            </div>
          </div>
          {/* employment */}{" "}
          <button
            onClick={() => {
              handleSubmit((data) => {
                console.log(data);
                setCurrentStep(currentStep + 1);
              })();
            }}
            className='bg-slate-700 px-6 transition-all hover:bg-white hover:text-black py-3 rounded-md w-fit'>
            Next
          </button>
        </div>
      );
  }
}
