import { useState } from "react";
import AccessTokenGenerator from "../../components/sdk/AccessTokenGenerator";
import {
  CodeBracketIcon,
  BookOpenIcon,
  KeyIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

const SDKManagement = () => {
  const [activeTab, setActiveTab] = useState("sdk"); // sdk or api

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          SDK & API Access
        </h1>
        <a
          href="/docs/integration"
          className="flex items-center text-sm text-green-600 hover:text-green-700"
        >
          <BookOpenIcon className="w-5 h-5 mr-1" />
          View Documentation
        </a>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("sdk")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "sdk"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            SDK Integration
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "api"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            API Access
          </button>
        </nav>
      </div>

      {activeTab === "sdk" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AccessTokenGenerator
            type="sdk"
            title="SDK Access Token"
            description="Generate a token for SDK integration with your applications"
            permissions={["points", "redemption", "user"]}
          />

          {/* SDK Integration Guide */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <CodeBracketIcon className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-medium text-gray-900">Quick Start</h2>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  1. Install the SDK
                </h3>
                <pre className="mt-2 bg-gray-50 p-3 rounded-lg text-sm">
                  npm install @khedmah/loyalty-sdk
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  2. Initialize the SDK
                </h3>
                <pre className="mt-2 bg-gray-50 p-3 rounded-lg text-sm">
                  {`import { KhedmahSDK } from '@khedmah/loyalty-sdk';

const sdk = new KhedmahSDK({
  token: 'YOUR_ACCESS_TOKEN',
  environment: 'production'
});`}
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  3. Make API Calls
                </h3>
                <pre className="mt-2 bg-gray-50 p-3 rounded-lg text-sm">
                  {`// Example: Get user points
const points = await sdk.points.getBalance(userId);

// Example: Record a transaction
await sdk.points.record({
  userId,
  amount: 100,
  type: 'purchase'
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AccessTokenGenerator
            type="api"
            title="API Access Token"
            description="Generate a token for direct API integration"
            permissions={["read", "write", "admin"]}
          />

          {/* API Documentation */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <TableCellsIcon className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-medium text-gray-900">
                API Endpoints
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Authentication
                </h3>
                <pre className="mt-2 bg-gray-50 p-3 rounded-lg text-sm">
                  {`// Add to all API requests
headers: {
  'Authorization': 'Bearer YOUR_API_TOKEN'
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Example Request
                </h3>
                <pre className="mt-2 bg-gray-50 p-3 rounded-lg text-sm">
                  {`curl -X POST https://api.khedmah.com/v1/points/award \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "123",
    "points": 100,
    "reason": "purchase"
  }'`}
                </pre>
              </div>
            </div>
          </div>

          {/* Active Tokens Table */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Active API Tokens
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Token Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Used
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Example row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Production API
                        </div>
                        <div className="text-sm text-gray-500">Read, Write</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2024-02-20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 hours ago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900">
                          Revoke
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SDKManagement;
