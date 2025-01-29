import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateTicketModal = ({ isOpen, onClose, customer = null }) => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "points",
    priority: "medium",
    description: "",
    attachments: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle ticket creation
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Create New Ticket
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!customer && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer ID/Phone
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              >
                <option value="points">Points Related</option>
                <option value="redemption">Redemption Issue</option>
                <option value="technical">Technical Issue</option>
                <option value="account">Account Related</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketModal;
