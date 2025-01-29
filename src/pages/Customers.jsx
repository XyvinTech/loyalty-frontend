import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";
import { Link } from "react-router-dom";
import CustomerDetailsModal from "../components/support/CustomerDetailsModal";

const ITEMS_PER_PAGE = 5;

const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const { customers, bulkDeleteCustomers } = useStore();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterTier, setFilterTier] = useState("all");

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  // Filter and sort customers
  const filteredAndSortedCustomers = [...customers]
    .filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customerId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredAndSortedCustomers.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCustomers = filteredAndSortedCustomers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Add bulk selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(paginatedCustomers.map((customer) => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedCustomers.length} customers?`
      )
    ) {
      bulkDeleteCustomers(selectedCustomers);
      setSelectedCustomers([]);
    }
  };

  const handleExport = () => {
    const exportData = filteredAndSortedCustomers.map(
      ({ id, ...customer }) => customer
    );

    const csv = [
      Object.keys(exportData[0]).join(","),
      ...exportData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const SortableHeader = ({ label, sortKey }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group hover:bg-gray-50"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-2">
        {label}
        <ChevronUpDownIcon
          className={`w-4 h-4 text-gray-400 group-hover:text-gray-500 ${
            sortConfig.key === sortKey ? "text-green-500" : ""
          }`}
        />
      </div>
    </th>
  );

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTier =
      filterTier === "all" ||
      customer.tier.toLowerCase() === filterTier.toLowerCase();

    return matchesSearch && matchesTier;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
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
          {selectedCustomers.length > 0 ? (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <TrashIcon className="w-4 h-4" />
              Delete Selected ({selectedCustomers.length})
            </button>
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
            Add Customer
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 w-4">
                <input
                  type="checkbox"
                  checked={
                    selectedCustomers.length === paginatedCustomers.length
                  }
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
              </th>
              <SortableHeader label="Name" sortKey="name" />
              <SortableHeader label="Customer ID" sortKey="customerId" />
              <SortableHeader label="Email" sortKey="email" />
              <SortableHeader label="Phone" sortKey="phone" />
              <SortableHeader label="Company Name" sortKey="companyName" />
              <SortableHeader label="Points" sortKey="points" />
              <SortableHeader label="Tier" sortKey="tier" />
              <SortableHeader label="Referral Code" sortKey="referralCode" />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCustomers.map((customer) => (
              <tr
                key={customer.id}
                className={`hover:bg-gray-50 ${
                  selectedCustomers.includes(customer.id) ? "bg-green-50" : ""
                }`}
              >
                <td className="px-6 py-4 w-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.customerId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    {customer.tier}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.referralCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/customers/${customer.id}`}
                    className="text-green-600 hover:text-green-700"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-3 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredAndSortedCustomers.length
              )}{" "}
              of {filteredAndSortedCustomers.length} results
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

      <EditCustomerModal
        isOpen={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        customer={editingCustomer}
      />

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
};

export default Customers;
