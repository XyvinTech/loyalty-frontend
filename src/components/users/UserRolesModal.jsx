import {
  XMarkIcon,
  ShieldCheckIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";

const UserRolesModal = ({ isOpen, onClose, user, roles }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const userRole = roles.find((r) => r.name === user.role);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">User Role</h2>
              <p className="mt-1 text-sm text-gray-500">
                Role information for {user.name}
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span className="font-medium">{user.role}</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate("/privacy?tab=roles");
                  }}
                  className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                >
                  Manage Roles
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Role Details */}
            {userRole && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-600">{userRole.description}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Access Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {userRole.permissions.slice(0, 3).map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                      >
                        {perm}
                      </span>
                    ))}
                    {userRole.permissions.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        + {userRole.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500">
              To modify role assignments, please visit the{" "}
              <button
                onClick={() => {
                  onClose();
                  navigate("/privacy?tab=roles");
                }}
                className="text-green-600 hover:text-green-700"
              >
                Role Management
              </button>{" "}
              section
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserRolesModal;
