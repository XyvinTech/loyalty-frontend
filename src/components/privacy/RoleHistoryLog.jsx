import { useState } from "react";
import {
  ClockIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const RoleHistoryLog = ({ history }) => {
  const [filters, setFilters] = useState({
    action: "all",
    dateRange: "all",
    search: "",
  });
  const [sort, setSort] = useState({
    field: "timestamp",
    direction: "desc",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filterHistory = () => {
    return history.filter((entry) => {
      // Action filter
      if (filters.action !== "all" && entry.action !== filters.action) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== "all") {
        const entryDate = new Date(entry.timestamp);
        const now = new Date();
        switch (filters.dateRange) {
          case "24h":
            if (now - entryDate > 24 * 60 * 60 * 1000) return false;
            break;
          case "7d":
            if (now - entryDate > 7 * 24 * 60 * 60 * 1000) return false;
            break;
          case "30d":
            if (now - entryDate > 30 * 24 * 60 * 60 * 1000) return false;
            break;
        }
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          entry.changedBy.toLowerCase().includes(searchLower) ||
          entry.details.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  };

  const sortHistory = (data) => {
    return [...data].sort((a, b) => {
      let aValue = a[sort.field];
      let bValue = b[sort.field];

      if (sort.field === "timestamp") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filterAndSortHistory = () => {
    const filtered = filterHistory();
    return sortHistory(filtered);
  };

  const handleExport = () => {
    const filteredData = filterHistory();
    const csvContent = [
      ["Date", "Changed By", "Action", "Details"],
      ...filteredData.map((entry) => [
        new Date(entry.timestamp).toLocaleString(),
        entry.changedBy,
        entry.action.toUpperCase(),
        entry.details,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `role_history_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  };

  const filteredAndSortedHistory = filterAndSortHistory();
  const totalPages = Math.ceil(filteredAndSortedHistory.length / itemsPerPage);
  const paginatedHistory = filteredAndSortedHistory.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const SortIcon = ({ field }) => {
    if (sort.field !== field) return null;
    return sort.direction === "asc" ? (
      <ChevronUpIcon className="w-4 h-4" />
    ) : (
      <ChevronDownIcon className="w-4 h-4" />
    );
  };

  const renderTableHeader = (field, label) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIcon field={field} />
      </div>
    </th>
  );

  return (
    <div className="mt-6 bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-900">
              Role Change History
            </h3>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-gray-400" />
            <select
              value={filters.action}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, action: e.target.value }))
              }
              className="text-sm border-gray-300 rounded-md"
            >
              <option value="all">All Actions</option>
              <option value="created">Created</option>
              <option value="updated">Updated</option>
              <option value="deleted">Deleted</option>
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
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="text-sm border-gray-300 rounded-md px-3 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {renderTableHeader("timestamp", "Date")}
              {renderTableHeader("changedBy", "Changed By")}
              {renderTableHeader("action", "Action")}
              {renderTableHeader("details", "Details")}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedHistory.length > 0 ? (
              paginatedHistory.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.changedBy}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        entry.action === "created"
                          ? "bg-green-100 text-green-800"
                          : entry.action === "updated"
                          ? "bg-blue-100 text-blue-800"
                          : entry.action === "deleted"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {entry.action.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {entry.details}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No history entries match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {Math.min(page * itemsPerPage, filteredAndSortedHistory.length)}{" "}
          of {filteredAndSortedHistory.length} entries
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleHistoryLog;
