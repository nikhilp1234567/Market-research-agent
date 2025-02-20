"use client";

import { useEffect, useState } from "react";

interface Result {
  summary: string;
  strengths: string[];
  improvements: string[];
}

export default function ResultPage() {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");
    if (data) {
      setResult(JSON.parse(decodeURIComponent(data)) as Result);
    }
  }, []);

  if (!result) {
    return <div>Loading results...</div>;
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Feedback Results</h1>
      <div className='space-y-4'>
        <div>
          <h2 className='font-semibold'>Summary:</h2>
          <p className='text-white'>{result}</p>
        </div>
      </div>
    </div>
  );
}
