import { useState, useEffect } from "react";
import RedemptionRulesModal from "../../components/points/RedemptionRulesModal";
import ExpirationRulesModal from "../../components/points/ExpirationRulesModal";
import UpcomingExpirations from "../../components/points/UpcomingExpirations";
import ConversionRulesModal from "../../components/points/ConversionRulesModal";
import ConversionCalculator from "../../components/points/ConversionCalculator";
import ConversionHistory from "../../components/points/ConversionHistory";
import {
  ClockIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const PointsManagement = () => {
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);

  // Add conversion rules state
  const [conversionRules, setConversionRules] = useState({
    pointsToCoins: {
      rate: 10, // 10 points = 1 coin
      minimumPoints: 100,
      maximumPerDay: 1000,
      enabled: true,
    },
    tierBonuses: {
      silver: 0,
      gold: 5,
      platinum: 10,
    },
    restrictions: {
      requireKYC: true,
      allowPartial: false,
      cooldownHours: 24,
    },
    specialRates: [
      {
        name: "Weekend Bonus",
        multiplier: 1.2,
        startDay: 5, // Friday
        endDay: 6, // Saturday
        enabled: true,
      },
    ],
  });

  const [stats, setStats] = useState({
    redemption: {
      total: 0,
      rate: 0,
      avgPoints: 0,
      trend: "up",
    },
    expiration: {
      upcoming30Days: 0,
      riskAmount: 0,
      affectedUsers: 0,
      preventionRate: 0,
    },
    categories: {
      food: { volume: 0, change: 5 },
      retail: { volume: 0, change: -2 },
      travel: { volume: 0, change: 8 },
    },
  });

  useEffect(() => {
    // Fetch stats from API
    setStats({
      redemption: {
        total: 125000,
        rate: 68,
        avgPoints: 450,
        trend: "up",
      },
      expiration: {
        upcoming30Days: 50000,
        riskAmount: 15000,
        affectedUsers: 230,
        preventionRate: 85,
      },
      categories: {
        food: { volume: 45000, change: 5 },
        retail: { volume: 35000, change: -2 },
        travel: { volume: 25000, change: 8 },
      },
    });

    // Fetch conversion rules
    // This would be an API call in production
    // setConversionRules(await fetchConversionRules());
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Redemption Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
              <h3 className="ml-2 text-lg font-medium">Redemption Stats</h3>
            </div>
            <span className="flex items-center text-sm text-green-600">
              {stats.redemption.trend === "up" ? (
                <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
              )}
              {stats.redemption.rate}%
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Points</p>
              <p className="text-xl font-semibold">
                {stats.redemption.total.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Per Redemption</p>
              <p className="text-xl font-semibold">
                {stats.redemption.avgPoints.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Expiration Risk */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
              <h3 className="ml-2 text-lg font-medium">Expiration Risk</h3>
            </div>
            <span className="text-sm text-yellow-600">Next 30 Days</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">At Risk</p>
              <p className="text-xl font-semibold">
                {stats.expiration.riskAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Affected Users</p>
              <p className="text-xl font-semibold">
                {stats.expiration.affectedUsers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
              <h3 className="ml-2 text-lg font-medium">Category Performance</h3>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {Object.entries(stats.categories).map(([category, data]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm capitalize">{category}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    {data.volume.toLocaleString()}
                  </span>
                  <span
                    className={`ml-2 text-xs ${
                      data.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {data.change >= 0 ? "+" : ""}
                    {data.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Configuration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowPathIcon className="w-8 h-8 text-green-600" />
              <h3 className="ml-3 text-lg font-medium">Redemption Rules</h3>
            </div>
            <button
              onClick={() => setShowRedemptionModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Configure
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Set up point redemption criteria, thresholds, and restrictions
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClockIcon className="w-8 h-8 text-green-600" />
              <h3 className="ml-3 text-lg font-medium">Expiration Rules</h3>
            </div>
            <button
              onClick={() => setShowExpirationModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Configure
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Manage point expiration policies and grace periods
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
              <h3 className="ml-3 text-lg font-medium">Points Conversion</h3>
            </div>
            <button
              onClick={() => setShowConversionModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Configure
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Manage conversion rates between points and Khedmah coins
          </p>
        </div>
      </div>

      {/* Conversion Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionCalculator rules={conversionRules} />
        <ConversionHistory />
      </div>

      {/* Upcoming Expirations Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <UpcomingExpirations />
      </div>

      {/* Modals */}
      <RedemptionRulesModal
        isOpen={showRedemptionModal}
        onClose={() => setShowRedemptionModal(false)}
      />
      <ExpirationRulesModal
        isOpen={showExpirationModal}
        onClose={() => setShowExpirationModal(false)}
      />
      <ConversionRulesModal
        isOpen={showConversionModal}
        onClose={() => setShowConversionModal(false)}
        rules={conversionRules}
        onUpdate={setConversionRules}
      />
    </div>
  );
};

export default PointsManagement;
