import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface PricingGraphProps {
  data: number[] | undefined; //this is not right yet
}

function PricingLineGraph({ data }: PricingGraphProps) {
  const average = data && data.length > 0 ? Number(data.reduce((accumulator, current) => accumulator + current, 0)) / data.length : 0;
  const processedWillingnessToPlay = [
    {
      average: average,
    },
  ];
  return (
    <ResponsiveContainer width='100%' height={500} style={{ outline: "1px solid white", borderRadius: "2rem" }}>
      <LineChart width={500} height={500} margin={{ top: 30, bottom: 30, right: 30 }} data={processedWillingnessToPlay}>
        <XAxis label={{ value: "Willingness to pay", position: "insideBottom", offset: -10 }} />
        <YAxis label={{ value: "quantity", angle: -90 }} />
        <Line dataKey='average'></Line>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PricingLineGraph;
