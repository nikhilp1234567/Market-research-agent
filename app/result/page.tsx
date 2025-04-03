"use client";

import DemoSlider from "@/my-components/DemoSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import SentimentGraph from "@/my-components/SentimentGraph";
import PricingLineGraph from "@/my-components/PricingLineGraph";
import WouldBuyPieChart from "@/my-components/WouldBuyPieChart";
import MarketFitRadialPieChart from "@/my-components/MarketFitRadialPieChart";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { duration } from "@mui/material";

interface Result {
  demographicProfiles: {
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
}

export default function ResultPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [summarisedPainPoints, setSummarisedPainPoints] = useState("");
  const [summarisedWhatUsersLike, setSummarisedwhatUsersLike] = useState("");
  const [summarisedReason, setSummarisedReason] = useState("");
  const [summarisedSuggestedImprovements, setSummarisedSuggestedImprovements] = useState("");
  const [summarisedAdditionalFeedback, setSummarisedAdditionalFeedback] = useState("");
  const [selectedData, setSelectedData] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const processedData = JSON.parse(localStorage.getItem("searchData") || "null");

    if (!processedData || typeof processedData !== "object") {
      console.warn("Invalid or missing data in localStorage:", processedData);
      router.push("/");
      return;
    }

    if (!processedData.whatUsersLike) {
      console.warn("Missing 'whatUsersLike' field in data:", processedData);
      router.push("/");
      return;
    }

