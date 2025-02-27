import { useState } from "react";
import {
  EnvelopeIcon,
  PlusIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import CreateEmailModal from "../../components/communications/CreateEmailModal";

const Email = () => {
  const [emails, setEmails] = useState([
    {
      id: 1,
      title: "Monthly Newsletter",
      subject: "Your Points Update & Latest Offers",
      template: "newsletter",
      type: "marketing",
      target: "all",
      status: "sent",
      sentAt: "2024-02-20T10:00:00",
      sentTo: 1200,
      opened: 840,
      clicked: 320,
      bounced: 5,
    },
    {
      id: 2,
      title: "Welcome Series - Day 1",
      subject: "Welcome to Khedmah Rewards!",
      template: "welcome",
      type: "automated",
      target: "segment",
      status: "active",
      sentAt: "2024-02-19T15:30:00",
      sentTo: 150,
      opened: 125,
      clicked: 95,
      bounced: 0,
    },
    {
      id: 3,
      title: "Special Promotion",
      subject: "Double Points Weekend! 🎉",
      template: "promotion",
      type: "marketing",
      target: "segment",
      status: "scheduled",
      sentAt: "2024-02-25T09:00:00",
      sentTo: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
    },
    {
      id: 4,
      title: "Tier Upgrade Notification",
      subject: "Congratulations on Your Gold Tier Status! 🌟",
      template: "tier_upgrade",
      type: "transactional",
      target: "segment",
      status: "sent",
      sentAt: "2024-02-18T14:00:00",
      sentTo: 75,
      opened: 70,
      clicked: 65,
      bounced: 1,
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Email Communications
          </h1>
          <div className="mt-2 flex items-center gap-4">
            <Link
              to="/communications/email/templates"
              className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              <DocumentDuplicateIcon className="w-4 h-4" />
              Manage Templates
            </Link>
          </div>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sent</p>
              <p className="text-2xl font-semibold text-gray-900">5,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Open Rate</p>
              <p className="text-2xl font-semibold text-gray-900">72%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Click Rate</p>
              <p className="text-2xl font-semibold text-gray-900">28%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <DocumentDuplicateIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Templates</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Campaigns List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Email Campaigns</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {emails.map((email) => (
            <div key={email.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {email.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Subject: {email.subject}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="text-xs text-gray-500">
                      Template: {email.template}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        email.status === "sent"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {email.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      Type: {email.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Sent to: {email.sentTo}
                  </p>
                  <p className="text-sm text-green-600">
                    Opened: {email.opened} (
                    {Math.round((email.opened / email.sentTo) * 100)}%)
                  </p>
                  <p className="text-sm text-blue-600">
                    Clicked: {email.clicked} (
                    {Math.round((email.clicked / email.sentTo) * 100)}%)
                  </p>
                  {email.bounced > 0 && (
                    <p className="text-sm text-red-600">
                      Bounced: {email.bounced}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Email Modal */}
      {isCreateModalOpen && (
        <CreateEmailModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Email;
