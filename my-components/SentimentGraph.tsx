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
    <ResponsiveContainer width='100%' height={500} style={{ outline: "1px solid white", borderRadius: "2rem" }}>
      <BarChart width={500} height={500} data={processedSentimentData} margin={{ top: 30, bottom: 30, right: 30 }}>
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <XAxis dataKey='name' label={{ value: "sentiment", position: "insideBottom", offset: -10 }} />
        <YAxis label={{ value: "quantity", angle: -90 }} />
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SentimentGraph;
