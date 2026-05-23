import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    month: "Jan",
    meetings: 30,
  },
  {
    month: "Feb",
    meetings: 45,
  },
  {
    month: "Mar",
    meetings: 52,
  },
  {
    month: "Apr",
    meetings: 61,
  },
  {
    month: "May",
    meetings: 74,
  },
  {
    month: "Jun",
    meetings: 90,
  },
];

const AnalyticsChart = () => {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 mt-6">
      
      <h2 className="text-2xl font-semibold text-white mb-6">
        Meeting Analytics
      </h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="meetings"
              stroke="#38bdf8"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;