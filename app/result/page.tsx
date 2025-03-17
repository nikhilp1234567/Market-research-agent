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
  goodFitForMarket: boolean[];
  whatUsersLike: string[];
  painPoints: string[];
  willingnessToPay: number[];
  wouldBuy: boolean[];
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

  useEffect(() => {
    const processedData = JSON.parse(localStorage.getItem("searchData") || "null");
    if (processedData != "null") {
      setResult(processedData as Result);
    }
  }, []);

  if (!result) {
    return <div>Loading results...</div>;
  }

  return (
    <div id='black-background' className='flex flex-col w-full h-[calc(100vh-4rem)] overflow-hidden bg-black pb-6 px-6 pt-3'>
      <div id='blue-holder' style={{ backgroundColor: "#070F2B", borderRadius: "0.75rem" }} className='p-6 flex gap-6 overflow-hidden flex-col w-full h-full'>
        <h1 className='text-2xl text-center font-bold'>Feedback Results</h1>
        <div id='content-holder' className='flex gap-3 flex-row w-full h-[calc(100%-3rem)]'>
          <div id='left' className='flex flex-col p-3 w-[50%] h-full border border-white rounded-[2rem]'>
            <div className='w-full h-[50%]'>
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
              />
            </div>
            <div className='bg-black flex h-full max-w-full mt-3 border justify-center items-center rounded-[2rem]'>
              Results should appear here on button click above
            </div>
          </div>

          <div id='right' className='flex flex-col rounded-[2rem] h-full p-3 border border-white w-[50%]'>
            <Swiper slidesPerView={1} navigation className='w-full h-full' loop={true} modules={[Navigation, Pagination]}>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Overall Sentiment</h2>
                <SentimentGraph data={result.sentiment} />
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Overall Market Fit</h2>
                <MarketFitRadialPieChart data={result.goodFitForMarket} />
              </SwiperSlide>
              <SwiperSlide className='max-w-full h-full flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center h-6 font-semibold mb-4'>What Users Like</h2>
                <div className='w-full h-[calc(100%-2.5rem)] flex-1 bg-black border rounded-[2rem] flex flex-col !items-center !justify-center'>
                  {summarisedWhatUsersLike ? (
                    <div className=' w-full px-16 justify-center'>
                      <p className='text-2xl font-bold'>What Users Liked:</p>
                      <br />
                      {summarisedWhatUsersLike}
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const response = await axios.post("/api/summarise", {
                            data: result.whatUsersLike,
                          });
                          setSummarisedwhatUsersLike(String(response.data));
                        } catch (error) {
                          console.error("Error aggregating data:", error);
                        }
                      }}
                      className='bg-black h-full text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                      Click to summarise what the users liked.
                    </button>
                  )}
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Pain Points</h2>
                <div className='w-full h-[calc(100%-2.5rem)] flex-1 bg-black border rounded-[2rem] flex flex-col !items-center !justify-center'>
                  {summarisedPainPoints ? (
                    <div className='w-full px-16 justify-center'>
                      <p className='text-2xl font-bold'>Pain Points:</p>
                      <br />
                      {summarisedPainPoints}
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const response = await axios.post("/api/summarise", {
                            data: result.painPoints,
                          });
                          setSummarisedPainPoints(String(response.data));
                        } catch (error) {
                          console.error("Error aggregating data:", error);
                        }
                      }}
                      className='bg-black h-full text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                      Click to summarise the generated pain points.
                    </button>
                  )}
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Willingness to Pay</h2>
                <div className='w-full h-full'>
                  <PricingLineGraph data={result.willingnessToPay} />
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Would Use</h2>
                <div className='w-full h-full'>
                  <WouldBuyPieChart data={result.wouldBuy} />
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Reason for Buying Decision</h2>
                <div className='w-full h-[calc(100%-2.5rem)] flex-1 bg-black border rounded-[2rem] flex flex-col !items-center !justify-center'>
                  {summarisedReason ? (
                    <div className='w-full px-16 justify-center'>
                      <p className='text-2xl font-bold'>Reasons:</p>
                      <br />
                      {summarisedReason}
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const response = await axios.post("/api/summarise", {
                            data: result.reason,
                          });
                          setSummarisedReason(String(response.data));
                        } catch (error) {
                          console.error("Error aggregating data:", error);
                        }
                      }}
                      className='bg-black h-full text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                      Click to summarise the reasons.
                    </button>
                  )}
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Suggested Improvements</h2>
                <div className='w-full h-[calc(100%-2.5rem)] flex-1 bg-black border rounded-[2rem] flex flex-col !items-center !justify-center'>
                  {summarisedSuggestedImprovements ? (
                    <div className='w-full px-16 justify-center'>
                      <p className='text-2xl font-bold'>Suggested Improvements:</p>
                      <br />
                      {summarisedSuggestedImprovements}
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const response = await axios.post("/api/summarise", {
                            data: result.suggestedImprovements,
                          });
                          setSummarisedSuggestedImprovements(String(response.data));
                        } catch (error) {
                          console.error("Error aggregating data:", error);
                        }
                      }}
                      className='bg-black h-full text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                      Click to summarise suggested improvements
                    </button>
                  )}
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Additional Feedback</h2>
                <div className='w-full h-[calc(100%-2.5rem)] flex-1 bg-black border rounded-[2rem] flex flex-col !items-center !justify-center'>
                  {summarisedAdditionalFeedback ? (
                    <div className='w-full px-16 justify-center'>
                      <p className='text-2xl font-bold'>Additional Feedback:</p>
                      <br />
                      {summarisedAdditionalFeedback}
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const response = await axios.post("/api/summarise", {
                            data: result.additionalFeedback,
                          });
                          setSummarisedAdditionalFeedback(String(response.data));
                        } catch (error) {
                          console.error("Error aggregating data:", error);
                        }
                      }}
                      className='bg-black h-full text-white w-full rounded-[2rem] px-4 py-2 border duration-300 hover:bg-gray-600'>
                      Click to summarise additional feedback
                    </button>
                  )}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
