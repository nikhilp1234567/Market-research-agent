"use client";

import { useEffect, useState } from "react";

interface Result {
  sentiment: string;
  goodFitForMarket: string;
  whatUsersLike: string[];
  painPoints: string[];
  willingnessToPay: string;
  wouldBuy: string;
  barrierForAdoption: string[];
  suggestedImprovements: string[];
  additionalFeedback: string;
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
          <h2 className='text-xl font-semibold'>Overall Sentiment</h2>
          <p className='mt-2'>{result.sentiment}</p>
        </div>

        <div>
          <h2 className='text-xl font-semibold'>Market Fit</h2>
          <p className='mt-2'>{result.goodFitForMarket}</p>
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
              <strong>Willingness to Pay:</strong> {result.willingnessToPay}
            </p>
            <p>
              <strong>Would Buy:</strong> {result.wouldBuy}
            </p>
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
          <p className='mt-2'>{result.additionalFeedback}</p>
        </div>
      </div>
    </div>
  );
}
