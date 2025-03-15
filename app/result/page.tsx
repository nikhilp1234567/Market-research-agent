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
            <div className='bg-black flex h-full max-w-full mt-3 border justify-center items-center rounded-[2rem]'>results box</div>
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
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>What Users Like</h2>
                <div className='w-full h-full flex items-center justify-center'>
                  {summarisedWhatUsersLike ? (
                    <p className='text-center'>{summarisedWhatUsersLike}</p>
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
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                      Click to summarise what the users liked.
                    </button>
                  )}
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Pain Points</h2>
                <div className='w-full h-full flex items-center justify-center'>
                  {summarisedPainPoints ? (
                    <p className='text-center'>{summarisedPainPoints}</p>
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
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
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
                <div className='w-full h-full flex items-center justify-center'>
                  {summarisedReason ? (
                    <p className='text-center'>{summarisedReason}</p>
                  ) : (
                    <button
                      onClick={async () => {
                        try {
                          const response = await axios.post("/api/summarise", {
                            data: result.whatUsersLike,
                          });
                          setSummarisedReason(String(response.data));
                        } catch (error) {
                          console.error("Error aggregating data:", error);
                        }
                      }}
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                      Click to summarise what the users liked.
                    </button>
                  )}
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Suggested Improvements</h2>
                <div className='w-full h-full flex items-center justify-center'>
                  {summarisedSuggestedImprovements ? (
                    <p className='text-center'>{summarisedSuggestedImprovements}</p>
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
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                      Click to summarise suggested improvements
                    </button>
                  )}
                </div>
              </SwiperSlide>
              <SwiperSlide className='max-w-full max-h-full  flex flex-col justify-center items-center'>
                <h2 className='text-xl text-center font-semibold mb-4'>Additional Feedback</h2>
                <div className='w-full h-full flex items-center justify-center'>
                  {summarisedAdditionalFeedback ? (
                    <p className='text-center'>{summarisedAdditionalFeedback}</p>
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
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
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
