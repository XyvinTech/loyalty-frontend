import { useState } from "react";
import {
  CalendarIcon,
  FunnelIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import FilterLogsModal from "../../components/audit/FilterLogsModal";

const AuditLogs = ({ type }) => {
  const [logs, setLogs] = useState([
    // Points Transactions
    {
      id: 1,
      type: "points",
      action: "Points Added",
      description: "Manual points adjustment: +500 points",
      user: "Customer ID: 12345",
      admin: "admin@khedmah.com",
      timestamp: "2024-02-20T10:30:00",
      status: "success",
      details: {
        previousBalance: 1000,
        newBalance: 1500,
        reason: "Compensation for system error",
      },
    },
    {
      id: 2,
      type: "points",
      action: "Points Redeemed",
      description: "Points redeemed for offer: Free Coffee",
      user: "Customer ID: 45678",
      admin: null,
      timestamp: "2024-02-20T09:15:00",
      status: "success",
      details: {
        pointsUsed: 200,
        newBalance: 800,
        offer: "Free Coffee at Starbucks",
      },
    },
    {
      id: 3,
      type: "points",
      action: "Points Expired",
      description: "Points expired as per policy",
      user: "Customer ID: 78901",
      admin: null,
      timestamp: "2024-02-19T00:00:00",
      status: "warning",
      details: {
        expiredPoints: 300,
        newBalance: 700,
        expiryDate: "2024-02-19",
      },
    },
    {
      id: 14,
      type: "points",
      action: "Points Transferred",
      description: "Points transferred between accounts",
      user: "Customer ID: 23456",
      admin: "supervisor@khedmah.com",
      timestamp: "2024-02-18T14:20:00",
      status: "success",
      details: {
        fromUser: "Customer ID: 23456",
        toUser: "Customer ID: 34567",
        pointsTransferred: 500,
        reason: "Family sharing",
      },
    },
    {
      id: 15,
      type: "points",
      action: "Points Earned",
      description: "Points earned from purchase",
      user: "Customer ID: 34567",
      admin: null,
      timestamp: "2024-02-18T13:45:00",
      status: "success",
      details: {
        transactionAmount: 150.0,
        pointsEarned: 300,
        merchant: "Al Meera Hypermarket",
        newBalance: 2800,
      },
    },

    // Admin Actions
    {
      id: 4,
      type: "admin",
      action: "Tier Modified",
      description: "Gold tier benefits updated",
      admin: "manager@khedmah.com",
      timestamp: "2024-02-20T09:15:00",
      status: "success",
      details: {
        changes: ["Point multiplier: 1.5x → 2x", "Free delivery added"],
        tierName: "Gold",
      },
    },
    {
      id: 16,
      type: "admin",
      action: "Points Rule Modified",
      description: "Updated points earning rule",
      admin: "manager@khedmah.com",
      timestamp: "2024-02-18T11:30:00",
      status: "success",
      details: {
        ruleType: "Purchase Points",
        oldRate: "1 point per 1 QAR",
        newRate: "2 points per 1 QAR",
        category: "Electronics",
      },
    },
    {
      id: 17,
      type: "admin",
      action: "Merchant Added",
      description: "New merchant onboarded",
      admin: "supervisor@khedmah.com",
      timestamp: "2024-02-17T15:20:00",
      status: "success",
      details: {
        merchantName: "City Center Mall",
        category: "Shopping Mall",
        pointsRate: "2x standard",
        location: "West Bay, Doha",
      },
    },

    // System Logs
    {
      id: 7,
      type: "system",
      action: "Daily Points Processing",
      description: "Batch points expiration check completed",
      timestamp: "2024-02-20T00:00:00",
      status: "success",
      details: {
        usersProcessed: 1500,
        pointsExpired: 25000,
        duration: "3m 45s",
      },
    },
    {
      id: 18,
      type: "system",
      action: "System Health Check",
      description: "Automated system health check completed",
      timestamp: "2024-02-19T06:00:00",
      status: "warning",
      details: {
        cpuUsage: "85%",
        memoryUsage: "75%",
        diskSpace: "70%",
        issues: ["High CPU utilization", "Memory pressure detected"],
      },
    },
    {
      id: 19,
      type: "system",
      action: "Cache Cleared",
      description: "System cache cleared automatically",
      timestamp: "2024-02-19T04:00:00",
      status: "success",
      details: {
        cacheType: "Redis",
        sizeCleared: "2.1 GB",
        duration: "45s",
        impact: "No service disruption",
      },
    },

    // API Logs
    {
      id: 10,
      type: "api",
      action: "API Request Failed",
      description: "Points redemption request failed",
      timestamp: "2024-02-19T15:45:00",
      status: "error",
      details: {
        endpoint: "/api/v1/points/redeem",
        errorCode: "INSUFFICIENT_BALANCE",
        requestId: "req_123xyz",
        clientIP: "192.168.1.100",
      },
    },
    {
      id: 20,
      type: "api",
      action: "API Version Deprecated",
      description: "API v1 usage detected",
      timestamp: "2024-02-19T14:30:00",
      status: "warning",
      details: {
        version: "v1",
        deprecationDate: "2024-03-01",
        suggestedVersion: "v2",
        endpoint: "/api/v1/users/profile",
      },
    },
    {
      id: 21,
      type: "api",
      action: "API Latency Alert",
      description: "High latency detected in API calls",
      timestamp: "2024-02-19T13:15:00",
      status: "warning",
      details: {
        avgResponseTime: "2.5s",
        threshold: "1s",
        affectedEndpoints: ["/api/v2/transactions", "/api/v2/points/balance"],
        region: "ME-EAST-1",
      },
    },
  ]);

  const [filters, setFilters] = useState({
    dateRange: "today",
    status: "all",
    search: "",
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [isLoading, setIsLoading] = useState(false);

  const getFilteredLogs = () => {
    return logs.filter((log) => {
      if (log.type !== type) return false;

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !log.action.toLowerCase().includes(searchLower) &&
          !log.description.toLowerCase().includes(searchLower) &&
          !log.admin?.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      if (filters.status !== "all" && log.status !== filters.status) {
        return false;
      }

      if (
        filters.admin &&
        !log.admin?.toLowerCase().includes(filters.admin.toLowerCase())
      ) {
        return false;
      }

      if (filters.startDate || filters.endDate) {
        const logDate = new Date(log.timestamp);
        if (filters.startDate && logDate < new Date(filters.startDate))
          return false;
        if (filters.endDate && logDate > new Date(filters.endDate))
          return false;
      } else {
        const today = new Date();
        const logDate = new Date(log.timestamp);
        switch (filters.dateRange) {
          case "today":
            return logDate.toDateString() === today.toDateString();
          case "yesterday":
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return logDate.toDateString() === yesterday.toDateString();
          case "week":
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return logDate >= weekAgo;
          case "month":
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return logDate >= monthAgo;
          default:
            return true;
        }
      }

      return true;
    });
  };

  const filteredLogs = getFilteredLogs();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderLogDetails = (details) => {
    return (
      <div className="mt-2 text-sm text-gray-500">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex items-start gap-2">
            <span className="font-medium">{key}:</span>
            {Array.isArray(value) ? (
              <ul className="list-disc list-inside">
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <span>{value}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const exportLogs = (logs, type) => {
    const csvContent = [
      // CSV Headers
      [
        "ID",
        "Action",
        "Description",
        "Status",
        "Timestamp",
        "Admin",
        "Details",
      ].join(","),
      // CSV Data
      ...logs.map((log) =>
        [
          log.id,
          log.action,
          `"${log.description}"`,
          log.status,
          log.timestamp,
          log.admin || "",
          `"${JSON.stringify(log.details)}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${type}_logs_${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {type.charAt(0).toUpperCase() + type.slice(1)} Logs
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <select
              value={filters.dateRange}
              onChange={(e) =>
                setFilters({ ...filters, dateRange: e.target.value })
              }
              className="text-sm border-0 focus:ring-0"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>

          <button
            onClick={() => {
              // Refresh logs
            }}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Refresh
          </button>

          <button
            onClick={() => exportLogs(filteredLogs, type)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search logs..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full border-gray-300 rounded-md shadow-sm text-sm"
          />
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-green-600"></div>
            <p className="mt-2 text-sm text-gray-500">Loading logs...</p>
          </div>
        ) : currentLogs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">No logs found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {currentLogs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {log.action}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          log.status
                        )}`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {log.description}
                    </p>
                    {log.admin && (
                      <p className="mt-1 text-sm text-gray-500">
                        By: {log.admin}
                      </p>
                    )}
                    {renderLogDetails(log.details)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(log.timestamp), "MMM d, yyyy HH:mm:ss")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {indexOfFirstItem + 1} -{" "}
                {Math.min(indexOfLastItem, filteredLogs.length)}
              </span>{" "}
              of <span className="font-medium">{filteredLogs.length}</span>{" "}
              results
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              {[...Array(totalPages)]
                .map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === index + 1
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFilterModalOpen && (
        <FilterLogsModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
};

export default AuditLogs;
