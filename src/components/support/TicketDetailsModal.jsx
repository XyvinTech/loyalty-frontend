import { XMarkIcon, PaperClipIcon } from "@heroicons/react/24/outline";

const TicketDetailsModal = ({ ticket, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {ticket.subject}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Ticket ID: {ticket.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Ticket Info */}
            <div className="grid grid-cols-4 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-500">Status</span>
                <span
                  className={`mt-1 block px-2 py-1 text-xs font-medium rounded-full w-fit ${
                    ticket.status === "open"
                      ? "bg-green-100 text-green-800"
                      : ticket.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Priority</span>
                <span
                  className={`mt-1 block px-2 py-1 text-xs font-medium rounded-full w-fit ${
                    ticket.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : ticket.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {ticket.priority}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Category</span>
                <p className="mt-1 font-medium">{ticket.category}</p>
              </div>
              <div>
                <span className="text-gray-500">Created</span>
                <p className="mt-1 font-medium">
                  {new Date(ticket.date).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Customer Details
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Name</span>
                  <p className="font-medium">{ticket.customer.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Phone</span>
                  <p className="font-medium">{ticket.customer.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email</span>
                  <p className="font-medium">{ticket.customer.email}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
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
                  placeholder="Type your reply..."
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
    </div>
  );
};

export default TicketDetailsModal;
