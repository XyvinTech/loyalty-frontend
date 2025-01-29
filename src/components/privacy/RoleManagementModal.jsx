import { useState } from "react";
import {
  XMarkIcon,
  PlusIcon,
  UserCircleIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  UserMinusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import RoleFormModal from "./RoleFormModal";
import UserManagementModal from "./UserManagementModal";

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

  const handleRemoveUser = (role, userEmail) => {
    const updatedRole = {
      ...role,
      users: role.users.filter((user) => user.email !== userEmail),
    };
    onUpdateRole(updatedRole);
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

  const renderUsersList = (role) => {
    const usersList = Array.isArray(role.users) ? role.users : [];

    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-sm font-medium text-gray-700">
            Users ({usersList.length})
          </h5>
          <button
            onClick={() => setUserModal({ isOpen: true, role })}
            className="text-sm text-green-600 hover:text-green-700"
          >
            Add User
          </button>
        </div>
        <div className="space-y-2">
          {usersList.map((user) => (
            <div
              key={user.email}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">{user.lastActive}</span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {user.status}
                </span>
                <button
                  onClick={() => handleRemoveUser(role, user.email)}
                  className="text-red-600 hover:text-red-700"
                  title="Remove User"
                >
                  <UserMinusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6">
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

        {/* Role List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">System Roles</h3>
            <button
              onClick={() => setRoleFormModal({ isOpen: true, role: null })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
            >
              <PlusIcon className="w-4 h-4" />
              Create Role
            </button>
          </div>

          <div className="space-y-4">
            {roles.map((role) => (
              <div
                key={role.name}
                className="border rounded-lg overflow-hidden"
              >
                {renderRoleHeader(role)}

                {/* Users List */}
                {renderUsersList(role)}
              </div>
            ))}
          </div>
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
      </div>
    </div>
  );
};

export default RoleManagementModal;
