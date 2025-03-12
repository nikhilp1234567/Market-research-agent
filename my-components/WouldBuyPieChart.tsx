import React from "react";
import { PieChart, Pie, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface WouldBuyPieChartProps {
  data: boolean[] | undefined;
}
function WouldBuyPieChart({ data }: WouldBuyPieChartProps) {
  const numWouldBuy = data!.filter((i) => String(i) == "true").length;
  const numWouldntBuy = data!.filter((i) => String(i) == "false").length;

  const processedSentimentData = [
    { name: "Would Use", value: numWouldBuy },
    { name: "Wouldn't Use", value: numWouldntBuy },
  ];

  return (
    <ResponsiveContainer width='100%' height={500} style={{ outline: "1px solid white", borderRadius: "2rem" }}>
      <PieChart width={500} height={500} data={processedSentimentData} margin={{ top: 30, bottom: 30, right: 30 }}>
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <XAxis dataKey='name' label={{ value: "sentiment", position: "insideBottom", offset: -10 }} />
        <YAxis label={{ value: "quantity", angle: -90 }} />
        <Pie dataKey='value' fill='#8884d8' />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default WouldBuyPieChart;
