import { useState } from "react";
import {
  SwatchIcon,
  DocumentDuplicateIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const UIComponents = () => {
  const [components, setComponents] = useState([
    {
      id: 1,
      name: "Points Balance Widget",
      type: "widget",
      status: "active",
      lastUpdated: "2024-02-20T10:00:00",
      preview: "/path/to/preview.png",
      settings: {
        showIcon: true,
        showBalance: true,
        showTier: true,
      },
    },
    // Add more components
  ]);

  const [activeTab, setActiveTab] = useState("components"); // components, theme

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">SDK UI Components</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex -mb-px">
          {["components", "theme"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "components" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <div
              key={component.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {component.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Last updated:{" "}
                  {new Date(component.lastUpdated).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                    Edit
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                    Preview
                  </button>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      component.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {component.status}
                  </span>
                  <button className="text-gray-500 hover:text-gray-700">
                    <DocumentDuplicateIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "theme" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Theme customization options */}
        </div>
      )}
    </div>
  );
};

export default UIComponents; 