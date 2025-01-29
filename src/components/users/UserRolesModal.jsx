import { useState } from "react";
import { XMarkIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const UserRolesModal = ({ isOpen, onClose, user, roles, onUpdateRoles }) => {
  if (!isOpen) return null;

  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleSave = () => {
    onUpdateRoles(user.id, selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">User Role</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage role assignment for {user.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Current Role */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>Current Role: {user.role}</span>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign New Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role Description */}
          {selectedRole && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Role Details</h3>
              <p className="text-sm text-gray-600">
                {roles.find((r) => r.name === selectedRole)?.description}
              </p>
              <div className="mt-4">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  Access Level
                </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {roles
                    .find((r) => r.name === selectedRole)
                    ?.permissions.slice(0, 3)
                    .map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                      >
                        {perm}
                      </span>
                    ))}
                  {roles.find((r) => r.name === selectedRole)?.permissions.length >
                    3 && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      +{" "}
                      {roles.find((r) => r.name === selectedRole)?.permissions
                        .length - 3}{" "}
                      more
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRolesModal; 