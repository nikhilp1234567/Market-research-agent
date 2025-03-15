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
    <div className='flex flex-1 bg-black flex-col min-w-full border max-h-full rounded-[2rem] justify-between p-3 items-center'>
      <LineChart width={500} height={500} margin={{ top: 30, bottom: 30, right: 30 }} data={processedWillingnessToPay}>
        <XAxis label={{ value: "Willingness to pay (normalised)", position: "insideBottom", offset: -10 }} />
        <YAxis label={{ value: "quantity", angle: -90 }} />
        <Line type='monotone' dataKey='count'></Line>
      </LineChart>
    </div>
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
