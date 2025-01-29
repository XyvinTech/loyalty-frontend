import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateSMSModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "promotional",
    target: "all",
    scheduledFor: "",
    targetSegments: [],
  });

  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 160;

  const handleMessageChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setFormData({ ...formData, message: text });
      setCharCount(text.length);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Create SMS Message
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title (Internal Reference)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                placeholder="Campaign title for internal reference"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                value={formData.message}
                onChange={handleMessageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                placeholder="Type your SMS message..."
              />
              <p className="mt-2 text-sm text-gray-500 flex justify-between">
                <span>
                  Use {"{points}"} to include customer's points balance
                </span>
                <span>
                  {charCount}/{MAX_CHARS} characters
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                >
                  <option value="promotional">Promotional</option>
                  <option value="transactional">Transactional</option>
                  <option value="reminder">Reminder</option>
                  <option value="update">Update</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Audience
                </label>
                <select
                  value={formData.target}
                  onChange={(e) =>
                    setFormData({ ...formData, target: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="segment">Specific Segments</option>
                  <option value="tier">By Tier</option>
                </select>
              </div>
            </div>

            {formData.target === "segment" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Segments
                </label>
                <div className="mt-2 space-y-2">
                  {["Active Users", "New Users", "High Value", "At Risk"].map(
                    (segment) => (
                      <label
                        key={segment}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          checked={formData.targetSegments.includes(segment)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                targetSegments: [
                                  ...formData.targetSegments,
                                  segment,
                                ],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                targetSegments: formData.targetSegments.filter(
                                  (s) => s !== segment
                                ),
                              });
                            }
                          }}
                        />
                        {segment}
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Schedule (Optional)
              </label>
              <input
                type="datetime-local"
                value={formData.scheduledFor}
                onChange={(e) =>
                  setFormData({ ...formData, scheduledFor: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3">
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
                Send Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSMSModal;
