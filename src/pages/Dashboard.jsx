import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  GiftIcon,
  BuildingStorefrontIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import AreaChart from "../components/charts/AreaChart";

const Dashboard = () => {
  const { customers, transactions, offers, tiers } = useStore();
  const [timeRange, setTimeRange] = useState("today"); // today, week, month, year
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const chartRefs = {
    points: useRef(null),
    customers: useRef(null),
    segments: useRef(null),
  };

  const stats = {
    totalPoints: transactions.reduce((sum, t) => sum + (t.points || 0), 0),
    activeCustomers: customers.filter((c) => c.status === "Active").length,
    redemptionRate: "68%",
    avgTransaction: "$142.50",
  };

  // Add chart data
  const pointsActivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Points Earned",
        data: [1200, 1900, 1500, 2100, 1800, 2500, 2200],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Points Redeemed",
        data: [800, 1200, 950, 1300, 1100, 1600, 1400],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const customerGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Customers",
        data: [65, 85, 110, 145, 180, 210],
        backgroundColor: "rgb(34, 197, 94)",
      },
    ],
  };

  const tierDistributionData = {
    labels: ["Silver", "Gold", "Platinum"],
    datasets: [
      {
        data: [300, 150, 50],
        backgroundColor: [
          "rgb(148, 163, 184)",
          "rgb(234, 179, 8)",
          "rgb(168, 85, 247)",
        ],
      },
    ],
  };

  // Add new chart data
  const segmentAnalysisData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "VIP",
        data: [30, 45, 57, 75, 85, 95],
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        borderColor: "rgba(168, 85, 247, 1)",
        fill: true,
      },
      {
        label: "Regular",
        data: [120, 135, 155, 170, 185, 195],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
        fill: true,
      },
      {
        label: "At Risk",
        data: [25, 20, 15, 18, 12, 8],
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderColor: "rgba(239, 68, 68, 1)",
        fill: true,
      },
    ],
  };

  // Add click handlers for charts
  const handleChartClick = (chart, element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    const label = chart.data.labels[index];
    const value = chart.data.datasets[datasetIndex].data[index];

    console.log(`Clicked: ${label} - ${value}`);
    // Add navigation or modal display logic here
  };

  // Add refresh function
  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
    setIsLoading(false);
  };

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(refreshData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={refreshData}
            disabled={isLoading}
            className={`p-2 rounded-lg border hover:bg-gray-50 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ArrowPathIcon
              className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Points Issued</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalPoints.toLocaleString()}
              </p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </div>
        </div>
        {/* Add more stat cards */}

        {/* Active Customers */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Customers</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.activeCustomers.toLocaleString()}
              </p>
              <p className="text-xs text-blue-600">+5% from last month</p>
            </div>
          </div>
        </div>

        {/* Redemption Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <GiftIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Redemption Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.redemptionRate}
              </p>
              <p className="text-xs text-purple-600">+8% from last month</p>
            </div>
          </div>
        </div>

        {/* Average Transaction */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Transaction</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.avgTransaction}
              </p>
              <p className="text-xs text-yellow-600">+3% from last month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Customers */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Customers
            </h3>
            <Link
              to="/customers"
              className="text-sm text-green-600 hover:text-green-700"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {customers.slice(0, 5).map((customer) => (
              <Link
                key={customer.id}
                to={`/customers/${customer.id}`}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    customer.tier === "Gold"
                      ? "bg-yellow-100 text-yellow-800"
                      : customer.tier === "Platinum"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {customer.tier}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
            <Link
              to="/transactions"
              className="text-sm text-green-600 hover:text-green-700"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === "Purchase"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <ChartBarIcon
                      className={`w-4 h-4 ${
                        transaction.type === "Purchase"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.customerName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${transaction.amount}
                  </p>
                  <p
                    className={`text-xs ${
                      transaction.points >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.points >= 0 ? "+" : ""}
                    {transaction.points} points
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Offers */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Active Offers</h3>
            <Link
              to="/offers"
              className="text-sm text-green-600 hover:text-green-700"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {offers.slice(0, 5).map((offer) => (
              <div
                key={offer.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={offer.logo}
                    alt={offer.brandName}
                    className="w-8 h-8 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {offer.brandName}
                    </p>
                    <p className="text-xs text-gray-500">{offer.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    {offer.pointsRequired} points
                  </p>
                  <p className="text-xs text-gray-500">
                    Expires {offer.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Updated Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Points Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Points Activity
            </h3>
            <select className="text-sm border rounded-lg px-3 py-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64">
            <LineChart data={pointsActivityData} />
          </div>
        </div>

        {/* Tier Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Tier Distribution
          </h3>
          <div className="h-64">
            <DoughnutChart data={tierDistributionData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Customer Growth */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Customer Growth
            </h3>
            <select className="text-sm border rounded-lg px-3 py-2">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <BarChart data={customerGrowthData} />
          </div>
        </div>

        {/* Add Segment Analysis Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Segment Analysis
            </h3>
            <select className="text-sm border rounded-lg px-3 py-2">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <AreaChart
              data={segmentAnalysisData}
              options={{
                onClick: (_, element) =>
                  handleChartClick(chartRefs.segments.current, element),
                interaction: {
                  mode: "nearest",
                  axis: "x",
                  intersect: false,
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Add Points Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Points Distribution
            </h3>
            <div className="flex gap-2">
              <button className="text-sm text-gray-600 hover:text-gray-900">
                By Category
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900">
                By Brand
              </button>
            </div>
          </div>
          <div className="h-64">
            <DoughnutChart
              data={{
                labels: [
                  "Food & Dining",
                  "Shopping",
                  "Travel",
                  "Entertainment",
                  "Others",
                ],
                datasets: [
                  {
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                      "rgb(34, 197, 94)",
                      "rgb(99, 102, 241)",
                      "rgb(234, 179, 8)",
                      "rgb(168, 85, 247)",
                      "rgb(148, 163, 184)",
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      usePointStyle: true,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
