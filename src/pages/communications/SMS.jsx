import { useState } from "react";
import {
  ChatBubbleLeftRightIcon,
  PlusIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import CreateSMSModal from "../../components/communications/CreateSMSModal";

const SMS = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: "Points Balance Update",
      message: "Your current points balance is 1,200. Visit our app to redeem!",
      type: "transactional",
      target: "segment",
      status: "sent",
      sentAt: "2024-02-20T10:00:00",
      sentTo: 500,
      delivered: 495,
      failed: 5,
    },
    {
      id: 2,
      title: "New Offer Alert",
      message:
        "Exclusive offer: Get 2X points on all transactions this weekend!",
      type: "promotional",
      target: "all",
      status: "scheduled",
      sentAt: "2024-02-25T09:00:00",
      sentTo: 0,
      delivered: 0,
      failed: 0,
    },
    {
      id: 3,
      title: "Welcome Message",
      message:
        "Welcome to Khedmah Rewards! Start earning points on every purchase.",
      type: "automated",
      target: "segment",
      status: "sent",
      sentAt: "2024-02-18T14:30:00",
      sentTo: 75,
      delivered: 73,
      failed: 2,
    },
    {
      id: 4,
      title: "Tier Upgrade",
      message:
        "Congratulations! You've been upgraded to Gold tier. Enjoy higher rewards!",
      type: "transactional",
      target: "segment",
      status: "sent",
      sentAt: "2024-02-15T16:45:00",
      sentTo: 120,
      delivered: 118,
      failed: 2,
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">SMS Messages</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Create Message
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sent</p>
              <p className="text-2xl font-semibold text-gray-900">2,543</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Rate</p>
              <p className="text-2xl font-semibold text-gray-900">98.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Recipients</p>
              <p className="text-2xl font-semibold text-gray-900">1.2K</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Failed</p>
              <p className="text-2xl font-semibold text-gray-900">15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Messages</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {message.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {message.message}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="text-xs text-gray-500">
                      Sent: {new Date(message.sentAt).toLocaleString()}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        message.status === "sent"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {message.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      Type: {message.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Sent to: {message.sentTo}
                  </p>
                  <p className="text-sm text-green-600">
                    Delivered: {message.delivered}
                  </p>
                  {message.failed > 0 && (
                    <p className="text-sm text-red-600">
                      Failed: {message.failed}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Message Modal */}
      {isCreateModalOpen && (
        <CreateSMSModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SMS;
