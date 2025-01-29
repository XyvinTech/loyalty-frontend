import { useState } from "react";
import {
  XMarkIcon,
  PlusIcon,
  UserCircleIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  UserMinusIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import RoleFormModal from "./RoleFormModal";
import UserManagementModal from "./UserManagementModal";
import Modal from "../common/Modal";

const RoleManagementModal = ({
  isOpen,
  onClose,
  roles,
  onAddRole,
  onUpdateRole,
  onCloneRole,
  allUsers,
}) => {
  if (!isOpen) return null;

  const [roleFormModal, setRoleFormModal] = useState({
    isOpen: false,
    role: null,
  });

  const [userModal, setUserModal] = useState({
    isOpen: false,
    role: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    role: null,
  });

  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [expandedRole, setExpandedRole] = useState(null);

  // Filter users for the role assignment dropdown
  const getAvailableUsers = (role) => {
    return allUsers.filter(
      (user) =>
        !roles.some((r) => r.users.find((u) => u.email === user.email)) ||
        role.users.find((u) => u.email === user.email)
    );
  };

  const handleAddUserToRole = (role, user) => {
    if (!role.users.find((u) => u.email === user.email)) {
      onUpdateRole({
        ...role,
        users: [...role.users, user],
      });
    }
  };

  const handleRemoveUserFromRole = (role, userEmail) => {
    onUpdateRole({
      ...role,
      users: role.users.filter((u) => u.email !== userEmail),
    });
  };

  const handleEditRole = (role) => {
    setRoleFormModal({ isOpen: true, role });
  };

  const handleCloneRole = (role) => {
    const clonedRole = {
      ...role,
      name: `${role.name} (Copy)`,
      users: [],
    };
    onCloneRole(clonedRole);
    setRoleFormModal({ isOpen: false, role: null });
  };

  const handleExportRoles = () => {
    const exportData = roles.map((role) => ({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      parentRole: role.parentRole,
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roles_export.json";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportRoles = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        const importedRoles = JSON.parse(text);

        // Validate imported roles
        const validRoles = importedRoles.filter(
          (role) =>
            role.name && role.permissions && Array.isArray(role.permissions)
        );

        // Add imported roles
        validRoles.forEach((role) => {
          onAddRole({
            ...role,
            users: [], // Start with no users
          });
        });
      } catch (error) {
        console.error("Error importing roles:", error);
      }
    }
  };

  const renderRoleHeader = (role) => (
    <div className="p-4 bg-gray-50 border-b">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900">{role.name}</h4>
          <p className="text-sm text-gray-500">{role.description}</p>
          {role.parentRole && (
            <p className="text-xs text-gray-500 mt-1">
              Inherits from: {role.parentRole}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCloneRole(role)}
            className="text-sm text-gray-600 hover:text-gray-700"
            title="Clone Role"
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEditRole(role)}
            className="text-sm text-green-600 hover:text-green-700"
          >
            Edit Role
          </button>
          {role.name !== "Super Admin" && (
            <button
              onClick={() => setDeleteModal({ isOpen: true, role })}
              className="text-sm text-red-600 hover:text-red-700"
              title="Delete Role"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {role.permissions.map((permission) => (
          <span
            key={permission}
            className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
          >
            {permission}
          </span>
        ))}
        {role.parentRole && (
          <div className="mt-1 flex flex-wrap gap-2">
            {roles
              .find((r) => r.name === role.parentRole)
              ?.permissions.map((permission) => (
                <span
                  key={permission}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-500"
                >
                  {permission} (Inherited)
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderUsersList = (role) => (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">Users</h4>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
            className="pl-8 pr-4 py-1 text-sm border rounded-lg"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-2 top-2" />
        </div>
      </div>

      {/* Current Users */}
      <div className="space-y-2">
        {role.users.map((user) => (
          <div
            key={user.email}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <UserCircleIcon className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => handleRemoveUserFromRole(role, user.email)}
              className="text-red-600 hover:text-red-700"
              title="Remove user from role"
            >
              <UserMinusIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add User Dropdown */}
      <div className="mt-4">
        <select
          className="w-full border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => {
            const user = allUsers.find((u) => u.email === e.target.value);
            if (user) {
              handleAddUserToRole(role, user);
              e.target.value = ""; // Reset select
            }
          }}
          value=""
        >
          <option value="">Add user to role...</option>
          {getAvailableUsers(role)
            .filter(
              (user) =>
                user.name
                  .toLowerCase()
                  .includes(userSearchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
            )
            .map((user) => (
              <option key={user.email} value={user.email}>
                {user.name} ({user.email})
              </option>
            ))}
        </select>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Role & Access Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage roles and user permissions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExportRoles}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700"
            title="Export Roles"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export
          </button>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImportRoles}
              className="hidden"
              id="role-import"
            />
            <label
              htmlFor="role-import"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700 cursor-pointer"
              title="Import Roles"
            >
              <ArrowUpTrayIcon className="w-4 h-4" />
              Import
            </label>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {roles.map((role) => (
          <div key={role.name} className="border rounded-lg overflow-hidden">
            {renderRoleHeader(role)}

            {/* Expanded Role Content */}
            {expandedRole === role.name && (
              <div className="p-4 border-t bg-gray-50">
                <div className="grid grid-cols-2 gap-6">
                  {/* Role Details */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Role Details
                    </h3>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        {role.description}
                      </p>
                      <div className="mt-4">
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
                          Permissions
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((perm) => (
                            <span
                              key={perm}
                              className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Users Management */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Role Members
                    </h3>
                    {renderUsersList(role)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <RoleFormModal
        isOpen={roleFormModal.isOpen}
        onClose={() => setRoleFormModal({ isOpen: false, role: null })}
        role={roleFormModal.role}
        roles={roles}
        onSubmit={(role, isClone) => {
          if (isClone) {
            onCloneRole(role);
          } else if (role.name) {
            onUpdateRole(role);
          } else {
            onAddRole(role);
          }
          setRoleFormModal({ isOpen: false, role: null });
        }}
      />
      <UserManagementModal
        isOpen={userModal.isOpen}
        onClose={() => setUserModal({ isOpen: false, role: null })}
        role={userModal.role}
        allUsers={allUsers}
      />
    </Modal>
  );
};

export default RoleManagementModal;
