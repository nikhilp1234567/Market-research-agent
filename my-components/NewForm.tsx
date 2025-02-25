"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
          <textarea
            {...register("name")}
            placeholder='Enter Name Here...'
            autoFocus
            className=' outline-1 p-3 !outline-white bg-transparent rounded-xl w-[50%] h-12'
            id=''></textarea>
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
