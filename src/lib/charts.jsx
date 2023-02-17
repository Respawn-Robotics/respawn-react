import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

function SimpleLineChart({ width, height, data }) {
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5,
        right: 30, 
        left: 0,
        bottom: 5
      }}
    >
      <XAxis dataKey="name" stroke="#FFFFFF" padding={{ left: 30, right: 30 }} />
      <YAxis stroke="#FFFFFF" />
      <Tooltip />
      <Legend />
      <Line
        type="linear"
        dataKey="Points"
        stroke="#e96824"
      />
    </LineChart>
  );
}

function SimpleRadialChart({ width, height, data }) {
  return (
    <RadarChart
      width={width}
      height={height}
      data={data}
    >
      <PolarGrid stroke="#FFFFFF" />
      <PolarAngleAxis dataKey="label" stroke="#FFFFFF" />
      <PolarRadiusAxis type="number" angle={90} domain={[0, 100]} />
      <Radar
        name="Rating"
        dataKey="A"
        stroke="#e96824"
        fill="#e96824"
        fillOpacity={0.65}
      />
      <Tooltip />
    </RadarChart>
  )
}

export { SimpleLineChart, SimpleRadialChart }