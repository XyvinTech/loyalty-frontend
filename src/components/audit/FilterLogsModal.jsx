import { XMarkIcon } from "@heroicons/react/24/outline";

const FilterLogsModal = ({ isOpen, onClose, filters, setFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Filter Logs</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={filters.startDate || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                />
                <input
                  type="date"
                  value={filters.endDate || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin User
              </label>
              <input
                type="text"
                value={filters.admin || ""}
                onChange={(e) =>
                  setFilters({ ...filters, admin: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                placeholder="Filter by admin email"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
            <button
              onClick={() =>
                setFilters({
                  dateRange: "today",
                  status: "all",
                  search: "",
                  startDate: "",
                  endDate: "",
                  admin: "",
                })
              }
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Reset Filters
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterLogsModal;
