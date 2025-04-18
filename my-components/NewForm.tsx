"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AgeSlider from "./AgeSlider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { motion, AnimatePresence } from "framer-motion";

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
          router.push("/result");
        } else {
          throw new Error(data.error || "Failed to get feedback");
        }
      } catch (error: any) {
        console.error("Submission failed:", error);
        setVisible(true);
      }
    })();
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div
      id='blue-background-holder'
      style={{ overflow: currentStep === 3 ? "hidden" : "auto", justifyContent: currentStep === 3 ? "center" : "" }}
      className='rounded-lg bg-[#070F2B] w-full h-full flex flex-col p-12 gap-6'>
      <AnimatePresence initial={false} custom={currentStep}>
        <motion.div
          key={currentStep}
          custom={currentStep}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{ duration: 0.3 }}
          className='w-full'>
          {(() => {
            switch (currentStep) {
              case 1:
                return (
                  <div className='flex flex-col gap-6'>
                    <div className='w-full border-b border-gray-600 pb-4 text-center'>
                      <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-400'>Campaign Overview</h1>
                      <p className='text-gray-400 mt-2 text-sm'>Step 1 of 3: Basic Information</p>
                    </div>

                    <div className='w-full space-y-4 sm:space-y-6'>
                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Campaign Name
                          <Tooltip title='Enter a memorable name for your campaign that clearly identifies your product or service'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
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
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Type of Campaign
                          <Tooltip title="Select the category that best describes what you're promoting">
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
                        <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                          <select {...register("campaignCategory")} className='bg-[#070F2B] text-white w-full outline-none cursor-pointer'>
                            <option value=' '>Choose your campaign type</option>
                            <option value='product'>Product</option>
                            <option value='idea'>Idea</option>
                            <option value='service'>Service</option>
                          </select>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Detailed Description
                          <Tooltip title='Provide comprehensive information about your offering, including key features, benefits, and pricing details'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
                        <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                          <textarea
                            {...register("campaignDescription")}
                            className='w-full outline-none bg-transparent min-h-[100px]'
                            placeholder='Describe your offering, including pricing and key features'
                            name='campaignDescription'
                            id=''></textarea>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Supporting Media
                          <Tooltip title='Upload images, videos, or documents that showcase your product or service'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
                        <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                          <input type='file' {...register("files")} multiple className='w-full outline-none bg-transparent cursor-pointer' />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Related Links
                          <Tooltip title='Add URLs to your website, social media profiles, or relevant articles that provide more information'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
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

                    <div className='w-full pt-4 border-t border-gray-600 flex justify-center sm:justify-start'>
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
                  <div className='flex flex-col gap-6'>
                    <div className='w-full border-b border-gray-600 pb-4 text-center'>
                      <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-400'>Target Demographics</h1>
                      <p className='text-gray-400 mt-2 text-sm'>Step 2 of 3: Audience Definition</p>
                    </div>

                    <div className='w-full space-y-4 sm:space-y-6'>
                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Age Range
                          <Tooltip title='Select the age group that best represents your target audience'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
                        <div className='w-[70%]'>
                          <AgeSlider />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Gender
                          <Tooltip title='Choose the gender demographic you want to target'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
                        <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                          <select {...register("gender")} className='bg-[#070F2B] text-white w-full outline-none cursor-pointer'>
                            <option value=' '>Select Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Male, Female'>Both</option>
                          </select>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Interests and Behaviors
                          <Tooltip title='List specific interests, hobbies, or behaviors that characterize your target audience'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
                        <div className='flex justify-center items-center p-3 !border-solid !border-blue-900 border-[2px] w-[70%] rounded-xl hover:border-blue-700 transition-colors'>
                          <textarea
                            {...register("interests")}
                            className='w-full outline-none bg-transparent min-h-[50px]'
                            placeholder='Enter interests separated by commas (e.g., backpacking, web development)'
                            name='interests'
                            key={""}
                            id=''></textarea>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Locations
                          <Tooltip title='Specify the geographic areas where you want to target your campaign'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
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
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Employment and Industry
                          <Tooltip title='Define the professional background and industry sectors of your target audience'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
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
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Household Income
                          <Tooltip title="Select the income ranges that match your target audience's financial capacity">
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
                        <div className='flex flex-wrap justify-start gap-4 sm:gap-6 w-[70%] p-3'>
                          {[
                            { value: "0 - 19,999", label: "£0-19,999" },
                            { value: "20,000 - 39,999", label: "£20,000-£39,999" },
                            { value: "40,000 - 59,999", label: "£40,000-£59,999" },
                            { value: "60,000 - 79,999", label: "£60,000-£79,999" },
                            { value: "80,000 - 99,999", label: "£80,000-£99,999" },
                            { value: "100,000+", label: "£100,000+" },
                          ].map((income) => (
                            <FormControlLabel
                              key={income.value}
                              control={
                                <Checkbox
                                  {...register("householdIncome")}
                                  value={income.value}
                                  defaultChecked
                                  sx={{
                                    color: blue[800],
                                    "&.Mui-checked": {
                                      color: blue[600],
                                    },
                                  }}
                                />
                              }
                              label={income.label}
                              className='text-blue-300 text-sm sm:text-base'
                            />
                          ))}
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-lg font-medium text-blue-300 flex items-center gap-2'>
                          Marital Status
                          <Tooltip title='Choose the marital status categories that best represent your target audience'>
                            <InfoIcon className='text-blue-400 cursor-help' fontSize='small' />
                          </Tooltip>
                        </label>
                        <div className='flex flex-wrap justify-start gap-4 sm:gap-6 w-[70%] p-3'>
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
                              className='text-blue-300 text-sm sm:text-base'
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className='w-full pt-4 border-t border-gray-600 flex justify-center gap-3 sm:justify-start'>
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
                  <div className='flex flex-col justify-center items-center h-full'>
                    <div className='w-full border-b border-gray-600 pb-4 text-center'>
                      <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-400'>Review & Submit</h1>
                      <p className='text-gray-400 mt-2 text-sm'>Step 3 of 3: Final Confirmation</p>
                    </div>
                    <div className='w-full flex flex-col text-center gap-4 sm:gap-6 my-8 sm:my-12'>
                      <h1 className='text-5xl duration-1000 font-bold text-blue-300'>Your Campaign is Ready for Analysis</h1>
                      <h3 className='text-2xl font-light text-gray-300'>Click submit to generate your market research report with actionable insights</h3>
                    </div>
                    <button
                      onClick={async () => {
                        setVisible(false);
                        await finalSubmit();
                      }}
                      className='bg-blue-600 px-12 transition-all duration-500 hover:bg-blue-500 hover:px-16 py-4 rounded-xl font-medium text-lg'>
                      <div className='relative flex items-center justify-center h-6'>
                        <span className={`absolute transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>Generate Report</span>
                        <div
                          className={`absolute transition-opacity duration-300 ${
                            visible ? "opacity-0" : "opacity-100"
                          } animate-spin rounded-full h-6 w-6 border-b-2 border-white`}></div>
                      </div>
                    </button>
                  </div>
                );
            }
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
