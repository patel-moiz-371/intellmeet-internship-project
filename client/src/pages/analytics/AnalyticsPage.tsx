import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Area, AreaChart,
} from "recharts";

// ─── Dummy Data ────────────────────────────────────────────────────────────────

const meetingsPerWeek = [
  { week: "W1 Jan", meetings: 34, participants: 142 },
  { week: "W2 Jan", meetings: 41, participants: 189 },
  { week: "W3 Jan", meetings: 38, participants: 167 },
  { week: "W4 Jan", meetings: 55, participants: 231 },
  { week: "W1 Feb", meetings: 47, participants: 203 },
  { week: "W2 Feb", meetings: 62, participants: 278 },
  { week: "W3 Feb", meetings: 58, participants: 249 },
  { week: "W4 Feb", meetings: 71, participants: 312 },
  { week: "W1 Mar", meetings: 66, participants: 289 },
  { week: "W2 Mar", meetings: 79, participants: 341 },
  { week: "W3 Mar", meetings: 84, participants: 367 },
  { week: "W4 Mar", meetings: 91, participants: 398 },
];

const taskCompletion = [
  { dept: "Engineering", completed: 87, pending: 13, overdue: 6 },
  { dept: "Design",      completed: 74, pending: 18, overdue: 4 },
  { dept: "Marketing",   completed: 92, pending: 7,  overdue: 2 },
  { dept: "Product",     completed: 68, pending: 24, overdue: 9 },
  { dept: "Sales",       completed: 81, pending: 14, overdue: 5 },
  { dept: "Support",     completed: 95, pending: 4,  overdue: 1 },
];

