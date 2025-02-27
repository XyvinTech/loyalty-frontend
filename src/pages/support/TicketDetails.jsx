import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChatBubbleLeftIcon, PaperClipIcon } from "@heroicons/react/24/outline";

const TicketDetails = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");

  const ticket = {
    id: "TKT-001",
    customer: "Ahmed Ali",
    subject: "Points Not Credited",
    category: "Points",
    priority: "high",
    status: "open",
    createdAt: "2024-02-20T10:30:00",
    lastUpdated: "2024-02-20T14:20:00",
    messages: [
      {
        id: 1,
        sender: "Ahmed Ali",
        type: "customer",
        message: "My points from last transaction were not credited to my account.",
        timestamp: "2024-02-20T10:30:00",
      },
      {
        id: 2,
        type: "agent",
        sender: "Support Agent",
        message: "Could you please provide your transaction reference number?",
        timestamp: "2024-02-20T10:35:00",
      },
    ],
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Ticket Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {ticket.subject}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Ticket ID: {ticket.id}</p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  ticket.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {ticket.priority}
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  ticket.status === "open"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Customer</span>
              <p className="font-medium">{ticket.customer}</p>
            </div>
            <div>
              <span className="text-gray-500">Category</span>
              <p className="font-medium">{ticket.category}</p>
            </div>
            <div>
              <span className="text-gray-500">Created</span>
              <p className="font-medium">
                {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-6">
          <div className="space-y-6">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "agent" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-lg rounded-lg p-4 ${
                    message.type === "agent"
                      ? "bg-gray-100"
                      : "bg-green-50 text-right"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <div className="mt-6">
            <div className="border rounded-lg">
              <textarea
                rows="4"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 rounded-t-lg"
              />
              <div className="flex items-center justify-between p-3 border-t bg-gray-50 rounded-b-lg">
                <button className="text-gray-500 hover:text-gray-700">
                  <PaperClipIcon className="w-5 h-5" />
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails; 