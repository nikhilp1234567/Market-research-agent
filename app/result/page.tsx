"use client";

import DemoSlider from "@/my-components/DemoSlider";
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
          <div id='left' className='w-[50%] h-full overflow-auto border border-white rounded-[2rem]'>
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
          <div id='right' className='flex flex-col gap-6 rounded-[2rem] h-full overflow-auto border border-white items-center w-[50%]'>
            <h1 className='text-xl font-semibold'>Aggregated results</h1>
            <div className='flex gap-3 flex-col w-[90%] items-center'>
              <h2 className='text-xl text-left font-semibold'>Overall Sentiment</h2>
              <SentimentGraph data={result.sentiment} />
            </div>
            <div className='flex gap-3 flex-col items-center w-[90%]'>
              {/* need to sort out the styling for this one in the acutal component */}
              <h2 className='text-xl font-semibold'>Market Fit</h2>
              <MarketFitRadialPieChart data={result.goodFitForMarket} />
            </div>
            <div className='flex gap-3 flex-col items-center'>
              <h2 className='text-xl font-semibold'>What Users Like</h2>
              {summarisedWhatUsersLike ? (
                summarisedWhatUsersLike
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
                  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'>
                  Click to summarise what the users liked.
                </button>
              )}
            </div>
            <div className='flex gap-3 flex-col items-center'>
              <h2 className='text-xl font-semibold'>Pain Points</h2>
              {summarisedPainPoints ? (
                summarisedPainPoints
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
                  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'>
                  Click to summarise the generated pain points.
                </button>
              )}
            </div>
            <div>
              <h2 className='text-xl font-semibold'>Pricing Insights</h2>
            </div>
            <div className='w-[90%]'>
              <p>
                <strong>Willingness to Pay:</strong>
              </p>
              <PricingLineGraph data={result.willingnessToPay} />
            </div>
            <div className='w-[90%]'>
              <p>
                <strong>Would Use:</strong>
              </p>
              <WouldBuyPieChart data={result.wouldBuy} />
            </div>
            <div className='w-[90%]'>
              <p>
                <strong>reason:</strong>
              </p>
              {summarisedReason ? (
                summarisedReason
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
                  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'>
                  Click to summarise what the users liked.
                </button>
              )}
            </div>
            <div>
              <h1>Further Feedback</h1>
            </div>
            <div>
              {" "}
              <h2 className='text-xl font-semibold'>Suggested Improvements</h2>
              {summarisedSuggestedImprovements ? (
                summarisedSuggestedImprovements
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
                  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'>
                  Click to summarise suggested improvements
                </button>
              )}
            </div>
            <div>
              <h2 className='text-xl font-semibold'>Additional Feedback</h2>
              {summarisedAdditionalFeedback ? (
                summarisedAdditionalFeedback
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
                  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4'>
                  Click to summarise additional feedback
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// <div className='space-y-6'>
//   <div>
//     <h2 className='text-xl font-semibold'>Barriers for Adoption</h2>
//     <ul className='list-disc pl-5 mt-2'>
//       {result.barrierForAdoption.map((barrier, i) => (
//         <li key={i}>{`${barrier}`}</li>
//       ))}
//     </ul>
//   </div>
// </div>
