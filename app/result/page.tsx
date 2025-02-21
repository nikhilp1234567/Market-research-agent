"use client";

import { useEffect, useState } from "react";

interface Result {
  overallSatisfactionScore: number;
  likelihoodToUse: number;
  easeOfUse: number;
  valueForMoney: number;
  comparisonToAlternatives: string;
  mostLikedFeatures: string;
  areasForImprovement: string;
  painPoints: string;
  targetAudienceFit: string;
  suggestionsForEnhancement: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");
    if (data) {
      const parsed = JSON.parse(JSON.parse(decodeURIComponent(data)));

      setResult(parsed as Result);
    }
  }, []);

  if (!result) {
    return <div>Loading results...</div>;
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <div className='space-y-6'>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Overall Satisfaction</h2>
          <p className='text-white'>{result?.overallSatisfactionScore}/10</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Likelihood to Use</h2>
          <p className='text-white'>{result?.likelihoodToUse}/10</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Ease of Use</h2>
          <p className='text-white'>{result?.easeOfUse}/10</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Value for Money</h2>
          <p className='text-white'>{result?.valueForMoney}/10</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Comparison to Alternatives</h2>
          <p className='text-white'>{result?.comparisonToAlternatives}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Most Liked Features</h2>
          <p className='text-white'>{result?.mostLikedFeatures}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Areas for Improvement</h2>
          <p className='text-white'>{result?.areasForImprovement}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Pain Points</h2>
          <p className='text-white'>{result?.painPoints}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Target Audience Fit</h2>
          <p className='text-white'>{result?.targetAudienceFit}</p>
        </div>
        <div>
          <h2 className='text-xl font-bold text-white mb-2'>Suggestions for Enhancement</h2>
          <p className='text-white'>{result?.suggestionsForEnhancement}</p>
        </div>
      </div>
    </div>
  );
}
