"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface sentimentGraphProps {
  data: string[] | undefined;
}

function SentimentGraph({ data }: sentimentGraphProps) {
  const badOption = data!.filter((i) => i == "bad").length;
  const numNeutral = data!.filter((i) => i == "neutral").length;
  const goodOption = data!.filter((i) => i == "good").length;

  const processedSentimentData = [
    { name: "bad", value: badOption },
    { name: "neutral", value: numNeutral },
    { name: "good", value: goodOption },
  ];
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart data={processedSentimentData}>
        <XAxis dataKey='name' label={{ value: "", position: "insideBottom", offset: -10 }} />
        <YAxis label={{ value: "quantity", angle: -90 }} />
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
    // </div>
  );
}

export default SentimentGraph;
