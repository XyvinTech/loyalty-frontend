import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  Squares2X2Icon as ViewGridIcon,
  ListBulletIcon as ViewListIcon,
} from "@heroicons/react/24/outline";
import EditMerchantOfferModal from "../components/offers/EditMerchantOfferModal";
import CreateMerchantOfferModal from "../components/offers/CreateMerchantOfferModal";
import Notification from "../components/Notification";

const MerchantOffers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    pointsRange: "all",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "merchantName",
    direction: "asc",
  });
  const [editingOffer, setEditingOffer] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [notification, setNotification] = useState(null);

  // Add sample merchant offers data
  const sampleMerchantOffers = [
    {
      id: 1,
      merchantName: "Al Chick",
      logo: "/merchant-logo.png",
      title: "20% Off on Bucket Meals",
      pointsRequired: 500,
      validUntil: "Feb 28, 2024",
      status: "active",
    },
    {
      id: 2,
      merchantName: "Arayaf Chicken",
      logo: "/mcdonalds-logo.png",
      title: "Free McFlurry with Any Meal",
      pointsRequired: 300,
      validUntil: "Mar 15, 2024",
      status: "active",
    },
    {
      id: 3,
      merchantName: "Mooya",
      logo: "/pizzahut-logo.png",
      title: "Buy 1 Get 1 Free on Large Pizzas",
      pointsRequired: 800,
      validUntil: "Mar 1, 2024",
      status: "active",
    },
    {
      id: 4,
      merchantName: "Chai King",
      logo: "/starbucks-logo.png",
      title: "50% Off on Any Coffee",
      pointsRequired: 400,
      validUntil: "Feb 25, 2024",
      status: "inactive",
    },
  ];

  // Filter offers
  const filteredOffers = sampleMerchantOffers.filter((offer) => {
    const matchesSearch =
      offer.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "all" || offer.status === filters.status;

    const matchesPoints =
      filters.pointsRange === "all" ||
      (filters.pointsRange === "low" && offer.pointsRequired <= 300) ||
      (filters.pointsRange === "medium" &&
        offer.pointsRequired > 300 &&
        offer.pointsRequired <= 600) ||
      (filters.pointsRange === "high" && offer.pointsRequired > 600);

    return matchesSearch && matchesStatus && matchesPoints;
  });

  // Sort offers
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Merchant Offers
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search offers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Merchant Offer
          </button>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-gray-400" />
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="text-sm border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <select
            value={filters.pointsRange}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, pointsRange: e.target.value }))
            }
            className="text-sm border-gray-300 rounded-md"
          >
            <option value="all">All Points</option>
            <option value="low">Low (≤ 300)</option>
            <option value="medium">Medium (301-600)</option>
            <option value="high">High (&gt; 600)</option>
          </select>

          <div className="flex items-center gap-2">
            <ArrowsUpDownIcon className="w-4 h-4 text-gray-400" />
            <select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={(e) => {
                const [key, direction] = e.target.value.split("-");
                setSortConfig({ key, direction });
              }}
              className="text-sm border-gray-300 rounded-md"
            >
              <option value="merchantName-asc">Merchant Name (A-Z)</option>
              <option value="merchantName-desc">Merchant Name (Z-A)</option>
              <option value="pointsRequired-asc">Points (Low to High)</option>
              <option value="pointsRequired-desc">Points (High to Low)</option>
              <option value="validUntil-asc">Expiry (Earliest)</option>
              <option value="validUntil-desc">Expiry (Latest)</option>
            </select>
          </div>

          {/* Results count */}
          <div className="ml-auto text-sm text-gray-500">
            {sortedOffers.length} offers found
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={() => setViewType("grid")}
          className={`p-2 rounded-lg ${
            viewType === "grid"
              ? "bg-green-50 text-green-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <ViewGridIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewType("list")}
          className={`p-2 rounded-lg ${
            viewType === "list"
              ? "bg-green-50 text-green-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <ViewListIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Offers Grid */}
      <div
        className={`${
          viewType === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "space-y-2"
        }`}
      >
        {sortedOffers.length > 0 ? (
          sortedOffers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                viewType === "grid" ? "p-3" : "p-3 flex items-center gap-3"
              }`}
            >
              {viewType === "grid" ? (
                // Grid View - Compact Card
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={offer.logo}
                      alt={`${offer.merchantName} Logo`}
                      className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-1.5"
                    />
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {offer.merchantName}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {offer.title}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <span className="text-gray-500">Points</span>
                      <p className="font-medium">{offer.pointsRequired}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Valid Until</span>
                      <p className="font-medium">{offer.validUntil}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        offer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {offer.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingOffer(offer)}
                        className="text-xs font-medium text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button className="text-xs font-medium text-red-600 hover:text-red-700">
                        Deactivate
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // List View - Compact Row
                <>
                  <img
                    src={offer.logo}
                    alt={`${offer.merchantName} Logo`}
                    className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-1.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {offer.merchantName}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {offer.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <span className="text-gray-500 text-xs">Points</span>
                        <p className="font-medium">{offer.pointsRequired}</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 text-xs">
                          Valid Until
                        </span>
                        <p className="font-medium">{offer.validUntil}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          offer.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {offer.status}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingOffer(offer)}
                          className="text-xs font-medium text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </button>
                        <button className="text-xs font-medium text-red-600 hover:text-red-700">
                          Deactivate
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No offers match your filters
          </div>
        )}
      </div>

      {editingOffer && (
        <EditMerchantOfferModal
          isOpen={!!editingOffer}
          onClose={() => setEditingOffer(null)}
          offer={editingOffer}
        />
      )}

      <CreateMerchantOfferModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default MerchantOffers;
