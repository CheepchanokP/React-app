/* import React from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2020612,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1884063,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 2620690,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 2127671,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 2004480,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 2484091,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 2090789,
    amt: 5602100,
  },
];

function MarketChart({title}) {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MarketChart;
 */