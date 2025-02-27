import { useState } from "react";
import { XMarkIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import Modal from "../common/Modal";

const UserSessionsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const sessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      ipAddress: "192.168.1.1",
      location: "New York, US",
      lastActive: "2 minutes ago",
      status: "active",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      ipAddress: "192.168.1.2",
      location: "New York, US",
      lastActive: "1 hour ago",
      status: "active",
    },
    {
      id: 3,
      device: "Firefox on MacOS",
      ipAddress: "192.168.1.3",
      location: "New York, US",
      lastActive: "2 days ago",
      status: "expired",
    },
  ];

  const handleTerminateSession = (sessionId) => {
    // Handle session termination
    console.log("Terminating session:", sessionId);
  };

  const handleTerminateAllSessions = () => {
    // Handle terminating all sessions
    console.log("Terminating all sessions");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Active Sessions
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage active sessions for {user.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ComputerDesktopIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {session.device}
                    </div>
                    <div className="text-xs text-gray-500">
                      {session.ipAddress} • {session.location}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Last active: {session.lastActive}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {session.status.toUpperCase()}
                  </span>
                  {session.status === "active" && (
                    <button
                      onClick={() => handleTerminateSession(session.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Terminate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center pt-6 border-t">
            <p className="text-sm text-gray-500">
              {sessions.filter((s) => s.status === "active").length} active
              sessions
            </p>
            <button
              onClick={handleTerminateAllSessions}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
            >
              Terminate All Sessions
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserSessionsModal;
