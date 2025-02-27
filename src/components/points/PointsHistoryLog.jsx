import { useState } from "react";
import {
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FunnelIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

const PointsHistoryLog = ({ history }) => {
  const [filters, setFilters] = useState({
    type: "all", // earned/redeemed/all
    dateRange: "all",
    service: "all",
  });

  const getPointsStats = () => {
    return history.reduce(
      (stats, entry) => ({
        totalEarned:
          stats.totalEarned + (entry.type === "earned" ? entry.points : 0),
        totalRedeemed:
          stats.totalRedeemed + (entry.type === "redeemed" ? entry.points : 0),
        totalTransactions: stats.totalTransactions + 1,
      }),
      { totalEarned: 0, totalRedeemed: 0, totalTransactions: 0 }
    );
  };

  const stats = getPointsStats();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Points Earned</p>
              <p className="text-2xl font-semibold text-green-600">
                {stats.totalEarned}
              </p>
            </div>
            <ArrowUpIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Points Redeemed</p>
              <p className="text-2xl font-semibold text-blue-600">
                {stats.totalRedeemed}
              </p>
            </div>
            <ArrowDownIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalEarned - stats.totalRedeemed}
              </p>
            </div>
            <DocumentChartBarIcon className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-gray-400" />
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
              className="text-sm border-gray-300 rounded-md"
            >
              <option value="all">All Activities</option>
              <option value="earned">Points Earned</option>
              <option value="redeemed">Points Redeemed</option>
            </select>
          </div>

          <select
            value={filters.dateRange}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, dateRange: e.target.value }))
            }
            className="text-sm border-gray-300 rounded-md"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <select
            value={filters.service}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, service: e.target.value }))
            }
            className="text-sm border-gray-300 rounded-md"
          >
            <option value="all">All Services</option>
            <option value="recharge">Recharge</option>
            <option value="bill_payment">Bill Payment</option>
            <option value="donation">Donations</option>
            <option value="offer">Offer Redemption</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-medium text-gray-900">Points History</h3>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Service
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Points
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Balance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {history.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100">
                    {entry.service}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {entry.description}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-sm font-medium ${
                      entry.type === "earned"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {entry.type === "earned" ? "+" : "-"}
                    {entry.points}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {entry.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointsHistoryLog;
