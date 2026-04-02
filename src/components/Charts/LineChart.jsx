import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>

        {/*  Gradient for shadow */}
        <defs>
          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/*  Grid (lighter & cleaner) */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />

        {/*  X Axis */}
        <XAxis
          dataKey="month"
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        {/*  Y Axis (FIXED) */}
        <YAxis
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        {/*  Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#111827",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
          }}
          cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
        />

        {/*  Area (shadow fill) */}
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#3b82f6"
          strokeWidth={3}
          fill="url(#colorBalance)"
          dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6 }}
        />

      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;