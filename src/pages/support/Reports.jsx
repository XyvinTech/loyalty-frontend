import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ChartPieIcon,
  ChartBarIcon,
  UsersIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("last_30");

  const summaryStats = [
    {
      title: "Total Tickets",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: ChartPieIcon,
      color: "blue",
    },
    {
      title: "Resolution Rate",
      value: "94%",
      change: "+3%",
      trend: "up",
      icon: ChartBarIcon,
      color: "green",
    },
    {
      title: "Avg Response Time",
      value: "2.5h",
      change: "-18%",
      trend: "down",
      icon: UsersIcon,
      color: "purple",
    },
    {
      title: "Open Issues",
      value: "8",
      change: "-2",
      trend: "down",
      icon: ExclamationTriangleIcon,
      color: "red",
    },
  ];

  const reportTypes = [
    {
      title: "Ticket Analytics",
      description:
        "Detailed analysis of support tickets and resolution metrics",
      type: "tickets",
    },
    {
      title: "Issue Trends",
      description: "Common issues and their frequency over time",
      type: "issues",
    },
    {
      title: "Response Times",
      description: "Team performance and SLA compliance reports",
      type: "performance",
    },
    {
      title: "Customer Satisfaction",
      description: "Feedback scores and satisfaction metrics",
      type: "satisfaction",
    },
    {
      title: "Category Distribution",
      description: "Distribution of tickets across different categories",
      type: "categories",
    },
    {
      title: "Resolution Analysis",
      description: "Time to resolve and resolution methods analysis",
      type: "resolution",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Support Reports
        </h1>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border-gray-300 rounded-md"
          >
            <option value="today">Today</option>
            <option value="last_7">Last 7 Days</option>
            <option value="last_30">Last 30 Days</option>
            <option value="last_90">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium">
            <ArrowDownTrayIcon className="w-5 h-5" />
            Export Reports
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.type}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {report.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{report.description}</p>
            <div className="flex items-center justify-between">
              <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                View Report
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <ArrowDownTrayIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
