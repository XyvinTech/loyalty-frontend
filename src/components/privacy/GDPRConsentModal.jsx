import { XMarkIcon } from "@heroicons/react/24/outline";

const GDPRConsentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            GDPR Consent Management
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Consent Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Default Consent Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Marketing Emails</p>
                  <p className="text-sm text-gray-500">
                    Send promotional emails and offers
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              {/* Add more consent options */}
            </div>
          </div>

          {/* Data Subject Rights */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Data Subject Rights
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                <p className="font-medium text-gray-900">Right to Access</p>
                <p className="text-sm text-gray-500">
                  Download personal data report
                </p>
              </button>
              <button className="p-4 border rounded-lg text-left hover:bg-gray-50">
                <p className="font-medium text-gray-900">
                  Right to be Forgotten
                </p>
                <p className="text-sm text-gray-500">Request data deletion</p>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-lg"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GDPRConsentModal;
