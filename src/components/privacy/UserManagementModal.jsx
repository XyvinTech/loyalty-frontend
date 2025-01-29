import { useState } from "react";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

const UserManagementModal = ({
  isOpen,
  onClose,
  role,
  allUsers,
  onAssignUsers,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bulkFile, setBulkFile] = useState(null);

  // Filter users not already in the role
  const availableUsers = allUsers.filter(
    (user) => !role.users.find((u) => u.email === user.email)
  );

  const filteredUsers = availableUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers);
    }
  };

  const handleBulkImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        const users = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line)
          .map((line) => {
            const [name, email, department] = line
              .split(",")
              .map((s) => s.trim());
            return { name, email, department, status: "Active" };
          })
          .filter((user) => user.email && user.name); // Validate required fields

        setSelectedUsers((prev) => [...new Set([...prev, ...users])]);
        setBulkFile(file);
      } catch (error) {
        console.error("Error parsing CSV:", error);
      }
    }
  };

  const downloadTemplate = () => {
    const template = "Name,Email,Department\nJohn Doe,john@example.com,Sales\n";
    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user_import_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add Users to {role.name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Select users to assign to this role
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download Template
            </button>
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleBulkImport}
                className="hidden"
                id="bulk-import"
              />
              <label
                htmlFor="bulk-import"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700 cursor-pointer"
              >
                <ArrowUpTrayIcon className="w-4 h-4" />
                Import Users
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedUsers.length === filteredUsers.length}
              onChange={handleSelectAll}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-600">Select All</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* User List */}
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <label
                key={user.email}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user)}
                    onChange={() => handleUserSelect(user)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {user.department || "No Department"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Selected Users Summary */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {selectedUsers.length} users selected
              {bulkFile && ` (including ${bulkFile.name})`}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAssignUsers(selectedUsers);
              onClose();
            }}
            disabled={!selectedUsers.length}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
          >
            Add Selected Users ({selectedUsers.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementModal;
