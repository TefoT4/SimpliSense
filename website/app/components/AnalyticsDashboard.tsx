"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">("daily");

  const dailyData = [
    { name: "Mon", usage: 12 },
    { name: "Tue", usage: 15 },
    { name: "Wed", usage: 8 },
    { name: "Thu", usage: 10 },
    { name: "Fri", usage: 18 },
    { name: "Sat", usage: 5 },
    { name: "Sun", usage: 7 },
  ];

  const weeklyData = [
    { week: "Week 1", usage: 50 },
    { week: "Week 2", usage: 65 },
    { week: "Week 3", usage: 40 },
    { week: "Week 4", usage: 55 },
  ];

  const monthlyData = [
    { month: "Jan", usage: 200 },
    { month: "Feb", usage: 180 },
    { month: "Mar", usage: 220 },
    { month: "Apr", usage: 250 },
    { month: "May", usage: 300 },
    { month: "Jun", usage: 280 },
  ];

  const currentData = timeRange === "daily" ? dailyData : timeRange === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setTimeRange("daily")}
            className={`px-4 py-2 rounded ${
              timeRange === "daily"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange("weekly")}
            className={`px-4 py-2 rounded ${
              timeRange === "weekly"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange("monthly")}
            className={`px-4 py-2 rounded ${
              timeRange === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Usage Overview</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === "daily" ? "name" : timeRange === "weekly" ? "week" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Usage Trends</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === "daily" ? "name" : timeRange === "weekly" ? "week" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 