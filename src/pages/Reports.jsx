import { useState } from "react";
import {
  ArrowDownTrayIcon,
  CalendarIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import ChannelReports from "../components/reports/ChannelReports";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("transactions");
  const [dateRange, setDateRange] = useState("last_30");
  const [filters, setFilters] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  const reportTypes = [
    {
      id: "transactions",
      name: "Transactions Report",
      description: "Export all transaction data with points earned/redeemed",
      filters: ["date_range", "transaction_type", "customer_segment"],
    },
    {
      id: "points",
      name: "Points Summary",
      description: "Points earned and redeemed by customers",
      filters: ["date_range", "customer_segment"],
    },
    {
      id: "redemptions",
      name: "Redemption Report",
      description: "Details of all offer and coupon redemptions",
      filters: ["date_range", "offer_type", "merchant"],
    },
    {
      id: "support",
      name: "Support Tickets",
      description: "Customer support ticket data and resolutions",
      filters: ["date_range", "status", "category"],
    },
    {
      id: "customers",
      name: "Customer Analytics",
      description: "Customer segmentation and behavior analysis",
      filters: ["date_range", "segment", "tier"],
    },
  ];

  const tabs = [
    { name: "Overview", value: "overview" },
    { name: "Points", value: "points" },
    { name: "Channels", value: "channels" },
    { name: "Customers", value: "customers" },
    { name: "Merchants", value: "merchants" },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-sm border-gray-300 rounded-md"
          >
            <option value="today">Today</option>
            <option value="last_7">Last 7 Days</option>
            <option value="last_30">Last 30 Days</option>
            <option value="last_90">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
              selectedReport === report.id
                ? "ring-2 ring-green-500"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {report.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{report.description}</p>
            <div className="flex items-center justify-between">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                <ArrowDownTrayIcon className="w-5 h-5" />
                Export
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <FunnelIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Reports</h2>
          <div className="flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-sm border-b-2 ${
                  activeTab === tab.value
                    ? "border-green-500"
                    : "border-transparent"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "channels" && <ChannelReports />}
      </div>
    </div>
  );
};

export default Reports;
