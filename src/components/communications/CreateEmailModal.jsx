import { useState } from "react";
import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateEmailModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    template: "newsletter",
    type: "marketing",
    target: "all",
    scheduledFor: "",
    targetSegments: [],
    content: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const templates = [
    { id: "newsletter", name: "Monthly Newsletter" },
    { id: "welcome", name: "Welcome Email" },
    { id: "points_update", name: "Points Update" },
    { id: "promotion", name: "Promotional Email" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-4xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Create Email Campaign
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Campaign Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Template
                  </label>
                  <select
                    value={formData.template}
                    onChange={(e) =>
                      setFormData({ ...formData, template: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  >
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                />
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
                  <option value="all">All Subscribers</option>
                  <option value="segment">Specific Segments</option>
                  <option value="tier">By Tier</option>
                </select>
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
                                  targetSegments:
                                    formData.targetSegments.filter(
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
                {formData.scheduledFor ? "Schedule Campaign" : "Send Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmailModal;
