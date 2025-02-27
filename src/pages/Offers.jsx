import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import AddOfferModal from "../components/AddOfferModal";
import Notification from "../components/Notification";

const ITEMS_PER_PAGE = 5;

const Offers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "brandName",
    direction: "asc",
  });
  const [editingOffer, setEditingOffer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { offers, updateOffer, deleteOffer, bulkDeleteOffers } = useStore();
  const [notification, setNotification] = useState(null);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Sort and filter offers
  const sortedAndFilteredOffers = [...offers]
    .filter(
      (offer) =>
        offer.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  // Calculate pagination
  const totalPages = Math.ceil(sortedAndFilteredOffers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOffers = sortedAndFilteredOffers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingOffer(null);
    setIsModalOpen(false);
  };

  const handleDelete = (offerId) => {
    deleteOffer(offerId);
    setDeleteConfirmId(null);
    setNotification({
      type: "success",
      message: "Offer deleted successfully",
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOffers(paginatedOffers.map((offer) => offer.id));
    } else {
      setSelectedOffers([]);
    }
  };

  const handleSelectOffer = (offerId) => {
    setSelectedOffers((prev) =>
      prev.includes(offerId)
        ? prev.filter((id) => id !== offerId)
        : [...prev, offerId]
    );
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedOffers.length} offers?`
      )
    ) {
      setIsLoading(true);
      try {
        bulkDeleteOffers(selectedOffers);
        setNotification({
          type: "success",
          message: `Successfully deleted ${selectedOffers.length} offers`,
        });
        setSelectedOffers([]);
      } catch (error) {
        setNotification({
          type: "error",
          message: "Failed to delete offers",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const SortableHeader = ({ label, sortKey }) => (
    <th
      className="text-left p-4 text-sm font-medium text-gray-600 cursor-pointer group hover:bg-gray-50"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-2">
        {label}
        <ChevronUpDownIcon
          className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 ${
            sortConfig.key === sortKey ? "text-green-600" : ""
          }`}
        />
      </div>
    </th>
  );

  // Add DeleteConfirmation component
  const DeleteConfirmation = ({ offerId, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Confirm Delete
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete this offer? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(offerId)}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const merchantOffers = [
    {
      id: 1,
      type: "merchant",
      merchantName: "KFC",
      logo: "kfc_logo_url",
      offerTitle: "20% Off on Bucket Meals",
      pointsRequired: 500,
      redemptionProcess: {
        type: "pin_based",
        steps: [
          "Customer redeems offer using points",
          "System generates unique PIN code",
          "Customer shows PIN at KFC counter",
          "Merchant validates PIN through their portal",
          "Discount applied to customer's order",
        ],
      },
      validityPeriod: "30 days",
      termsAndConditions: [
        "Valid at all KFC Oman branches",
        "Cannot be combined with other offers",
        "Valid on dine-in and takeaway only",
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Offers</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="pl-10 pr-4 py-2.5 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {selectedOffers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              {isLoading ? (
                <span className="animate-spin">⌛</span>
              ) : (
                <TrashIcon className="w-4 h-4" />
              )}
              Delete Selected ({selectedOffers.length})
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Add Discounts
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 w-4">
                <input
                  type="checkbox"
                  checked={selectedOffers.length === paginatedOffers.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
              </th>
              <SortableHeader label="Brand Name" sortKey="brandName" />
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Logo
              </th>
              <SortableHeader label="Code" sortKey="code" />
              <SortableHeader label="PIN" sortKey="pin" />
              <SortableHeader
                label="Points Required"
                sortKey="pointsRequired"
              />
              <SortableHeader label="Starts on" sortKey="startDate" />
              <SortableHeader label="Ends on" sortKey="endDate" />
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOffers.map((offer, index) => (
              <tr
                key={offer.id}
                className={`${
                  index !== paginatedOffers.length - 1 ? "border-b" : ""
                } hover:bg-gray-50 ${
                  selectedOffers.includes(offer.id) ? "bg-green-50" : ""
                }`}
              >
                <td className="p-4 w-4">
                  <input
                    type="checkbox"
                    checked={selectedOffers.includes(offer.id)}
                    onChange={() => handleSelectOffer(offer.id)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className="p-4 text-sm text-gray-900">{offer.brandName}</td>
                <td className="p-4">
                  <img
                    src={offer.logo}
                    alt={offer.brandName}
                    className="w-8 h-8 object-contain"
                  />
                </td>
                <td className="p-4 text-sm text-gray-900">{offer.code}</td>
                <td className="p-4 text-sm text-gray-900">{offer.pin}</td>
                <td className="p-4 text-sm text-gray-900">
                  {offer.pointsRequired}
                </td>
                <td className="p-4 text-sm text-gray-900">{offer.startDate}</td>
                <td className="p-4 text-sm text-gray-900">{offer.endDate}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(offer)}
                      className="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50"
                      title="Edit offer"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(offer.id)}
                      className="text-red-600 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                      title="Delete offer"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                sortedAndFilteredOffers.length
              )}{" "}
              of {sortedAndFilteredOffers.length} results
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === page
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <AddOfferModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingOffer={editingOffer}
      />

      {/* Add delete confirmation modal */}
      {deleteConfirmId && (
        <DeleteConfirmation
          offerId={deleteConfirmId}
          onCancel={() => setDeleteConfirmId(null)}
        />
      )}

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

export default Offers;
