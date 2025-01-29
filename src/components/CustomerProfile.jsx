import { useState } from "react";
import {
  UserCircleIcon,
  ChartBarIcon,
  TagIcon,
  UsersIcon,
  GiftIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  BoltIcon,
  SparklesIcon,
  StarIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  FunnelIcon,
  CalendarIcon,
  ChartPieIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import TransactionDetailsModal from "./TransactionDetailsModal";

const CustomerProfile = ({ customer }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", name: "Overview", icon: UserCircleIcon },
    { id: "activity", name: "Activity", icon: ChartBarIcon },
    { id: "segments", name: "Segments", icon: TagIcon },
    { id: "family", name: "Family", icon: UsersIcon },
    { id: "rewards", name: "Rewards", icon: GiftIcon },
    { id: "history", name: "History", icon: ClockIcon },
  ];

  const renderActivityTab = () => (
    <div className="space-y-6">
      {/* Activity Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingBagIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Purchases</p>
              <p className="text-xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CurrencyDollarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Transaction</p>
              <p className="text-xl font-semibold text-gray-900">$642.50</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ArrowPathIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Points Redeemed</p>
              <p className="text-xl font-semibold text-gray-900">1,250</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ArrowTrendingUpIcon className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Growth Rate</p>
              <p className="text-xl font-semibold text-gray-900">+15%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {customer.pointsHistory.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    activity.type === "Earned" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {activity.type === "Earned" ? (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowPathIcon className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.source}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    activity.type === "Earned"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {activity.type === "Earned" ? "+" : "-"}
                  {activity.points} points
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Chart */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Points Activity Trend
        </h3>
        <div className="h-64 bg-gray-50 rounded-lg p-4">
          {/* Add chart component here */}
          <p className="text-sm text-gray-500 text-center">
            Chart component will be added here
          </p>
        </div>
      </div>
    </div>
  );

  const renderSegmentsTab = () => (
    <div className="space-y-6">
      {/* Current Segments */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Active Segments
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <StarIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-medium text-blue-900">High Value</h4>
            </div>
            <p className="text-sm text-blue-700">
              Customer with high spending and engagement
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BoltIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-medium text-purple-900">Early Adopter</h4>
            </div>
            <p className="text-sm text-purple-700">
              Among first users of new features
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <SparklesIcon className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-medium text-green-900">Frequent Buyer</h4>
            </div>
            <p className="text-sm text-green-700">
              Regular transaction activity
            </p>
          </div>
        </div>
      </div>

      {/* Segment Criteria */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Segment Criteria
        </h3>
        <div className="bg-white border rounded-lg divide-y">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">High Value</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Customers with significant spending
                </p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Lifetime spend &gt; $10,000</p>
                <p>Average order &gt; $500</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Early Adopter</h4>
                <p className="text-sm text-gray-500 mt-1">
                  First to try new features
                </p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Joined within first month</p>
                <p>Uses new features within 7 days</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Frequent Buyer</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Regular purchasing pattern
                </p>
              </div>
              <div className="text-sm text-gray-500">
                <p>&gt;2 purchases per month</p>
                <p>&gt;24 purchases per year</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segment History */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Segment Changes
        </h3>
        <div className="bg-white border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Segment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  2024-01-20
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    High Value
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Added
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Exceeded spending threshold
                </td>
              </tr>
              {/* Add more history rows */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFamilyTab = () => (
    <div className="space-y-6">
      {/* Family Group Summary */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Family Group</h3>
            <p className="text-sm text-gray-500 mt-1">
              Share benefits and points with family members
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Add Member
          </button>
        </div>

        {/* Group Settings */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Group Status</p>
            <p className="text-lg font-semibold text-gray-900">Active</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Members</p>
            <p className="text-lg font-semibold text-gray-900">3 / 5</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Shared Points</p>
            <p className="text-lg font-semibold text-gray-900">1,250</p>
          </div>
        </div>

        {/* Members List */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Members</h4>
          <div className="space-y-4">
            {/* Primary Member */}
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {customer.name}
                  </p>
                  <p className="text-xs text-gray-500">{customer.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    Primary Member
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Family Members */}
            {[
              {
                name: "Sarah White",
                email: "sarah.w@gmail.com",
                relationship: "Spouse",
                points: 750,
              },
              {
                name: "Mike White",
                email: "mike.w@gmail.com",
                relationship: "Child",
                points: 250,
              },
            ].map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between p-4 bg-white border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {member.relationship}
                      </span>
                      <span className="text-xs text-gray-500">
                        {member.points} points
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-red-400 hover:text-red-500">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Family Benefits */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Family Benefits
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Points Sharing</h4>
            </div>
            <p className="text-sm text-gray-500">
              Share and transfer points between family members
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GiftIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900">Family Rewards</h4>
            </div>
            <p className="text-sm text-gray-500">
              Exclusive rewards for family groups
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <StarIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Tier Benefits</h4>
            </div>
            <p className="text-sm text-gray-500">
              Share tier benefits with family members
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRewardsTab = () => (
    <div className="space-y-6">
      {/* Points Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Available Points</p>
          <p className="text-2xl font-semibold text-gray-900">
            {customer.points}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Points Expiring</p>
          <p className="text-2xl font-semibold text-red-600">500</p>
          <p className="text-xs text-gray-500 mt-1">Expires in 30 days</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Next Tier</p>
          <p className="text-2xl font-semibold text-gray-900">Platinum</p>
          <p className="text-xs text-gray-500 mt-1">2,246 points needed</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Redeemed</p>
          <p className="text-2xl font-semibold text-gray-900">3,750</p>
        </div>
      </div>

      {/* Available Rewards */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Available Rewards
          </h3>
          <div className="flex items-center gap-2">
            <select className="text-sm border rounded-lg px-3 py-2">
              <option>All Categories</option>
              <option>Food & Dining</option>
              <option>Shopping</option>
              <option>Travel</option>
            </select>
            <select className="text-sm border rounded-lg px-3 py-2">
              <option>Points: Low to High</option>
              <option>Points: High to Low</option>
              <option>Expiring Soon</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              title: "₹500 off at KFC",
              points: 500,
              expires: "2024-03-01",
              category: "Food",
              image: "https://example.com/kfc.jpg",
            },
            {
              title: "15% off at McDonald's",
              points: 750,
              expires: "2024-02-15",
              category: "Food",
              image: "https://example.com/mcdonalds.jpg",
            },
            // Add more rewards...
          ].map((reward) => (
            <div
              key={reward.title}
              className="border rounded-lg overflow-hidden"
            >
              <div className="h-40 bg-gray-100"></div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900">{reward.title}</h4>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    {reward.points} points
                  </span>
                  <span className="text-xs text-gray-500">
                    Expires {new Date(reward.expires).toLocaleDateString()}
                  </span>
                </div>
                <button className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
                  Redeem Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redemption History */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Redemption History
        </h3>
        <div className="bg-white border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Reward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  date: "2024-01-15",
                  reward: "₹200 off at Pizza Hut",
                  points: 200,
                  status: "Redeemed",
                },
                // Add more history...
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.reward}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => {
    const [dateRange, setDateRange] = useState("all");
    const [transactionType, setTransactionType] = useState("all");
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [customDateRange, setCustomDateRange] = useState({
      start: "",
      end: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [amountRange, setAmountRange] = useState({
      min: "",
      max: "",
    });
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("desc");
    const ITEMS_PER_PAGE = 10;

    // Filter and sort transactions
    const filteredTransactions = transactions
      .filter((transaction) => {
        const matchesSearch =
          transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.merchant
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesType =
          transactionType === "all" || transaction.type === transactionType;

        const matchesAmount =
          (!amountRange.min || transaction.amount >= Number(amountRange.min)) &&
          (!amountRange.max || transaction.amount <= Number(amountRange.max));

        const matchesDate =
          dateRange === "all"
            ? true
            : dateRange === "custom"
            ? new Date(transaction.date) >= new Date(customDateRange.start) &&
              new Date(transaction.date) <= new Date(customDateRange.end)
            : isWithinDateRange(transaction.date, dateRange);

        return matchesSearch && matchesType && matchesAmount && matchesDate;
      })
      .sort((a, b) => {
        const order = sortOrder === "asc" ? 1 : -1;
        return a[sortBy] > b[sortBy] ? order : -order;
      });

    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    const paginatedTransactions = filteredTransactions.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    // Helper function to check if date is within range
    const isWithinDateRange = (date, range) => {
      const txDate = new Date(date);
      const today = new Date();
      switch (range) {
        case "today":
          return txDate.toDateString() === today.toDateString();
        case "week":
          const weekAgo = new Date(today.setDate(today.getDate() - 7));
          return txDate >= weekAgo;
        case "month":
          const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
          return txDate >= monthAgo;
        case "year":
          const yearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
          return txDate >= yearAgo;
        default:
          return true;
      }
    };

    return (
      <div className="space-y-6">
        {/* Transaction Analytics */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Transaction Summary
            </h3>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ChartPieIcon className="w-5 h-5" />
              {showAnalytics ? "Hide Analytics" : "Show Analytics"}
            </button>
          </div>

          {showAnalytics && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
                <p className="text-xs text-green-600 mt-1">
                  +12% vs last month
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Average Transaction</p>
                <p className="text-2xl font-semibold text-gray-900">$98.50</p>
                <p className="text-xs text-red-600 mt-1">-3% vs last month</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Points Earned</p>
                <p className="text-2xl font-semibold text-gray-900">4,521</p>
                <p className="text-xs text-green-600 mt-1">+8% vs last month</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Points Redeemed</p>
                <p className="text-2xl font-semibold text-gray-900">2,150</p>
                <p className="text-xs text-gray-600 mt-1">+0% vs last month</p>
              </div>
            </div>
          )}

          {/* Enhanced Filters */}
          <div className="bg-white border rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by ID or merchant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Min amount"
                    value={amountRange.min}
                    onChange={(e) =>
                      setAmountRange((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Max amount"
                    value={amountRange.max}
                    onChange={(e) =>
                      setAmountRange((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Existing date and type filters */}
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                {dateRange === "custom" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={customDateRange.start}
                      onChange={(e) =>
                        setCustomDateRange((prev) => ({
                          ...prev,
                          start: e.target.value,
                        }))
                      }
                      className="text-sm border rounded-lg px-3 py-2"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="date"
                      value={customDateRange.end}
                      onChange={(e) =>
                        setCustomDateRange((prev) => ({
                          ...prev,
                          end: e.target.value,
                        }))
                      }
                      className="text-sm border rounded-lg px-3 py-2"
                    />
                  </div>
                ) : (
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="text-sm border rounded-lg px-3 py-2"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                )}
              </div>
              <div className="flex items-center gap-2">
                <FunnelIcon className="w-5 h-5 text-gray-400" />
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="text-sm border rounded-lg px-3 py-2"
                >
                  <option value="all">All Types</option>
                  <option value="purchase">Purchases</option>
                  <option value="redemption">Redemptions</option>
                  <option value="refund">Refunds</option>
                  <option value="adjustment">Adjustments</option>
                </select>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split("-");
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder);
                  }}
                  className="text-sm border rounded-lg px-3 py-2"
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="amount-desc">Amount (High to Low)</option>
                  <option value="amount-asc">Amount (Low to High)</option>
                  <option value="points-desc">Points (High to Low)</option>
                  <option value="points-asc">Points (Low to High)</option>
                </select>
                <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.type === "Purchase"
                          ? "bg-green-100 text-green-800"
                          : transaction.type === "Redemption"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={
                        transaction.points >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.points >= 0 ? "+" : ""}
                      {transaction.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.merchant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredTransactions.length
                )}{" "}
                of {filteredTransactions.length} transactions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-lg disabled:opacity-50"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === pageNum
                          ? "bg-green-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded-lg disabled:opacity-50"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details Modal */}
        <TransactionDetailsModal
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
        />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Profile Header */}
      <div className="p-6 border-b">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {customer.name}
              </h2>
              <p className="text-sm text-gray-500">{customer.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {customer.tier}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {customer.segment}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Customer ID</p>
            <p className="text-sm font-medium text-gray-900">
              {customer.customerId}
            </p>
            <p className="mt-2 text-sm text-gray-500">Join Date</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(customer.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Customer Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Total Points</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {customer.points}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Lifetime Points</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {customer.lifetimePoints}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Referrals</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {customer.referralCount}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Categories
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {customer.preferences.categories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Favorite Stores
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {customer.preferences.favoriteStores.map((store) => (
                      <span
                        key={store}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                      >
                        {store}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "activity" && renderActivityTab()}
        {activeTab === "segments" && renderSegmentsTab()}
        {activeTab === "family" && renderFamilyTab()}
        {activeTab === "rewards" && renderRewardsTab()}
        {activeTab === "history" && renderHistoryTab()}
      </div>
    </div>
  );
};

export default CustomerProfile;
