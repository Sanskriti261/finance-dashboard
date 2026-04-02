import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// 🎨 Dynamic color generator (UNLIMITED COLORS)
const getColor = (index) => {
  const hue = (index * 47) % 360;
  return `hsl(${hue}, 65%, 60%)`;
};

// 🔢 Custom label inside pie
const renderCustomLabel = ({ percent }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

const CustomPieChart = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex items-center justify-between w-full">

      {/* 🥧 Chart */}
      <ResponsiveContainer width="60%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            label={renderCustomLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColor(index)}   // ✅ dynamic color
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `₹${value}`}
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* 📋 Custom Legend */}
      <div className="w-[40%] space-y-4">
        {data.map((item, index) => {
          const percentage = total
            ? ((item.value / total) * 100).toFixed(0)
            : 0;

          return (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {/* 🎨 Color Dot (MATCHES CHART) */}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(index) }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {item.name}
                </span>
              </div>

              {/* 📊 Percentage */}
              <span className="text-sm font-semibold">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CustomPieChart;