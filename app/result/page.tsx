"use client";

import DemoSlider from "@/my-components/DemoSlider";
import { useEffect, useState } from "react";

// want to get user profiles as a slider on this page
// want to get their individual responses within their slides
// guess this bit should be an array of objects which have all the user details and the user answers all in one
// want to separate out the different responses, aggregate the numericals and parse the qualitiative through another gemini model

interface Result {
  demographicProfiles: {
    id: number; //need to actually code this in
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
    <div className='max-w-2xl mx-auto p-4 bg-black'>
      <h1 className='text-2xl font-bold mb-4'>Feedback Results</h1>
      <div className='space-y-6'>
        <div>
          <DemoSlider data={result.demographicProfiles} />
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
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>What Users Like</h2>
          <ul className='list-disc pl-5 mt-2'>
            {result.whatUsersLike.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Pain Points</h2>
          <ul className='list-disc pl-5 mt-2'>
            {result.painPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
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
              <strong>Would Buy:</strong>
            </p>
            <ul className='list-disc pl-5 mt-2'>
              {result.wouldBuy.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>reason:</strong>
            </p>
            <ul className='list-disc pl-5 mt-2'>
              {result.reason.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Barriers for Adoption</h2>
          <ul className='list-disc pl-5 mt-2'>
            {result.barrierForAdoption.map((barrier, i) => (
              <li key={i}>{barrier}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Suggested Improvements</h2>
          <ul className='list-disc pl-5 mt-2'>
            {result.suggestedImprovements.map((improvement, i) => (
              <li key={i}>{improvement}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Additional Feedback</h2>
          <ul className='list-disc pl-5 mt-2'>
            {result.additionalFeedback.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
