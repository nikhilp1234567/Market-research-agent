import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface PricingGraphProps {
  data: number[] | undefined;
}

function PricingLineGraph({ data }: PricingGraphProps) {
  const processedWillingnessToPay = data
    ? countOccurrences(data).map((count, value) => ({
        value: value,
        count: count,
      }))
    : [];

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart margin={{ top: 30, bottom: 30, right: 30 }} data={processedWillingnessToPay}>
        <XAxis label={{ value: "Willingness to pay (normalised)", position: "insideBottom", offset: -10 }} />
        <YAxis label={{ value: "quantity", angle: -90 }} />
        <Line type='monotone' dataKey='count'></Line>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PricingLineGraph;

function countOccurrences(arr: number[]) {
  const counts = new Array(11).fill(0);
  arr.forEach((num) => {
    if (num >= 0 && num <= 10) {
      counts[num]++;
    }
  });
  return counts;
}
