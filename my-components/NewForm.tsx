"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AgeSlider from "./AgeSlider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function NewForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  async function finalSubmit() {
    handleSubmit(async (data) => {
      console.log(data);
      try {
        const response = await axios.post("/api/generate", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = response.data;

        if (response.status === 200) {
          console.log(responseData);
          setVisible(true);
          localStorage.setItem("searchData", JSON.stringify(responseData));
        } else {
          throw new Error(data.error || "Failed to get feedback");
        }
      } catch (error) {
        console.error("Submission failed:", error);
        setVisible(true);
      }
    })();
  }

  switch (currentStep) {
    case 1:
      return (
        <div
          id='blue-background-holder'
          style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }}
          className='px-32 py-16 flex flex-1 gap-8 justify-between overflow-auto flex-col w-full max-h-full h-full'>
          <div className='border-b border-gray-600 pb-4'>
            <h1 className='text-4xl font-semibold text-blue-400'>Campaign Overview</h1>
            <p className='text-gray-400 mt-2 text-sm'>Step 1 of 3: Basic Information</p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Campaign Name</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <textarea
                  {...register("name")}
                  placeholder='Enter your product name and a brief tagline'
                  autoFocus
                  className='w-full outline-none bg-transparent min-h-[50px]'
                  id=''></textarea>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Type of Campaign</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <select {...register("campaignCategory")} className='bg-transparent w-full outline-none cursor-pointer'>
                  <option value=' '>Choose your campaign type</option>
                  <option value='product'>Product</option>
                  <option value='idea'>Idea</option>
                  <option value='service'>Service</option>
                </select>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Detailed Description</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <textarea
                  {...register("campaignDescription")}
                  className='w-full outline-none bg-transparent min-h-[100px]'
                  placeholder='Describe your offering, including pricing and key features'
                  name=''
                  id=''></textarea>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Supporting Media</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <input type='file' {...register("files")} multiple className='w-full outline-none bg-transparent cursor-pointer' />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Related Links</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <textarea
                  {...register("relevantLinks")}
                  className='w-full outline-none bg-transparent min-h-[50px]'
                  placeholder='Add website URLs, social media links, or relevant articles'
                  name='relevantLinks'
                  id=''></textarea>
              </div>
            </div>
          </div>

          <div className='pt-4 border-t border-gray-600'>
            <button
              onClick={() => {
                handleSubmit((data) => {
                  console.log(data || "nothing");
                  setCurrentStep(currentStep + 1);
                })();
              }}
              className='bg-blue-600 px-8 transition-all hover:bg-blue-500 py-3 rounded-lg w-fit font-medium'>
              Next Step
            </button>
          </div>
        </div>
      );

    case 2:
      return (
        <div
          id='blue-background-holder'
          style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }}
          className='px-32 py-16 flex flex-1 gap-8 justify-between overflow-auto flex-col w-full max-h-full h-full'>
          <div className='border-b border-gray-600 pb-4'>
            <h1 className='text-4xl font-semibold text-blue-400'>Target Demographics</h1>
            <p className='text-gray-400 mt-2 text-sm'>Step 2 of 3: Audience Definition</p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Age Range</label>
              <div className='w-[70%]'>
                <AgeSlider />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Gender</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <select {...register("gender")} className='bg-transparent w-full outline-none cursor-pointer'>
                  <option value=' '>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Male, Female'>Both</option>
                </select>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Interests and Behaviors</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <textarea
                  {...register("interests")}
                  className='w-full outline-none bg-transparent min-h-[50px]'
                  placeholder='Enter interests separated by commas (e.g., backpacking, web development)'
                  name='interests'
                  id=''></textarea>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Locations</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <textarea
                  {...register("locations")}
                  className='w-full outline-none bg-transparent min-h-[50px]'
                  placeholder='Enter locations separated by commas (cities, regions, countries)'
                  name='locations'
                  id=''></textarea>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Employment and Industry</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <textarea
                  {...register("employmentSituation")}
                  className='w-full outline-none bg-transparent min-h-[50px]'
                  placeholder='Enter employment types and industries separated by commas'
                  name='employmentSituation'
                  id=''></textarea>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Household Income</label>
              <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                <select {...register("householdIncome")} className='bg-transparent w-full outline-none cursor-pointer'>
                  <option value=' '>Select Income Range</option>
                  <option value='0 - 19,999'>$0 - $19,999</option>
                  <option value='20,000 - 39,999'>$20,000 - $39,999</option>
                  <option value='40,000 - 59,999'>$40,000 - $59,999</option>
                  <option value='60,000 - 79,999'>$60,000 - $79,999</option>
                  <option value='80,000 - 99,999'>$80,000 - $99,999</option>
                  <option value='100,000+'>$100,000+</option>
                </select>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-lg font-medium text-blue-300'>Marital Status</label>
              <div className='flex flex-row gap-6 w-[70%] p-3'>
                {["Single", "Married", "Widowed", "Divorced"].map((status) => (
                  <FormControlLabel
                    key={status}
                    control={
                      <Checkbox
                        {...register("maritalStatus")}
                        value={status}
                        defaultChecked
                        sx={{
                          color: blue[800],
                          "&.Mui-checked": {
                            color: blue[600],
                          },
                        }}
                      />
                    }
                    label={status}
                    className='text-blue-300'
                  />
                ))}
              </div>
            </div>
          </div>

          <div className='pt-4 border-t border-gray-600 flex gap-3'>
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className='bg-gray-700 px-8 transition-all hover:bg-gray-600 py-3 rounded-lg w-fit font-medium'>
              Previous Step
            </button>
            <button
              onClick={() => {
                handleSubmit((data) => {
                  console.log(data);
                  setCurrentStep(currentStep + 1);
                })();
              }}
              className='bg-blue-600 px-8 transition-all hover:bg-blue-500 py-3 rounded-lg w-fit font-medium'>
              Next Step
            </button>
          </div>
        </div>
      );

    case 3:
      return (
        <div
          id='blue-background-holder'
          style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }}
          className='px-32 py-16 flex flex-1 gap-8 justify-center items-center overflow-hidden flex-col w-full max-h-full h-full'>
          <div className='border-b border-gray-600 pb-4 w-full text-center'>
            <h1 className='text-4xl font-semibold text-blue-400'>Review & Submit</h1>
            <p className='text-gray-400 mt-2 text-sm'>Step 3 of 3: Final Confirmation</p>
          </div>
          <div className='flex flex-col text-center gap-6 my-12'>
            <h1 className='text-5xl duration-1000 font-bold text-blue-300'>Your Campaign is Ready for Analysis</h1>
            <h3 className='text-2xl font-light text-gray-300'>Click submit to generate your market research report with actionable insights</h3>
          </div>
          <button
            onClick={async () => {
              router.push('/result');
              setVisible(false);
              await finalSubmit();
            }}
            className='bg-blue-600 px-12 transition-all duration-500 hover:bg-blue-500 hover:px-16 py-4 rounded-xl w-fit font-medium text-lg'>
            {visible ? "Generate Report" : <div className='animate-spin duration-500 rounded-full h-6 w-6 border-b-2 border-white'></div>}
          </button>
        </div>
      );
  }
}
