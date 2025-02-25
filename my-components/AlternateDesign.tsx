"use client";
import React from "react";
import FeedbackForm from "./FeedbackForm";

export default function LandingPage() {
  return (
    <div className='flex bg-white flex-1 pl-6 pr-6 flex-row justify-center items-center h-[calc(100vh-4rem)]'>
      <div className='w-1/2 p-5 h-full flex flex-col overflow-auto bg-gray-200 justify-start items-center'>
        <h1 className='text-3xl font-bold text-black mb-6 text-center'>Market Research In Minutes, Not Months</h1>
        <div className='p-5 w-full rounded-xl flex flex-col justify-center items-center bg-slate-900'>
          <FeedbackForm />
        </div>
      </div>
      <div className='w-1/2 p-5 h-full flex justify-center items-center bg-black'>
        <div className='flex h-full w-full bg-slate-900 rounded-xl overflow-auto'></div>
      </div>
    </div>
  );
}
