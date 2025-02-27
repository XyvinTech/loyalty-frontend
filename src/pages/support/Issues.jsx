import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

const Issues = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    severity: "all",
    type: "all",
  });

  const sampleIssues = [
    {
      id: "ISS-001",
      title: "App Crashing During Redemption",
      description: "Multiple users reporting app crashes during coupon redemption",
      type: "Technical",
      severity: "high",
      status: "investigating",
      affectedUsers: 120,
      reportedAt: "2024-02-20T10:30:00",
      lastUpdated: "2024-02-20T14:20:00",
    },
    {
      id: "ISS-002",
      title: "Points Not Updating",
      description: "Delay in points reflection after transactions",
      type: "System",
      severity: "medium",
      status: "in_progress",
      affectedUsers: 45,
      reportedAt: "2024-02-19T15:45:00",
      lastUpdated: "2024-02-20T09:15:00",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">System Issues</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium">
            Report Issue
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-gray-400" />
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="text-sm border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="investigating">Investigating</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <select
            value={filters.severity}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, severity: e.target.value }))
            }
            className="text-sm border-gray-300 rounded-md"
          >
            <option value="all">All Severity</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, type: e.target.value }))
            }
            className="text-sm border-gray-300 rounded-md"
          >
            <option value="all">All Types</option>
            <option value="technical">Technical</option>
            <option value="system">System</option>
            <option value="service">Service</option>
          </select>
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{issue.id}</span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  issue.severity === "high"
                    ? "bg-red-100 text-red-800"
                    : issue.severity === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {issue.severity}
              </span>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {issue.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{issue.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Type</span>
                <p className="font-medium">{issue.type}</p>
              </div>
              <div>
                <span className="text-gray-500">Affected Users</span>
                <p className="font-medium">{issue.affectedUsers}</p>
              </div>
              <div>
                <span className="text-gray-500">Reported</span>
                <p className="font-medium">
                  {new Date(issue.reportedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Last Update</span>
                <p className="font-medium">
                  {new Date(issue.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  issue.status === "investigating"
                    ? "bg-purple-100 text-purple-800"
                    : issue.status === "in_progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {issue.status.replace("_", " ")}
              </span>
              <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Issues; 