const stats = [
  { title: "Total Meetings",      value: "1,284", subtitle: "This quarter",       delta: "+12%", up: true,  icon: "M15 10l4.553-2.069A1 1 0 0121 8.882v6.235a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" },
  { title: "Active Users",        value: "9,432", subtitle: "Unique participants", delta: "+5%",  up: true,  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { title: "Avg. Duration",       value: "47m",   subtitle: "Per session",        delta: "-3%",  up: false, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "AI Summaries",        value: "826",   subtitle: "Auto-generated",     delta: "+18%", up: true,  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { title: "Task Completion",     value: "83%",   subtitle: "Across all teams",   delta: "+7%",  up: true,  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { title: "Dropped Sessions",    value: "14",    subtitle: "This week",          delta: "+2",   up: false, icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

type Range = "1M" | "3M" | "6M" | "1Y";

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1526] border border-white/10 rounded-xl px-4 py-3 shadow-2xl text-sm">
      <p className="text-white/50 mb-2 text-xs font-medium uppercase tracking-wider">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/70 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ s }: { s: typeof stats[0] }) {
  return (
    <div className="relative bg-[#0d1526] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-4 group hover:border-white/[0.14] transition-all duration-300 overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
          </svg>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${s.up ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
          {s.delta}
        </span>
      </div>
      <div className="text-3xl font-semibold text-white tracking-tight">{s.value}</div>
      <div>
        <p className="text-sm font-medium text-white/75">{s.title}</p>
        <p className="text-xs text-white/35 mt-0.5">{s.subtitle}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-white/40 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── Range Selector ────────────────────────────────────────────────────────────

function RangeSelector({ active, onChange }: { active: Range; onChange: (r: Range) => void }) {
  const ranges: Range[] = ["1M", "3M", "6M", "1Y"];
  return (
    <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
      {ranges.map(r => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
            active === r ? "bg-indigo-500 text-white shadow" : "text-white/40 hover:text-white/70"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("3M");

  const sliceMap: Record<Range, number> = { "1M": 4, "3M": 12, "6M": 12, "1Y": 12 };
  const chartData = meetingsPerWeek.slice(-sliceMap[range]);

  return (
    <div className="min-h-screen bg-[#070e1c] text-white font-sans">
      {/* Top Nav */}
      <header className="border-b border-white/[0.06] px-8 py-4 flex items-center justify-between sticky top-0 z-10 bg-[#070e1c]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.235a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight">IntellMeet</span>
          <span className="text-white/20 text-sm mx-1">/</span>
          <span className="text-sm text-white/50">Analytics</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-lg">Q1 2025</span>
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xs font-semibold text-indigo-300">JD</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Analytics Overview</h1>
          <p className="text-sm text-white/40 mt-1">Track meeting activity, task performance, and engagement across your workspace.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
          {stats.map(s => <StatCard key={s.title} s={s} />)}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">

          {/* Line Chart — Meetings per Week */}
          <div className="xl:col-span-3 bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <SectionHeader
                title="Meeting Activity"
                subtitle="Weekly sessions and total participants"
              />
              <RangeSelector active={range} onChange={setRange} />
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="meetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="partGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={7}
                  wrapperStyle={{ paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.5)" }}
                />
                <Area type="monotone" dataKey="meetings" stroke="#6366f1" strokeWidth={2} fill="url(#meetGrad)" dot={false} activeDot={{ r: 4, fill: "#6366f1" }} />
                <Area type="monotone" dataKey="participants" stroke="#34d399" strokeWidth={2} fill="url(#partGrad)" dot={false} activeDot={{ r: 4, fill: "#34d399" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart — Task Completion */}
          <div className="xl:col-span-2 bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6">
            <SectionHeader
              title="Task Completion"
              subtitle="By department this quarter"
            />
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={taskCompletion} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="dept" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Legend
                  iconType="circle"
                  iconSize={7}
                  wrapperStyle={{ paddingTop: 16, fontSize: 12, color: "rgba(255,255,255,0.5)" }}
                />
                <Bar dataKey="completed" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="pending"   stackId="a" fill="rgba(99,102,241,0.3)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="overdue"   stackId="a" fill="rgba(248,113,113,0.5)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Table — Recent Meetings */}
        <div className="bg-[#0d1526] border border-white/[0.07] rounded-2xl p-6">
          <SectionHeader title="Recent Meetings" subtitle="Last 7 sessions across all workspaces" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Meeting", "Host", "Participants", "Duration", "Tasks", "Status"].map(h => (
                    <th key={h} className="text-left text-xs text-white/30 font-medium pb-3 pr-6 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {[
                  { name: "Q1 Planning Sync",       host: "Aria Chen",     participants: 12, duration: "1h 14m", tasks: 8,  status: "Completed" },
                  { name: "Design Review — v2.4",   host: "Marcus Webb",   participants: 5,  duration: "42m",    tasks: 4,  status: "Completed" },
                  { name: "Sprint Retrospective",   host: "Priya Nair",    participants: 9,  duration: "58m",    tasks: 11, status: "In Review" },
                  { name: "Investor Brief Prep",    host: "James Okafor",  participants: 3,  duration: "1h 02m", tasks: 6,  status: "Completed" },
                  { name: "Customer Onboarding",    host: "Sofia Reyes",   participants: 7,  duration: "35m",    tasks: 3,  status: "Pending" },
                  { name: "Engineering Standup",    host: "Liam Park",     participants: 11, duration: "22m",    tasks: 5,  status: "Completed" },
                  { name: "Marketing OKR Review",   host: "Natalie Brooks", participants: 6, duration: "1h 28m", tasks: 9,  status: "In Review" },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-6 font-medium text-white/80">{row.name}</td>
                    <td className="py-3.5 pr-6 text-white/50">{row.host}</td>
                    <td className="py-3.5 pr-6 text-white/50">{row.participants}</td>
                    <td className="py-3.5 pr-6 text-white/50">{row.duration}</td>
                    <td className="py-3.5 pr-6 text-white/50">{row.tasks}</td>
                    <td className="py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                        row.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" :
                        row.status === "In Review" ? "bg-amber-500/10 text-amber-400" :
                        "bg-white/5 text-white/40"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}