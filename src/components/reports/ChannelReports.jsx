import { useState } from "react";
import {
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChannelReports = () => {
  const [dateRange, setDateRange] = useState("month");
  const [showComparison, setShowComparison] = useState(false);
  const [compareWith, setCompareWith] = useState("prev_period");
  const [exportFormat, setExportFormat] = useState("csv");
  const [channelData] = useState({
    mobileApp: {
      totalPoints: 125000,
      transactions: 2500,
      activeUsers: 1800,
      platforms: {
        ios: 45,
        android: 55,
      },
    },
    website: {
      totalPoints: 75000,
      transactions: 1500,
      activeUsers: 1200,
      browsers: {
        chrome: 40,
        safari: 30,
        firefox: 20,
        other: 10,
      },
    },
    pos: {
      totalPoints: 50000,
      transactions: 1000,
      activeUsers: 500,
      locations: {
        store: 60,
        kiosk: 40,
      },
    },
    merchant: {
      totalPoints: 25000,
      transactions: 500,
      activeUsers: 200,
      types: {
        retail: 50,
        food: 30,
        services: 20,
      },
    },
  });

  const chartData = {
    labels: ["Mobile App", "Website", "POS", "Merchant Portal"],
    datasets: [
      {
        data: [
          channelData.mobileApp.totalPoints,
          channelData.website.totalPoints,
          channelData.pos.totalPoints,
          channelData.merchant.totalPoints,
        ],
        backgroundColor: ["#2B5C3F", "#4C9067", "#6DC38D", "#96E6B3"],
        borderWidth: 0,
      },
    ],
  };

  const getComparisonData = (current, previous) => {
    const diff = ((current - previous) / previous) * 100;
    return {
      diff: diff.toFixed(1),
      trend: diff >= 0 ? "up" : "down",
    };
  };

  const exportReport = (format) => {
    const data = {
      reportName: "Channel Distribution Report",
      dateRange,
      channels: {
        mobileApp: channelData.mobileApp,
        website: channelData.website,
        pos: channelData.pos,
        merchant: channelData.merchant,
      },
    };

    if (format === "csv") {
      const csvContent = [
        ["Channel", "Total Points", "Transactions", "Active Users"],
        [
          "Mobile App",
          data.channels.mobileApp.totalPoints,
          data.channels.mobileApp.transactions,
          data.channels.mobileApp.activeUsers,
        ],
        [
          "Website",
          data.channels.website.totalPoints,
          data.channels.website.transactions,
          data.channels.website.activeUsers,
        ],
        [
          "POS",
          data.channels.pos.totalPoints,
          data.channels.pos.transactions,
          data.channels.pos.activeUsers,
        ],
        [
          "Merchant",
          data.channels.merchant.totalPoints,
          data.channels.merchant.transactions,
          data.channels.merchant.activeUsers,
        ],
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `channel-report-${dateRange}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `channel-report-${dateRange}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Channel Distribution
        </h2>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block w-40 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select
            value={compareWith}
            onChange={(e) => setCompareWith(e.target.value)}
            className="block border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
          >
            <option value="prev_period">Previous Period</option>
            <option value="prev_year">Previous Year</option>
            <option value="custom">Custom Period</option>
          </select>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportReport("csv")}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => exportReport("json")}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export JSON
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mobile App Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Mobile App</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {channelData.mobileApp.totalPoints.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">points earned</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transactions</span>
              <span className="font-medium">
                {channelData.mobileApp.transactions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active Users</span>
              <span className="font-medium">
                {channelData.mobileApp.activeUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">iOS / Android</span>
              <span className="font-medium">
                {channelData.mobileApp.platforms.ios}% /{" "}
                {channelData.mobileApp.platforms.android}%
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-sm ${
                getComparisonData(channelData.mobileApp.totalPoints, 100000)
                  .trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {getComparisonData(channelData.mobileApp.totalPoints, 100000)
                .trend === "up" ? (
                <ArrowTrendingUpIcon className="w-4 h-4" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4" />
              )}
              {
                getComparisonData(channelData.mobileApp.totalPoints, 100000)
                  .diff
              }
              %
            </span>
            <span className="text-xs text-gray-500">vs previous period</span>
          </div>
        </div>

        {/* Website Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <GlobeAltIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Website</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {channelData.website.totalPoints.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">points earned</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transactions</span>
              <span className="font-medium">
                {channelData.website.transactions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active Users</span>
              <span className="font-medium">
                {channelData.website.activeUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Top Browser</span>
              <span className="font-medium">
                Chrome ({channelData.website.browsers.chrome}%)
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-sm ${
                getComparisonData(channelData.website.totalPoints, 75000)
                  .trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {getComparisonData(channelData.website.totalPoints, 75000)
                .trend === "up" ? (
                <ArrowTrendingUpIcon className="w-4 h-4" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4" />
              )}
              {getComparisonData(channelData.website.totalPoints, 75000).diff}%
            </span>
            <span className="text-xs text-gray-500">vs previous period</span>
          </div>
        </div>

        {/* POS Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingBagIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">POS</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {channelData.pos.totalPoints.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">points earned</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transactions</span>
              <span className="font-medium">
                {channelData.pos.transactions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active Terminals</span>
              <span className="font-medium">
                {channelData.pos.activeUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Store / Kiosk</span>
              <span className="font-medium">
                {channelData.pos.locations.store}% /{" "}
                {channelData.pos.locations.kiosk}%
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-sm ${
                getComparisonData(channelData.pos.totalPoints, 50000).trend ===
                "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {getComparisonData(channelData.pos.totalPoints, 50000).trend ===
              "up" ? (
                <ArrowTrendingUpIcon className="w-4 h-4" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4" />
              )}
              {getComparisonData(channelData.pos.totalPoints, 50000).diff}%
            </span>
            <span className="text-xs text-gray-500">vs previous period</span>
          </div>
        </div>

        {/* Merchant Portal Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <BuildingStorefrontIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Merchant Portal
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {channelData.merchant.totalPoints.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">points earned</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transactions</span>
              <span className="font-medium">
                {channelData.merchant.transactions.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Active Merchants</span>
              <span className="font-medium">
                {channelData.merchant.activeUsers.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Top Category</span>
              <span className="font-medium">
                Retail ({channelData.merchant.types.retail}%)
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-sm ${
                getComparisonData(channelData.merchant.totalPoints, 25000)
                  .trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {getComparisonData(channelData.merchant.totalPoints, 25000)
                .trend === "up" ? (
                <ArrowTrendingUpIcon className="w-4 h-4" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4" />
              )}
              {getComparisonData(channelData.merchant.totalPoints, 25000).diff}%
            </span>
            <span className="text-xs text-gray-500">vs previous period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Points Distribution
          </h3>
          <div className="w-full max-w-md mx-auto">
            <Doughnut data={chartData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Channel Insights
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800">Mobile Growth</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Mobile app usage increased by 25% compared to last month
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800">High Conversion</h4>
              <p className="text-sm text-green-700 mt-1">
                Website shows highest point redemption rate at 78%
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800">POS Integration</h4>
              <p className="text-sm text-blue-700 mt-1">
                Successfully integrated with 50 new POS terminals this month
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Detailed Metrics
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points/Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active User Growth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Retention Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(channelData).map(([channel, data]) => (
                <tr key={channel}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {channel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(data.totalPoints / data.transactions).toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    +{Math.floor(Math.random() * 30)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(50 + Math.random() * 40)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(60 + Math.random() * 30)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChannelReports;
