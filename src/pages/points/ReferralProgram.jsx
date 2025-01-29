import { useState } from "react";
import {
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import GenerateReferralLinkModal from "../../components/referrals/GenerateReferralLinkModal";

const ReferralProgram = () => {
  const [settings, setSettings] = useState({
    referrerPoints: 100,
    refereePoints: 50,
    minimumPurchase: 50,
    expiryDays: 30,
    maxReferrals: 10,
    isActive: true,
  });

  const [referrals] = useState([
    {
      id: 1,
      referrer: {
        id: "USR123",
        name: "John Doe",
        email: "john@example.com",
      },
      referee: {
        id: "USR456",
        name: "Jane Smith",
        email: "jane@example.com",
      },
      status: "completed", // pending, completed, expired
      pointsAwarded: {
        referrer: 100,
        referee: 50,
      },
      purchaseAmount: 150,
      createdAt: "2024-02-20T10:00:00",
      completedAt: "2024-02-21T15:30:00",
    },
    // More referral data...
  ]);

  const stats = {
    totalReferrals: 156,
    activeReferrals: 45,
    completedReferrals: 98,
    expiredReferrals: 13,
    totalPointsAwarded: 24500,
    conversionRate: "63%",
  };

  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
    search: "",
  });
  const [isGenerateLinkModalOpen, setIsGenerateLinkModalOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Referral Program Management
        </h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Update Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Referrals</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalReferrals}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.activeReferrals}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.completedReferrals}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Expired</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.expiredReferrals}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Points Awarded</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalPointsAwarded}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.conversionRate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Program Settings */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Program Settings
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Points for Referrer
            </label>
            <input
              type="number"
              value={settings.referrerPoints}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  referrerPoints: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Points for Referee
            </label>
            <input
              type="number"
              value={settings.refereePoints}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  refereePoints: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Purchase Amount
            </label>
            <input
              type="number"
              value={settings.minimumPurchase}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  minimumPurchase: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Days
            </label>
            <input
              type="number"
              value={settings.expiryDays}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  expiryDays: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Referrals per User
            </label>
            <input
              type="number"
              value={settings.maxReferrals}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxReferrals: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Program Status
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={settings.isActive}
                  onChange={(e) =>
                    setSettings({ ...settings, isActive: e.target.checked })
                  }
                  className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Program Active
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Referral List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Referrals
            </h2>
            <button
              onClick={() => setIsGenerateLinkModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Generate Link
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search referrals..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-3 text-sm"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={filters.dateRange}
              onChange={(e) =>
                setFilters({ ...filters, dateRange: e.target.value })
              }
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>

            <button className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <FunnelIcon className="w-5 h-5" />
              More Filters
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {referrals.map((referral) => (
            <div key={referral.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {referral.referrer.name} → {referral.referee.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Referral ID: {referral.id}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        referral.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : referral.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {referral.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Points: {referral.pointsAwarded.referrer} /{" "}
                      {referral.pointsAwarded.referee}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(referral.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add the modal */}
      {isGenerateLinkModalOpen && (
        <GenerateReferralLinkModal
          isOpen={isGenerateLinkModalOpen}
          onClose={() => setIsGenerateLinkModalOpen(false)}
          customerId="DEMO123"
        />
      )}
    </div>
  );
};

export default ReferralProgram;
