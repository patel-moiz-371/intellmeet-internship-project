import MainLayout from "../layouts/MainLayout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const meetingData = [
  { month: "Jan", meetings: 30 },
  { month: "Feb", meetings: 45 },
  { month: "Mar", meetings: 60 },
  { month: "Apr", meetings: 75 },
  { month: "May", meetings: 90 },
];

const productivityData = [
  { name: "Completed", value: 70 },
  { name: "Pending", value: 30 },
];

const COLORS = ["#38bdf8", "#facc15"];

const Analytics = () => {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold text-white mb-6">
        Analytics
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Meetings
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            245
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-gray-400">
            Productivity
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            82%
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6">
          <p className="text-gray-400">
            Active Users
          </p>

          <h2 className="text-4xl font-bold text-sky-400 mt-3">
            1,245
          </h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl text-white font-semibold mb-6">
            Monthly Meetings
          </h2>

          <div className="w-full h-[350px]">
            <ResponsiveContainer>
              <BarChart data={meetingData}>

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                />

                <YAxis stroke="#94a3b8" />

                <Tooltip />

                <Bar
                  dataKey="meetings"
                  fill="#38bdf8"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Pie Chart */}
        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl text-white font-semibold mb-6">
            Task Productivity
          </h2>

          <div className="w-full h-[350px]">
            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={productivityData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {productivityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Analytics;