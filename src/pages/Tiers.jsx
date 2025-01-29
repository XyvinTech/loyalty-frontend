import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import AddTierModal from "../components/AddTierModal";
import EditTierModal from "../components/EditTierModal";
import Toast from "../components/Toast";

const Tiers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTier, setEditingTier] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [toast, setToast] = useState(null);
  const { tiers, deleteTier } = useStore();

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handleDelete = async (tierId) => {
    if (window.confirm("Are you sure you want to delete this tier?")) {
      try {
        await deleteTier(tierId);
        setToast({ message: "Tier deleted successfully", type: "success" });
      } catch (error) {
        setToast({ message: "Failed to delete tier", type: "error" });
      }
    }
  };

  const filteredAndSortedTiers = [...tiers]
    .filter((tier) =>
      tier.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Tiers</h1>
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
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Add Tier
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader label="Name" sortKey="name" />
              <SortableHeader
                label="Points Required"
                sortKey="pointsRequired"
              />
              <SortableHeader label="Benefits" sortKey="benefits" />
              <SortableHeader label="Status" sortKey="status" />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedTiers.map((tier) => (
              <tr key={tier.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tier.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tier.pointsRequired}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc list-inside">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tier.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tier.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingTier(tier)}
                      className="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tier.id)}
                      className="text-red-600 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() =>
          setToast({ message: "Tier added successfully", type: "success" })
        }
      />

      <EditTierModal
        isOpen={!!editingTier}
        onClose={() => setEditingTier(null)}
        tier={editingTier}
        onSuccess={() =>
          setToast({ message: "Tier updated successfully", type: "success" })
        }
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Tiers;
