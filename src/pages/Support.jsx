import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import CreateTicketModal from "../components/support/CreateTicketModal";
import TicketDetailsModal from "../components/support/TicketDetailsModal";
import CustomerDetailsModal from "../components/support/CustomerDetailsModal";

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sample tickets data
  const sampleTickets = [
    {
      id: "TKT-001",
      customer: {
        id: 1,
        name: "Ahmed Ali",
        phone: "+968 9123 4567",
        email: "ahmed@example.com",
        points: 1200,
        tier: "Gold",
        joinDate: "2023-06-15",
        totalPointsEarned: 3500,
        totalTransactions: 25,
        totalRedemptions: 8,
        activeTickets: 1,
        recentTransactions: [
          {
            id: "TXN-001",
            date: "2024-02-20",
            amount: "120.00",
            points: 120,
            type: "Purchase",
          },
          {
            id: "TXN-002",
            date: "2024-02-18",
            amount: "85.50",
            points: 85,
            type: "Purchase",
          },
        ],
        tickets: [
          {
            id: "TKT-001",
            subject: "Points Not Credited",
            category: "Points",
            status: "open",
            date: "2024-02-20",
            lastUpdated: "2024-02-20",
          },
          {
            id: "TKT-003",
            subject: "App Login Issue",
            category: "Technical",
            status: "resolved",
            date: "2024-02-10",
            lastUpdated: "2024-02-12",
          },
        ],
      },
      subject: "Points Not Credited",
      category: "Points",
      priority: "high",
      status: "open",
      date: "2024-02-20",
      lastUpdated: "2024-02-20",
      description: "Points from my last transaction were not credited",
      messages: [
        {
          id: 1,
          sender: "Ahmed Ali",
          type: "customer",
          message: "My points from last transaction were not credited.",
          timestamp: "2024-02-20T10:30:00",
        },
        {
          id: 2,
          type: "agent",
          sender: "Support Agent",
          message:
            "Could you please provide your transaction reference number?",
          timestamp: "2024-02-20T10:35:00",
        },
      ],
    },
    {
      id: "TKT-002",
      customer: {
        id: 2,
        name: "Sara Mohammed",
        phone: "+968 9876 5432",
        email: "sara@example.com",
        points: 850,
        tier: "Silver",
        joinDate: "2023-09-10",
        totalPointsEarned: 2100,
        totalTransactions: 15,
        totalRedemptions: 4,
        activeTickets: 1,
        recentTransactions: [
          {
            id: "TXN-003",
            date: "2024-02-19",
            amount: "75.00",
            points: 75,
            type: "Purchase",
          },
          {
            id: "TXN-004",
            date: "2024-02-15",
            amount: "150.00",
            points: 150,
            type: "Purchase",
          },
          {
            id: "TXN-005",
            date: "2024-02-10",
            amount: "-50.00",
            points: -500,
            type: "Redemption",
          },
        ],
        tickets: [
          {
            id: "TKT-002",
            subject: "Unable to Redeem Offer",
            category: "Redemption",
            status: "in_progress",
            date: "2024-02-19",
            lastUpdated: "2024-02-20",
          },
          {
            id: "TKT-004",
            subject: "Points Balance Inquiry",
            category: "Points",
            status: "resolved",
            date: "2024-01-25",
            lastUpdated: "2024-01-26",
          },
        ],
      },
      subject: "Unable to Redeem Offer",
      category: "Redemption",
      priority: "medium",
      status: "in_progress",
      date: "2024-02-19",
      lastUpdated: "2024-02-20",
      description: "Error when trying to redeem merchant offer",
      messages: [
        {
          id: 1,
          sender: "Sara Mohammed",
          type: "customer",
          message: "I'm getting an error when trying to redeem the KFC offer",
          timestamp: "2024-02-19T15:30:00",
        },
        {
          id: 2,
          type: "agent",
          sender: "Support Agent",
          message:
            "We're looking into this issue. Could you please try again in a few minutes?",
          timestamp: "2024-02-19T15:35:00",
        },
      ],
    },
    {
      id: "TKT-003",
      customer: {
        id: 3,
        name: "Fatima Al Balushi",
        phone: "+968 9555 1234",
        email: "fatima@example.com",
        points: 2500,
        tier: "Platinum",
        joinDate: "2023-03-20",
        totalPointsEarned: 6000,
        totalTransactions: 45,
        totalRedemptions: 12,
        activeTickets: 0,
        recentTransactions: [
          {
            id: "TXN-006",
            date: "2024-02-18",
            amount: "300.00",
            points: 300,
            type: "Purchase",
          },
          {
            id: "TXN-007",
            date: "2024-02-16",
            amount: "-100.00",
            points: -1000,
            type: "Redemption",
          },
        ],
        tickets: [
          {
            id: "TKT-005",
            subject: "Tier Upgrade Request",
            category: "Tier",
            status: "resolved",
            date: "2024-01-15",
            lastUpdated: "2024-01-16",
          },
        ],
      },
      subject: "Mobile App Feedback",
      category: "Technical",
      priority: "low",
      status: "resolved",
      date: "2024-02-15",
      lastUpdated: "2024-02-16",
      description: "Suggestions for app improvement",
      messages: [
        {
          id: 1,
          sender: "Fatima Al Balushi",
          type: "customer",
          message:
            "I have some suggestions for improving the mobile app experience",
          timestamp: "2024-02-15T11:30:00",
        },
        {
          id: 2,
          type: "agent",
          sender: "Support Agent",
          message:
            "Thank you for your feedback. We'll forward this to our development team.",
          timestamp: "2024-02-15T11:45:00",
        },
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Customer Support
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Create Ticket
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <select className="text-sm border-gray-300 rounded-md">
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select className="text-sm border-gray-300 rounded-md">
            <option value="all">All Categories</option>
            <option value="points">Points</option>
            <option value="redemption">Redemption</option>
            <option value="technical">Technical</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {ticket.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setSelectedCustomer(ticket.customer)}
                    className="text-sm text-green-600 hover:text-green-900"
                  >
                    View Profile
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {ticket.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {ticket.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(ticket.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="text-green-600 hover:text-green-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

export default Support;
