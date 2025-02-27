import { useState } from "react";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  DocumentTextIcon,
  UserGroupIcon,
  TrashIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import DataRetentionModal from "../components/privacy/DataRetentionModal";
import GDPRConsentModal from "../components/privacy/GDPRConsentModal";
import RoleManagementModal from "../components/privacy/RoleManagementModal";
import RoleAuditLog from "../components/privacy/RoleAuditLog";
import RoleHistoryLog from "../components/privacy/RoleHistoryLog";

const Privacy = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [roles, setRoles] = useState([
    {
      name: "Super Admin",
      description: "Full system access",
      users: [
        {
          name: "John Doe",
          email: "john@example.com",
          status: "Active",
          lastActive: "2 hours ago",
        },
      ],
      permissions: ["all"],
    },
    {
      name: "Store Manager",
      description: "Manage store operations and staff",
      users: [
        {
          name: "Jane Smith",
          email: "jane@example.com",
          status: "Active",
          lastActive: "1 day ago",
        },
        {
          name: "Mike Johnson",
          email: "mike@example.com",
          status: "Active",
          lastActive: "3 hours ago",
        },
      ],
      permissions: ["manage_store", "view_reports", "manage_staff"],
    },
    {
      name: "Customer Service",
      description: "Handle customer inquiries and support",
      users: [
        {
          name: "Sarah Wilson",
          email: "sarah@example.com",
          status: "Active",
          lastActive: "5 hours ago",
        },
      ],
      permissions: ["view_customers", "manage_support", "view_transactions"],
    },
    {
      name: "Marketing Manager",
      description: "Manage campaigns and promotions",
      users: [
        {
          name: "Tom Brown",
          email: "tom@example.com",
          status: "Active",
          lastActive: "1 hour ago",
        },
      ],
      permissions: ["manage_campaigns", "view_analytics", "manage_content"],
    },
  ]);

  // Add audit log state
  const [roleAuditLogs, setRoleAuditLogs] = useState([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      action: "created",
      roleName: "Marketing Manager",
      changedBy: "admin@example.com",
      details:
        "Created new role with permissions: manage_campaigns, view_analytics, manage_content",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      action: "updated",
      roleName: "Store Manager",
      changedBy: "admin@example.com",
      details: "Added permissions: manage_staff, view_reports",
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      action: "deleted",
      roleName: "Temp Role",
      changedBy: "admin@example.com",
      details: "Deleted role and reassigned 2 users to Store Manager",
    },
  ]);

  // Add role history state
  const [roleHistory, setRoleHistory] = useState([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      changedBy: "admin@example.com",
      action: "created",
      details: "Created new role: Store Manager",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      changedBy: "admin@example.com",
      action: "updated",
      details: "Updated permissions for Customer Service role",
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      changedBy: "admin@example.com",
      action: "deleted",
      details: "Deleted role: Temporary Role",
    },
  ]);

  // Add audit log creation function
  const createAuditLog = (action, roleName, details) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      roleName,
      changedBy: "admin@example.com", // Replace with actual logged-in user
      details,
    };
    setRoleAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleAddRole = (newRole) => {
    setRoles((prev) => [...prev, { ...newRole, users: [] }]);
    setRoleHistory((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        changedBy: "admin@example.com", // Replace with actual logged-in user
        action: "created",
        details: `Created new role: ${newRole.name}`,
      },
      ...prev,
    ]);
  };

  const handleUpdateRole = (updatedRole) => {
    setRoles((prev) =>
      prev.map((role) => (role.name === updatedRole.name ? updatedRole : role))
    );
    setRoleHistory((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        changedBy: "admin@example.com",
        action: "updated",
        details: `Updated role: ${updatedRole.name}`,
      },
      ...prev,
    ]);
  };

  const handleCloneRole = (clonedRole) => {
    setRoles((prev) => [...prev, clonedRole]);
  };

  const handleDeleteRole = (roleName) => {
    setRoles((prev) => prev.filter((role) => role.name !== roleName));
    setRoleHistory((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        changedBy: "admin@example.com",
        action: "deleted",
        details: `Deleted role: ${roleName}`,
      },
      ...prev,
    ]);
  };

  const privacySettings = [
    {
      title: "Data Protection",
      description: "Configure data protection and encryption settings",
      icon: ShieldCheckIcon,
      status: "Enabled",
      statusColor: "green",
      onClick: () => {
        /* Add encryption settings modal */
      },
    },
    {
      title: "GDPR Compliance",
      description: "Manage GDPR consent and data subject rights",
      icon: DocumentTextIcon,
      status: "Compliant",
      statusColor: "green",
      onClick: () => setActiveModal("gdpr"),
    },
    {
      title: "Access Control",
      description: "Manage user roles and permissions",
      icon: LockClosedIcon,
      status: `${roles.length} Active Roles`,
      statusColor: "blue",
      onClick: () => setActiveModal("roles"),
    },
    {
      title: "Data Retention",
      description: "Configure data retention policies",
      icon: ClockIcon,
      status: "Configured",
      statusColor: "green",
      onClick: () => setActiveModal("retention"),
    },
  ];

  // Add mock users data
  const allUsers = [
    {
      name: "Alice Cooper",
      email: "alice@example.com",
      department: "Sales",
      status: "Active",
    },
    {
      name: "Bob Wilson",
      email: "bob@example.com",
      department: "Marketing",
      status: "Active",
    },
    {
      name: "Carol Smith",
      email: "carol@example.com",
      department: "Support",
      status: "Active",
    },
    // Add more users as needed
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Privacy & Security
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage privacy settings and security configurations
        </p>
      </div>

      {/* Privacy Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {privacySettings.map((setting) => (
          <div
            key={setting.title}
            onClick={setting.onClick}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <setting.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{setting.title}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full bg-${setting.statusColor}-100 text-${setting.statusColor}-800`}
              >
                {setting.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            Security Audit Log
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Recent security and privacy-related activities
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sample audit log entries */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2024-01-25 14:30:22
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Data Export Request
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  admin@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  192.168.1.100
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              {/* Add more audit log entries */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Audit Log */}
      <RoleAuditLog auditLogs={roleAuditLogs} />

      {/* Role History Log */}
      <RoleHistoryLog history={roleHistory} />

      {/* Modals */}
      <DataRetentionModal
        isOpen={activeModal === "retention"}
        onClose={() => setActiveModal(null)}
      />
      <GDPRConsentModal
        isOpen={activeModal === "gdpr"}
        onClose={() => setActiveModal(null)}
      />
      <RoleManagementModal
        isOpen={activeModal === "roles"}
        onClose={() => setActiveModal(null)}
        roles={roles}
        onAddRole={handleAddRole}
        onUpdateRole={handleUpdateRole}
        onCloneRole={handleCloneRole}
        onDeleteRole={handleDeleteRole}
        allUsers={allUsers}
      />
    </div>
  );
};

export default Privacy;
