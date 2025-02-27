import { useState } from "react";
import {
  UserIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import UserFormModal from "../components/users/UserFormModal";
import UserActivityLog from "../components/users/UserActivityLog";
import UserSessionsModal from "../components/users/UserSessionsModal";
import UserRolesModal from "../components/users/UserRolesModal";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, inactive
  const [userFormModal, setUserFormModal] = useState({
    isOpen: false,
    user: null,
  });
  const [sessionModal, setSessionModal] = useState({
    isOpen: false,
    user: null,
  });
  const [roleModal, setRoleModal] = useState({
    isOpen: false,
    user: null,
  });

  // Mock roles data
  const roles = [
    {
      name: "Super Admin",
      description: "Full system access",
      permissions: ["all"],
    },
    {
      name: "Store Manager",
      description: "Manage store operations and staff",
      permissions: ["manage_store", "view_reports", "manage_staff"],
    },
    {
      name: "Customer Service",
      description: "Handle customer inquiries and support",
      permissions: ["view_customers", "manage_support", "view_transactions"],
    },
  ];

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Al Mazab",
      email: "mazab@example.com",
      role: "Store Manager",
      status: "Active",
      lastActive: "2 hours ago",
      joinedDate: "2024-01-15",
      department: "Operations",
    },
    {
      id: 2,
      name: "Jameela",
      email: "jameela@example.com",
      role: "Customer Service",
      status: "Active",
      lastActive: "1 hour ago",
      joinedDate: "2024-01-10",
      department: "Support",
    },
    {
      id: 3,
      name: "Al Balushi",
      email: "balushi@example.com",
      role: "Super Admin",
      status: "Active",
      lastActive: "Just now",
      joinedDate: "2023-12-01",
      department: "IT",
    },
    {
      id: 4,
      name: "Fathima Abbas",
      email: "fathima@example.com",
      role: "Store Manager",
      status: "Inactive",
      lastActive: "1 week ago",
      joinedDate: "2023-11-15",
      department: "Operations",
    },
  ]);

  // Add activity log state
  const [activities, setActivities] = useState([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      userName: "Hamidah Sultan",
      userEmail: "hs@example.com",
      action: "login",
      ipAddress: "192.168.1.1",
      details: "Logged in from Chrome on Windows",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      userName: "Hamidah Sultan",
      userEmail: "hs@example.com",
      action: "update",
      ipAddress: "192.168.1.2",
      details: "Updated profile information",
    },
    // Add more activities...
  ]);

  // Add bulk selection state
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleCreateUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      status: "Active",
      lastActive: "Just now",
      joinedDate: new Date().toISOString().split("T")[0],
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleUpdateUser = (userData) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userData.id ? { ...user, ...userData } : user
      )
    );
  };

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      (filterStatus === "all" || user.status.toLowerCase() === filterStatus) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleExportUsers = () => {
    const csvContent =
      "Name,Email,Role,Status,Department,Joined Date\n" +
      users
        .map(
          (user) =>
            `${user.name},${user.email},${user.role},${user.status},${user.department},${user.joinedDate}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Add bulk action handlers
  const handleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((user) => user.id));
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case "enable":
        setUsers((prev) =>
          prev.map((user) =>
            selectedUserIds.includes(user.id)
              ? { ...user, status: "Active" }
              : user
          )
        );
        break;
      case "disable":
        setUsers((prev) =>
          prev.map((user) =>
            selectedUserIds.includes(user.id)
              ? { ...user, status: "Inactive" }
              : user
          )
        );
        break;
      case "delete":
        setUsers((prev) =>
          prev.filter((user) => !selectedUserIds.includes(user.id))
        );
        break;
    }
    setSelectedUserIds([]);
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              role: newRole,
            }
          : user
      )
    );
  };

  const renderActions = (user) => (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        onClick={() => setUserFormModal({ isOpen: true, user })}
        className="text-green-600 hover:text-green-900 mr-3"
      >
        Edit
      </button>
      <button
        onClick={() => setSessionModal({ isOpen: true, user })}
        className="text-blue-600 hover:text-blue-900 mr-3"
      >
        Sessions
      </button>
      <button
        onClick={() => setRoleModal({ isOpen: true, user })}
        className="text-purple-600 hover:text-purple-900 mr-3"
      >
        Role
      </button>
      <button
        onClick={() => handleToggleStatus(user.id)}
        className={`${
          user.status === "Active"
            ? "text-red-600 hover:text-red-900"
            : "text-green-600 hover:text-green-900"
        }`}
      >
        {user.status === "Active" ? "Disable" : "Enable"}
      </button>
    </td>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          User Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage system users and their access
        </p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportUsers}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-lg"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setUserFormModal({ isOpen: true, user: null })}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
          >
            <UserIcon className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedUserIds.length === filteredUsers.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastActive}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinedDate}
                </td>
                {renderActions(user)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Form Modal */}
      <UserFormModal
        isOpen={userFormModal.isOpen}
        onClose={() => setUserFormModal({ isOpen: false, user: null })}
        user={userFormModal.user}
        roles={roles}
        onSubmit={(userData) => {
          if (userData.id) {
            handleUpdateUser(userData);
          } else {
            handleCreateUser(userData);
          }
          setUserFormModal({ isOpen: false, user: null });
        }}
      />

      {/* Sessions Modal */}
      <UserSessionsModal
        isOpen={sessionModal.isOpen}
        onClose={() => setSessionModal({ isOpen: false, user: null })}
        user={sessionModal.user}
      />

      {/* Role Modal */}
      <UserRolesModal
        isOpen={roleModal.isOpen}
        onClose={() => setRoleModal({ isOpen: false, user: null })}
        user={roleModal.user}
        roles={roles}
        onUpdateRoles={handleUpdateUserRole}
      />

      {/* Bulk Actions Menu */}
      {selectedUserIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-3 border flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedUserIds.length} users selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction("enable")}
              className="px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-50 rounded-md"
            >
              Enable
            </button>
            <button
              onClick={() => handleBulkAction("disable")}
              className="px-3 py-1 text-sm font-medium text-yellow-700 hover:bg-yellow-50 rounded-md"
            >
              Disable
            </button>
            <button
              onClick={() => handleBulkAction("delete")}
              className="px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-50 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Activity Log */}
      <UserActivityLog activities={activities} />
    </div>
  );
};

export default Users;
