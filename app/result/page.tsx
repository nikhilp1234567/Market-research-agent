"use client";

import DemoSlider from "@/my-components/DemoSlider";
import { useEffect, useState } from "react";
import axios from "axios";

// want to get their individual responses within their slides
// guess this bit should be an array of objects which have all the user details and the user answers all in one
// want to separate out the different responses, aggregate the numericals and parse the qualitiative through another gemini model

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
    setTimeout(() => {
      const processedData = JSON.parse(localStorage.getItem("searchData") || "null");
      setResult(processedData as Result);
    }, 1000);
    return <div>Loading results...</div>;
  }

  return (
    <div className='max-w-2xl mx-auto p-4 bg-black'>
      <h1 className='text-2xl font-bold mb-4'>Feedback Results</h1>
      <div className='space-y-6'>
        <div>
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
        <div>
          <h2 className='text-xl font-semibold'>Overall Sentiment</h2>
          <ul className='list-disc pl-5 mt-2'>
            {result.sentiment.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Market Fit</h2>
          <ul className='list-disc pl-5 mt-2'>
            {result.goodFitForMarket.map((item, i) => (
              <li key={i}>{String(item)}</li>
            ))}
          </ul>
        </div>

        <div>
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

        <div>
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
          <div className='mt-2'>
            <p>
              <strong>Willingness to Pay:</strong>
            </p>
            <ul className='list-disc pl-5 mt-2'>
              {result.willingnessToPay.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>
              <div></div>
              <strong>Would Buy:</strong>
            </p>
            <ul className='list-disc pl-5 mt-2'>
              {result.wouldBuy.map((item, i) => (
                <li key={i}>{String(item)}</li>
              ))}
            </ul>
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
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Barriers for Adoption</h2>
          <ul className='list-disc pl-5 mt-2'>
            {result.barrierForAdoption.map((barrier, i) => (
              <li key={i}>{`${barrier}`}</li>
            ))}
          </ul>
        </div>

        <div>
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
  );
}
