import { useState } from "react";
import { XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const CustomerDetailsModal = ({ customer, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview"); // overview, transactions, tickets

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-4">
              <UserCircleIcon className="w-12 h-12 text-gray-400" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {customer.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Customer ID: {customer.id}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <nav className="flex -mb-px">
              {["overview", "transactions", "tickets"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">Phone</label>
                        <p className="text-sm font-medium">{customer.phone}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Email</label>
                        <p className="text-sm font-medium">{customer.email}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Join Date
                        </label>
                        <p className="text-sm font-medium">
                          {new Date(customer.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">
                      Loyalty Status
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500">Tier</label>
                        <p className="text-sm font-medium">{customer.tier}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Available Points
                        </label>
                        <p className="text-sm font-medium">{customer.points}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          Total Points Earned
                        </label>
                        <p className="text-sm font-medium">
                          {customer.totalPointsEarned || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Summary */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">
                    Activity Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-semibold text-gray-900">
                        {customer.totalTransactions || 0}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total Transactions
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-semibold text-gray-900">
                        {customer.totalRedemptions || 0}
                      </p>
                      <p className="text-sm text-gray-500">Total Redemptions</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-semibold text-gray-900">
                        {customer.activeTickets || 0}
                      </p>
                      <p className="text-sm text-gray-500">Active Tickets</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Transaction ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customer.recentTransactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(txn.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {txn.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {txn.type}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {txn.amount} OMR
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {txn.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "tickets" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Ticket ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Created
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customer.tickets?.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {ticket.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {ticket.subject}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            {ticket.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              ticket.status === "open"
                                ? "bg-green-100 text-green-800"
                                : ticket.status === "in_progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(ticket.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(
                            ticket.lastUpdated || ticket.date
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