    if (processedData != "null") {
      setResult(processedData as Result);

      // Make POST request for all summaries
      const summaryFields = [
        { data: processedData.whatUsersLike, setter: setSummarisedwhatUsersLike },
        { data: processedData.painPoints, setter: setSummarisedPainPoints },
        { data: processedData.reason, setter: setSummarisedReason },
        { data: processedData.suggestedImprovements, setter: setSummarisedSuggestedImprovements },
        { data: processedData.additionalFeedback, setter: setSummarisedAdditionalFeedback },
      ];

      summaryFields.forEach(async (field) => {
        try {
          const response = await axios.post("/api/summarise", { data: field.data });
          field.setter(String(response.data));
        } catch (error) {
          console.error("Error aggregating data:", error);
        }
      });
    }
  }, [router]);

  if (!result) {
    return (
      <div id='black-background' className='flex flex-col w-full h-[calc(100vh-5rem)] justify-center items-center bg-black p-3'>
        <p className='mb-4'>Loading results...</p>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400'></div>
      </div>
    );
  }

  return (
    <div id='black-background' className='flex flex-col w-full h-[calc(100vh-5rem)] bg-black p-3'>
      <div id='blue-holder' style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }} className='p-6 flex gap-6 overflow-hidden flex-col w-full h-full'>
        <h1 className='text-2xl text-center font-bold'>Feedback Results</h1>
        <div id='content-holder' className='flex gap-3 flex-row w-full h-[calc(100%-3rem)]'>
          <motion.div
            id='left'
            className='flex flex-col p-3 w-[50%] h-full border border-white rounded-[2rem]'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <div className='w-full h-1/2'>
              <DemoSlider
                demographicData={result.demographicProfiles}
                responseData={{
                  sentiment: result.sentiment,
                  goodFitForMarket: result.goodFitForMarket,
                  whatUsersLike: result.whatUsersLike,
                  painPoints: result.painPoints,
                  willingnessToPay: result.willingnessToPay,
                  wouldBuy: result.wouldBuy,
                  reason: result.reason,
                  barrierForAdoption: result.barrierForAdoption,
                  suggestedImprovements: result.suggestedImprovements,
                  additionalFeedback: result.additionalFeedback,
                }}
                onDataSelect={setSelectedData}
              />
            </div>
            <div className='flex-1 w-full bg-black mt-3 border rounded-[2rem] p-4 flex items-center justify-center'>
              {selectedData ? (
                <div className='text-white text-center'>
                  <p className='text-lg font-semibold mb-2'>Selected Data:</p>
                  <p className='text-xl'>{selectedData}</p>
                </div>
              ) : (
                <p className='text-white text-center'>Click any button above to view the data</p>
              )}
            </div>
          </motion.div>

          <motion.div
            id='right'
            className='flex flex-col rounded-[2rem] h-full p-3 border justify-center items-center border-white w-[50%]'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <Swiper
              slidesPerView={1}
              navigation
              className='w-full h-full flex'
              loop={true}
              modules={[Navigation, Autoplay, Pagination]}
              autoplay={{ delay: 5000 }}>
              <SwiperSlide className='flex w-full h-full items-center justify-center'>
                <div className='flex flex-col h-full items-center px-6 w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>Overall Sentiment</h2>
                  <SentimentGraph data={result.sentiment} />
                </div>
              </SwiperSlide>

              <SwiperSlide className='flex items-center justify-center'>
                <div className='flex flex-col h-full items-center px-6 w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>Overall Market Fit</h2>
                  <MarketFitRadialPieChart data={result.goodFitForMarket} />
                </div>
              </SwiperSlide>

              <SwiperSlide className='flex items-center justify-center'>
                <div className='flex flex-col items-center w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>What Users Like</h2>
                  <div className='w-full bg-black border rounded-[2rem] flex flex-col items-center justify-center p-6'>
                    {summarisedWhatUsersLike ? (
                      <div className='w-full px-16'>
                        <p className='text-2xl font-bold'>What Users Liked:</p>
                        <br />
                        {summarisedWhatUsersLike}
                      </div>
                    ) : (
                      <button
                        onClick={async () => {
                          try {
                            const response = await axios.get("/api/summarise", {
                              params: { data: JSON.stringify(result.whatUsersLike) },
                            });
                            setSummarisedwhatUsersLike(String(response.data));
                          } catch (error) {
                            console.error("Error aggregating data:", error);
                          }
                        }}
                        className='bg-black text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                        Click to summarise what the users liked.
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className='flex items-center justify-center'>
                <div className='flex flex-col items-center w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>Pain Points</h2>
                  <div className='w-full bg-black border rounded-[2rem] flex flex-col items-center justify-center p-6'>
                    {summarisedPainPoints ? (
                      <div className='w-full px-16'>
                        <p className='text-2xl font-bold'>Pain Points:</p>
                        <br />
                        {summarisedPainPoints}
                      </div>
                    ) : (
                      <button
                        onClick={async () => {
                          try {
                            const response = await axios.get("/api/summarise", {
                              params: { data: JSON.stringify(result.painPoints) },
                            });
                            setSummarisedPainPoints(String(response.data));
                          } catch (error) {
                            console.error("Error aggregating data:", error);
                          }
                        }}
                        className='bg-black text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                        Click to summarise the generated pain points.
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className='flex items-center justify-center'>
                <div className='flex flex-col h-full items-center px-6 w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>Willingness to Pay</h2>
                  <PricingLineGraph data={result.willingnessToPay} />
                </div>
              </SwiperSlide>

              <SwiperSlide className='flex items-center justify-center'>
                <div className='flex flex-col h-full items-center px-6 w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>Would Use</h2>
                  <WouldBuyPieChart data={result.wouldBuy} />
                </div>
              </SwiperSlide>

              <SwiperSlide className='flex items-center justify-center'>
                <div className='flex flex-col items-center w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>Reason for Buying Decision</h2>
                  <div className='w-full bg-black border rounded-[2rem] flex flex-col items-center justify-center p-6'>
                    {summarisedReason ? (
                      <div className='w-full px-16'>
                        <p className='text-2xl font-bold'>Reasons:</p>
                        <br />
                        {summarisedReason}
                      </div>
                    ) : (
                      <button
                        onClick={async () => {
                          try {
                            const response = await axios.get("/api/summarise", {
                              params: { data: JSON.stringify(result.reason) },
                            });
                            setSummarisedReason(String(response.data));
                          } catch (error) {
                            console.error("Error aggregating data:", error);
                          }
                        }}
                        className='bg-black text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                        Click to summarise the reasons.
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className='flex items-center justify-center'>
                <div className='flex flex-col items-center w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>Suggested Improvements</h2>
                  <div className='w-full bg-black border rounded-[2rem] flex flex-col items-center justify-center p-6'>
                    {summarisedSuggestedImprovements ? (
                      <div className='w-full px-16'>
                        <p className='text-2xl font-bold'>Suggested Improvements:</p>
                        <br />
                        {summarisedSuggestedImprovements}
                      </div>
                    ) : (
                      <button
                        onClick={async () => {
                          try {
                            const response = await axios.get("/api/summarise", {
                              params: { data: JSON.stringify(result.suggestedImprovements) },
                            });
                            setSummarisedSuggestedImprovements(String(response.data));
                          } catch (error) {
                            console.error("Error aggregating data:", error);
                          }
                        }}
                        className='bg-black text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                        Click to summarise suggested improvements
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className='flex items-center justify-center'>
                <div className='flex flex-col items-center w-full'>
                  <h2 className='text-xl text-center font-semibold mb-4'>Additional Feedback</h2>
                  <div className='w-full bg-black border rounded-[2rem] flex flex-col items-center justify-center p-6'>
                    {summarisedAdditionalFeedback ? (
                      <div className='w-full px-16'>
                        <p className='text-2xl font-bold'>Additional Feedback:</p>
                        <br />
                        {summarisedAdditionalFeedback}
                      </div>
                    ) : (
                      <button
                        onClick={async () => {
                          try {
                            const response = await axios.get("/api/summarise", {
                              params: { data: JSON.stringify(result.additionalFeedback) },
                            });
                            setSummarisedAdditionalFeedback(String(response.data));
                          } catch (error) {
                            console.error("Error aggregating data:", error);
                          }
                        }}
                        className='bg-black text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                        Click to summarise additional feedback
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
