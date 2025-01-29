import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  Squares2X2Icon as ViewGridIcon,
  ListBulletIcon as ViewListIcon,
} from "@heroicons/react/24/outline";
import EditKhedmahCouponModal from "../components/offers/EditKhedmahCouponModal";
import CreateKhedmahCouponModal from "../components/offers/CreateKhedmahCouponModal";

const KhedmahCoupons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    discountType: "all",
    pointsRange: "all",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewType, setViewType] = useState("grid");

  // Add sample Khedmah coupons data
  const sampleCoupons = [
    {
      id: 1,
      title: "50% Off Electricity Bill",
      description: "Service-specific discount",
      type: "service",
      pointsRequired: 1000,
      discountType: "percentage",
      discountValue: 50,
      maxDiscount: "100 OMR",
      validServices: ["Electricity Payment"],
      status: "active",
    },
    {
      id: 2,
      title: "5 OMR Off Water Bill",
      description: "Fixed amount discount",
      type: "service",
      pointsRequired: 200,
      discountType: "fixed",
      discountValue: 5,
      validServices: ["Water Payment"],
      status: "active",
    },
    {
      id: 3,
      title: "10% Cashback on Bank Muscat",
      description: "Payment method specific",
      type: "payment",
      pointsRequired: 300,
      discountType: "cashback",
      discountValue: 10,
      maxDiscount: "25 OMR",
      validServices: ["All Services"],
      paymentMethod: "Bank Muscat Cards",
      status: "active",
    },
    {
      id: 4,
      title: "15% Off ROP Services",
      description: "All ROP transactions",
      type: "service",
      pointsRequired: 500,
      discountType: "percentage",
      discountValue: 15,
      maxDiscount: "50 OMR",
      validServices: ["ROP Payments"],
      status: "active",
    },
  ];

  // Filter coupons
  const filteredCoupons = sampleCoupons.filter((coupon) => {
    const matchesSearch =
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.type === "all" || coupon.type === filters.type;

    const matchesDiscountType =
      filters.discountType === "all" ||
      coupon.discountType === filters.discountType;

    const matchesPoints =
      filters.pointsRange === "all" ||
      (filters.pointsRange === "low" && coupon.pointsRequired <= 300) ||
      (filters.pointsRange === "medium" &&
        coupon.pointsRequired > 300 &&
        coupon.pointsRequired <= 600) ||
      (filters.pointsRange === "high" && coupon.pointsRequired > 600);

    return matchesSearch && matchesType && matchesDiscountType && matchesPoints;
  });

  // Sort coupons
  const sortedCoupons = [...filteredCoupons].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Khedmah Coupons
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search coupons"
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
            Create Coupon
          </button>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-gray-400" />
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, type: e.target.value }))
              }
              className="text-sm border-gray-300 rounded-md"
            >
              <option value="all">All Types</option>
              <option value="service">Service</option>
              <option value="payment">Payment</option>
            </select>
          </div>

          <select
            value={filters.discountType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, discountType: e.target.value }))
            }
            className="text-sm border-gray-300 rounded-md"
          >
            <option value="all">All Discount Types</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
            <option value="cashback">Cashback</option>
          </select>

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
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="pointsRequired-asc">Points (Low to High)</option>
              <option value="pointsRequired-desc">Points (High to Low)</option>
              <option value="discountValue-asc">Discount (Low to High)</option>
              <option value="discountValue-desc">Discount (High to Low)</option>
            </select>
          </div>

          <div className="ml-auto text-sm text-gray-500">
            {sortedCoupons.length} coupons found
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2 ml-4 mb-4">
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

      {/* Update the grid/list container */}
      <div
        className={`${
          viewType === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "space-y-2"
        }`}
      >
        {sortedCoupons.length > 0 ? (
          sortedCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                viewType === "grid" ? "p-3" : "p-3 flex items-center gap-3"
              }`}
            >
              {viewType === "grid" ? (
                // Grid View - Compact Card
                <>
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {coupon.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          coupon.type === "service"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {coupon.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {coupon.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <span className="text-gray-500">Points</span>
                      <p className="font-medium">{coupon.pointsRequired}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Discount</span>
                      <p className="font-medium">
                        {coupon.discountType === "percentage"
                          ? `${coupon.discountValue}%`
                          : `${coupon.discountValue} OMR`}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs mb-2">
                    <span className="text-gray-500">Valid Services</span>
                    <p className="font-medium truncate mt-0.5">
                      {coupon.validServices.join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        coupon.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {coupon.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingCoupon(coupon)}
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
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 text-sm truncate">
                          {coupon.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            coupon.type === "service"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {coupon.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {coupon.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <span className="text-gray-500 text-xs">Points</span>
                        <p className="font-medium">{coupon.pointsRequired}</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 text-xs">Discount</span>
                        <p className="font-medium">
                          {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}%`
                            : `${coupon.discountValue} OMR`}
                        </p>
                      </div>
                      <div className="text-sm max-w-[200px]">
                        <span className="text-gray-500 text-xs">Services</span>
                        <p className="font-medium truncate">
                          {coupon.validServices.join(", ")}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          coupon.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {coupon.status}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingCoupon(coupon)}
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
            No coupons match your filters
          </div>
        )}
      </div>

      {editingCoupon && (
        <EditKhedmahCouponModal
          isOpen={!!editingCoupon}
          onClose={() => setEditingCoupon(null)}
          coupon={editingCoupon}
        />
      )}

      <CreateKhedmahCouponModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default KhedmahCoupons;
