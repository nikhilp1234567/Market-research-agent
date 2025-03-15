"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface sentimentGraphProps {
  data: string[] | undefined;
}

function SentimentGraph({ data }: sentimentGraphProps) {
  const numNegative = data!.filter((i) => i == "negative").length;
  const numNeutral = data!.filter((i) => i == "neutral").length;
  const numPositive = data!.filter((i) => i == "positive").length;

  const processedSentimentData = [
    { name: "negative", value: numNegative },
    { name: "neutral", value: numNeutral },
    { name: "positive", value: numPositive },
  ];
  return (
    <div className='flex flex-1 bg-black flex-col min-w-full border max-h-full rounded-[2rem] justify-between p-3 items-center'>
      <BarChart width={500} height={500} data={processedSentimentData}>
        <XAxis dataKey='name' label={{ value: "", position: "insideBottom", offset: -10 }} />
        <YAxis label={{ value: "quantity", angle: -90 }} />
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </div>
  );
}

export default SentimentGraph;
