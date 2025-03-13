import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface MarketFitRadialPieChartProps {
  data: boolean[] | undefined;
}

const COLORS = ["#0088FE", "#00C49F"];

export default function MarketFitRadialPieChart({ data }: MarketFitRadialPieChartProps) {
  const processedData = data
    ? [
        { name: "Good Fit", value: data.filter((val) => val === true).length },
        { name: "Poor Fit", value: data.filter((val) => val === false).length },
      ]
    : [];

  return (
    <ResponsiveContainer width='100%' height={500} style={{ outline: "1px solid white", borderRadius: "2rem" }}>
      <PieChart width={500} height={500} margin={{ top: 30, bottom: 30, right: 30 }}>
        <Pie
          data={processedData}
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={120}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='value'
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text x={x} y={y} fill='#fff' textAnchor={x > cx ? "start" : "end"} dominantBaseline='central'>
                {processedData[index].name} ({value})
              </text>
            );
          }}>
          {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
