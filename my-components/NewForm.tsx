"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AgeSlider from "./AgeSlider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { blue } from "@mui/material/colors";
import axios from "axios";

export default function NewForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit } = useForm();
  const [visible, setVisible] = useState(true);

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
          // Redirect to results page with the data
          localStorage.setItem("searchData", JSON.stringify(responseData));
          window.location.href = `/result`;
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
            <label htmlFor=''>Interests and Behaviours:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <textarea
                {...register("interests")}
                className='w-full h-full outline-none bg-transparent'
                placeholder='Enter interests as a comma separated list (eg backpacking, web-app development)'
                name='interests'
                id=''></textarea>
            </div>
          </div>
          <div>
            <label htmlFor=''>Locations:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <textarea
                {...register("locations")}
                className='w-full h-full outline-none bg-transparent'
                placeholder='Enter locations as a comma separated list. Cities, regions, countries and areas accepted.'
                name='locations'
                id=''></textarea>
            </div>
          </div>
          <div>
            <label htmlFor=''>Employment and Industry:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <textarea
                {...register("employmentSituation")}
                className='w-full h-full outline-none bg-transparent'
                placeholder='Enter employment situation as a comma separated list. Categories, industries and specific roles accepted.'
                name='employmentSituation'
                id=''></textarea>
            </div>
          </div>
          <div>
            <label htmlFor=''>Household Income:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <select {...register("householdIncome")} className='bg-transparent w-full outline-none'>
                <option value=' '>Select Household Income:</option>
                <option value='0 - 19,999'>0 - 19,999</option>
                <option value='20,000 - 39,999'>20,000 - 39,999</option>
                <option value='40,000 - 59,999'>40,000 - 59,999</option>
                <option value='60,000 - 79,999'>60,000 - 79,999</option>
                <option value='80,000 - 99,999'>80,000 - 99,999</option>
                <option value='100,000+'>100,000+</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor=''>Marital Status:</label>

            <div className='flex flex-row w-[70%]'>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("maritalStatus")}
                    value='Single'
                    defaultChecked
                    sx={{
                      color: blue[800],
                      "&.Mui-checked": {
                        color: blue[600],
                      },
                    }}
                  />
                }
                label='Single'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("maritalStatus")}
                    value='Married'
                    defaultChecked
                    sx={{
                      color: blue[800],
                      "&.Mui-checked": {
                        color: blue[600],
                      },
                    }}
                  />
                }
                label='Married'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("maritalStatus")}
                    value='Widowed'
                    defaultChecked
                    sx={{
                      color: blue[800],
                      "&.Mui-checked": {
                        color: blue[600],
                      },
                    }}
                  />
                }
                label='Widowed'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("maritalStatus")}
                    value='Divorced'
                    defaultChecked
                    sx={{
                      color: blue[800],
                      "&.Mui-checked": {
                        color: blue[600],
                      },
                    }}
                  />
                }
                label='Divorced'
              />
            </div>
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
    case 4:
      return (
        <div
          id='blue-background-holder'
          style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }}
          className='px-32 py-16 flex flex-1 gap-6 justify-between overflow-auto flex-col w-full max-h-full h-full'>
          <h1 className='flex w-fit text-4xl'>Campaign Details:</h1>
          <div>
            <label htmlFor=''>Campaign Category:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <select {...register("campaignCategory")} className='bg-transparent w-full outline-none'>
                <option value=' '>Select Category</option>
                <option value='product'>Product</option>
                <option value='idea'>Idea</option>
                <option value='service'>Service</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor=''>Campaign Description:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <textarea
                {...register("campaignDescription")}
                className='w-full h-full outline-none bg-transparent'
                placeholder='Write a detailed description of your product/service/idea. Include associated prices (if any), use cases and more.'
                name=''
                id=''></textarea>
            </div>
          </div>
          <div>
            <label htmlFor=''>Add relevant media:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <input type='file' {...register("files")} multiple className='w-full outline-none bg-transparent' />
            </div>
          </div>
          <div>
            <label htmlFor=''>Connect existing links:</label>
            <div className='flex justify-center items-center p-2 !border-solid !border-white border-[3px] w-[70%] rounded-xl'>
              <textarea
                {...register("relevantLinks")}
                className='w-full h-full outline-none bg-transparent'
                placeholder='Add in any relevant links to websites, socials or articles.'
                name='relevantLinks'
                id=''></textarea>
            </div>
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
    case 5:
      return (
        <div
          id='blue-background-holder'
          style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }}
          className='px-32 py-16 flex flex-1 gap-6 justify-center items-center overflow-hidden flex-col w-full max-h-full h-full'>
          {visible ? (
            <div>
              <h1 className='text-5xl duration-1000'>Ok, You're all set</h1>
              <h3 className='text-2xl'>Hit the submit button below to get your personalised feedback report:</h3>
            </div>
          ) : (
            <div></div>
          )}

          <button
            onClick={async () => {
              setVisible(false);
              await finalSubmit();
            }}
            className='bg-slate-700 px-8 transition-all duration-500 hover:bg-blue-600 hover:text-white hover:px-12 py-6 rounded-2xl w-fit'>
            {visible ? "Submit" : <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white'></div>}
          </button>
        </div>
      );
  }
}
