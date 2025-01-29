import { XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const DeleteRoleModal = ({ isOpen, onClose, role, roles, onDelete }) => {
  if (!isOpen) return null;

  const [reassignTo, setReassignTo] = useState("");
  const availableRoles = roles.filter((r) => r.name !== role.name);

  const handleDelete = () => {
    onDelete(role, reassignTo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Delete Role</h2>
            <p className="mt-1 text-sm text-gray-500">
              This action cannot be undone
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete the role "{role.name}"? This role has{" "}
            {role.users.length} users assigned to it.
          </p>

          {role.users.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reassign Users To
              </label>
              <select
                value={reassignTo}
                onChange={(e) => setReassignTo(e.target.value)}
                className="block w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">Select a role</option>
                {availableRoles.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={role.users.length > 0 && !reassignTo}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoleModal; 