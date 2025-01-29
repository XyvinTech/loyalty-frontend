import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import AddBrandModal from "../components/AddBrandModal";

const ITEMS_PER_PAGE = 5;

const Brands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBrand, setEditingBrand] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const { brands, deleteBrand } = useStore();

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Filter and sort brands
  const filteredAndSortedBrands = [...brands]
    .filter(
      (brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedBrands.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBrands = filteredAndSortedBrands.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingBrand(null);
    setIsModalOpen(false);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBrands(paginatedBrands.map((brand) => brand.id));
    } else {
      setSelectedBrands([]);
    }
  };

  const handleSelectBrand = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedBrands.length} brands?`
      )
    ) {
      selectedBrands.forEach((id) => deleteBrand(id));
      setSelectedBrands([]);
    }
  };

  const handleExport = () => {
    const exportData = filteredAndSortedBrands.map(
      ({ id, logo, ...brand }) => ({
        ...brand,
        status: brand.status || "Inactive",
      })
    );

    const csv = [
      Object.keys(exportData[0]).join(","),
      ...exportData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brands-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Brands</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {selectedBrands.length > 0 ? (
            <>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                Delete Selected ({selectedBrands.length})
              </button>
            </>
          ) : (
            <button
              onClick={handleExport}
              className="text-gray-600 hover:text-gray-800 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 border border-gray-300 hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Add Brands
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
                  checked={selectedBrands.length === paginatedBrands.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
              </th>
              <SortableHeader label="Brand Name" sortKey="name" />
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Logo
              </th>
              <SortableHeader label="Code" sortKey="code" />
              <SortableHeader label="Category" sortKey="category" />
              <SortableHeader label="Created on" sortKey="createdOn" />
              <SortableHeader label="Status" sortKey="status" />
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBrands.map((brand, index) => (
              <tr
                key={brand.id}
                className={`${
                  index !== paginatedBrands.length - 1 ? "border-b" : ""
                } hover:bg-gray-50 ${
                  selectedBrands.includes(brand.id) ? "bg-green-50" : ""
                }`}
              >
                <td className="p-4 w-4">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => handleSelectBrand(brand.id)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className="p-4 text-sm text-gray-900">{brand.name}</td>
                <td className="p-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-8 h-8 object-contain"
                  />
                </td>
                <td className="p-4 text-sm text-gray-900">{brand.code}</td>
                <td className="p-4 text-sm text-gray-900">{brand.category}</td>
                <td className="p-4 text-sm text-gray-900">{brand.createdOn}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      brand.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {brand.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50">
                    <PencilIcon className="w-4 h-4" />
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
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredAndSortedBrands.length
              )}{" "}
              of {filteredAndSortedBrands.length} results
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

      <AddBrandModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingBrand={editingBrand}
      />
    </div>
  );
};

export default Brands;
