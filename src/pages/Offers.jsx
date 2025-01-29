import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import AddOfferModal from "../components/AddOfferModal";

const ITEMS_PER_PAGE = 5;

const Offers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { offers } = useStore();

  // Filter offers based on search term
  const filteredOffers = offers.filter(
    (offer) =>
      offer.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredOffers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOffers = filteredOffers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Brand Name
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Logo
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Code
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                PIN
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Points Required
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Starts on
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Ends on
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOffers.map((offer, index) => (
              <tr
                key={offer.id}
                className={
                  index !== paginatedOffers.length - 1 ? "border-b" : ""
                }
              >
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
                  <button className="text-green-600 hover:text-green-700">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredOffers.length)} of{" "}
              {filteredOffers.length} results
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
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Offers;
