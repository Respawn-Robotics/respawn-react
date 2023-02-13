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
        left: 20,
        bottom: 5
      }}
    >
      <XAxis dataKey="name" stroke="#FFFFFF" padding={{ left: 30, right: 30 }}/>
      <YAxis stroke="#FFFFFF"/>
      <Tooltip /> 
      <Legend />
      <Line
        type="linear"
        dataKey="points"
        stroke="#e96824"
      />
    </LineChart>
  );
}

function SimpleRadialChart ({ width, height }) {
  let data = [
    {
      subject: 'Math',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Chinese',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'English',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Geography',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Physics',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'History',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  return (
    <RadarChart
      width={width}
      height={height}
      data={data}
    >
      <PolarGrid stroke="#FFFFFF"/>
      <PolarAngleAxis dataKey="subject" stroke="#FFFFFF"/>
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#e96824"
        fill="#e96824"
        fillOpacity={0.65}
      />
    </RadarChart>
  )
}

export { SimpleLineChart, SimpleRadialChart }