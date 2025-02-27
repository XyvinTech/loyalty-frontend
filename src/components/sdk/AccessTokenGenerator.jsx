import { useState } from "react";
import {
  KeyIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const AccessTokenGenerator = () => {
  const [token, setToken] = useState(null);
  const [showToken, setShowToken] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const generateNewToken = async () => {
    setIsGenerating(true);
    try {
      // API call to generate token
      const response = await fetch("/api/sdk/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Add any necessary configuration
        body: JSON.stringify({
          appId: "your_app_id",
          permissions: ["points", "redemption", "user"],
        }),
      });

      const data = await response.json();
      setToken(data.token);
      setShowToken(true);
      setShowConfirmDialog(false);
    } catch (error) {
      toast.error("Failed to generate token");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    toast.success("Token copied to clipboard");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <KeyIcon className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-medium text-gray-900">
              SDK Access Token
            </h2>
          </div>
          {!token && (
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Generate New Token
            </button>
          )}
        </div>

        {token ? (
          <div className="mt-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 font-mono text-sm">
                  {showToken ? token : "••••••••••••••••••••••••••••••••"}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setShowToken(!showToken)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    {showToken ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <DocumentDuplicateIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important Notice
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>This token will only be shown once. Please:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Copy and store it securely</li>
                      <li>Don't share it publicly</li>
                      <li>Use environment variables in your application</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-600">
            Generate an access token to integrate with our SDK. This token
            provides secure access to API functionalities.
          </p>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Generate New Token?
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                This will invalidate any existing tokens. Applications using the
                old token will need to be updated.
              </p>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={generateNewToken}
                  disabled={isGenerating}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400"
                >
                  {isGenerating ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessTokenGenerator;
