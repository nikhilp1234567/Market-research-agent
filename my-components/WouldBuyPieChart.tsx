import { dividerClasses } from "@mui/material";
import React from "react";
import { PieChart, Pie, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface WouldBuyPieChartProps {
  data: string[] | undefined;
}
function WouldBuyPieChart({ data }: WouldBuyPieChartProps) {
  const numWouldBuy = data!.filter((i) => String(i) == "true").length;
  const numWouldntBuy = data!.filter((i) => String(i) == "false").length;

  const processedSentimentData = [
    { name: "Would Use", value: numWouldBuy },
    { name: "Wouldn't Use", value: numWouldntBuy },
  ];

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart data={processedSentimentData}>
        <Pie
          dataKey='value'
          data={processedSentimentData}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={120}
          fill='#8884d8'
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text x={x} y={y} fill='#fff' textAnchor={x > cx ? "start" : "end"} dominantBaseline='central'>
                {processedSentimentData[index].name} ({value})
              </text>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default WouldBuyPieChart;
