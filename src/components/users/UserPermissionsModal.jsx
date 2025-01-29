import { useState } from "react";
import { XMarkIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const UserPermissionsModal = ({ isOpen, onClose, user, roles }) => {
  if (!isOpen) return null;

  const userRole = roles.find((r) => r.name === user.role);
  const permissions = userRole?.permissions || [];

  const permissionCategories = {
    customers: ["view_customers", "edit_customers", "delete_customers"],
    points: ["manage_points", "view_points_history"],
    offers: ["create_offers", "edit_offers", "delete_offers"],
    reports: ["view_reports", "export_reports"],
    system: ["manage_roles", "manage_admins", "view_audit_logs"],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              User Permissions
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Permissions for {user.name} ({user.role})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {Object.entries(permissionCategories).map(([category, perms]) => (
            <div key={category} className="space-y-3">
              <h3 className="font-medium text-gray-900 capitalize">
                {category}
              </h3>
              <div className="space-y-2">
                {perms.map((permission) => (
                  <div
                    key={permission}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <span className="text-sm text-gray-700">
                      {permission.split("_").join(" ").toUpperCase()}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        permissions.includes(permission) ||
                        permissions.includes("all")
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheckIcon className="w-5 h-5" />
            <span>Permissions are inherited from the {user.role} role</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPermissionsModal;
