import { useState } from "react";
import {
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import EmailTemplateEditor from "../../components/communications/EmailTemplateEditor";
import EmailTemplatePreview from "../../components/communications/EmailTemplatePreview";

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: "newsletter",
      name: "Monthly Newsletter",
      description: "Monthly newsletter template with points update",
      lastUsed: "2024-02-20",
      status: "active",
      subject: "Your Monthly Points Update & Latest Offers",
      content: `
        <h1>Hello {{customer_name}},</h1>
        <p>Here's your monthly points update from Khedmah Rewards!</p>
        
        <div style="margin: 20px 0; padding: 20px; background: #f3f4f6; border-radius: 8px;">
          <h2>Your Points Summary</h2>
          <p>Current Balance: <strong>{{points_balance}} points</strong></p>
          <p>Recent Activity: {{recent_transactions}}</p>
        </div>

        <h3>Available Offers</h3>
        <p>{{available_offers}}</p>

        <p>Visit our app to explore more rewards and offers!</p>
        
        <p>Best regards,<br>Khedmah Rewards Team</p>
      `,
      variables: [
        "points_balance",
        "recent_transactions",
        "available_offers",
        "customer_name",
      ],
      preview: "/path/to/preview.png",
    },
    {
      id: "welcome",
      name: "Welcome Email",
      description: "Welcome new members to the loyalty program",
      lastUsed: "2024-02-19",
      status: "active",
      variables: ["customer_name", "points_balance", "tier_name"],
      preview: "/path/to/preview.png",
    },
    {
      id: "points_update",
      name: "Points Update",
      description: "Notify customers about points changes",
      lastUsed: "2024-02-18",
      status: "active",
      variables: ["points_earned", "transaction_details", "current_balance"],
      preview: "/path/to/preview.png",
    },
  ]);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Email Templates
        </h1>
        <button
          onClick={() => setIsEditorOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {template.description}
              </p>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Last used: {new Date(template.lastUsed).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      template.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {template.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    setPreviewTemplate(template);
                    setIsPreviewOpen(true);
                  }}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Preview
                </button>
                <button
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsEditorOpen(true);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                >
                  Edit
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                  Duplicate
                </button>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Available Variables
              </h4>
              <div className="flex flex-wrap gap-2">
                {template.variables.map((variable) => (
                  <code
                    key={variable}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {`{{${variable}}}`}
                  </code>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditorOpen && (
        <EmailTemplateEditor
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setSelectedTemplate(null);
          }}
          template={selectedTemplate}
        />
      )}

      {isPreviewOpen && (
        <EmailTemplatePreview
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setPreviewTemplate(null);
          }}
          template={previewTemplate}
        />
      )}
    </div>
  );
};

export default EmailTemplates;
