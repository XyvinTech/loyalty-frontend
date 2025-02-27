import { XMarkIcon } from "@heroicons/react/24/outline";

const EmailTemplatePreview = ({ isOpen, onClose, template }) => {
  if (!isOpen) return null;

  const previewContent = template.content.replace(
    /{{(\w+)}}/g,
    (match, variable) => {
      // Sample preview data
      const previewData = {
        points_balance: "1,250",
        customer_name: "John Doe",
        tier_name: "Gold",
        points_earned: "100",
        transaction_details: "Purchase at Store XYZ",
        current_balance: "1,350",
        recent_transactions: "3 recent purchases",
        available_offers: "2 exclusive offers",
        offer_details: "Double points on weekend shopping",
        expiry_date: "March 31, 2024",
        points_required: "500",
      };
      return previewData[variable] || match;
    }
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-4xl">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Template Preview
              </h3>
              <p className="mt-1 text-sm text-gray-500">{template.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div className="border-b pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    Khedmah Rewards &lt;rewards@khedmah.com&gt;
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {template.subject || "Sample Subject"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: previewContent }}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Variables Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {template.variables.map((variable) => (
                  <div
                    key={variable}
                    className="text-xs bg-white px-2 py-1 rounded border"
                  >
                    <span className="text-gray-500">{variable}:</span>{" "}
                    <span className="text-gray-900">
                      {
                        previewContent.match(
                          new RegExp(`{{${variable}}}(.+?){{|$}`)
                        )?.[1]
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatePreview;
