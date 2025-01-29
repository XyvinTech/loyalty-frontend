import { useState, useMemo } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const RoleFormModal = ({ isOpen, onClose, role = null, roles }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(
    role || {
      name: "",
      description: "",
      permissions: [],
      parentRole: null,
      inheritedPermissions: [],
    }
  );

  const availablePermissions = {
    customers: [
      "view_customers",
      "edit_customers",
      "delete_customers",
      "export_customers",
    ],
    points: [
      "manage_points",
      "view_points_history",
      "adjust_points",
      "manage_criteria",
    ],
    offers: [
      "create_offers",
      "edit_offers",
      "delete_offers",
      "manage_redemptions",
    ],
    tiers: ["manage_tiers", "view_tiers", "assign_tiers"],
    reports: [
      "view_reports",
      "export_reports",
      "manage_analytics",
      "view_dashboard",
    ],
    system: [
      "manage_roles",
      "manage_admins",
      "view_audit_logs",
      "manage_settings",
    ],
  };

  const effectivePermissions = useMemo(() => {
    const inherited = formData.parentRole
      ? roles.find((r) => r.name === formData.parentRole)?.permissions || []
      : [];
    return [...new Set([...inherited, ...formData.permissions])];
  }, [formData.parentRole, formData.permissions, roles]);

  const availableParentRoles = roles.filter((r) => r.name !== formData.name);

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {role ? "Edit Role" : "Create New Role"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1 block w-full border rounded-lg px-3 py-2"
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full border rounded-lg px-3 py-2"
                  rows="3"
                  placeholder="Describe the role's responsibilities"
                />
              </div>

              {/* Parent Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent Role (Optional)
                </label>
                <div className="mt-1 relative">
                  <select
                    value={formData.parentRole || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        parentRole: e.target.value || null,
                      }))
                    }
                    className="block w-full border rounded-lg px-3 py-2 appearance-none pr-10"
                  >
                    <option value="">No Parent Role</option>
                    {availableParentRoles.map((parentRole) => (
                      <option key={parentRole.name} value={parentRole.name}>
                        {parentRole.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-2 top-2.5" />
                </div>
                {formData.parentRole && (
                  <p className="mt-1 text-sm text-gray-500">
                    Will inherit permissions from {formData.parentRole}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Permissions Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Role Permissions
              </h3>
              {formData.parentRole && (
                <div className="text-sm text-gray-500">
                  Inherited:{" "}
                  {roles.find((r) => r.name === formData.parentRole)
                    ?.permissions.length || 0}{" "}
                  permissions
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(availablePermissions).map(([category, perms]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-gray-900 capitalize">
                    {category}
                  </h4>
                  <div className="space-y-2">
                    {perms.map((permission) => {
                      const isInherited =
                        formData.parentRole &&
                        roles
                          .find((r) => r.name === formData.parentRole)
                          ?.permissions.includes(permission);

                      return (
                        <label
                          key={permission}
                          className={`flex items-center gap-2 text-sm ${
                            isInherited ? "opacity-50" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={effectivePermissions.includes(permission)}
                            onChange={() => handlePermissionToggle(permission)}
                            disabled={isInherited}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-gray-700">
                            {permission.split("_").join(" ").toUpperCase()}
                          </span>
                          {isInherited && (
                            <span className="text-xs text-gray-500">
                              (Inherited)
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-lg"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg">
            {role ? "Update Role" : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleFormModal;
