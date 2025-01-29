import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import AddTierModal from "../components/AddTierModal";

const Tiers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tiers } = useStore();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Tiers</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2.5 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Add Tier
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Tiers
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Icon
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Points
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Description
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Condition
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, index) => (
              <tr
                key={tier.id}
                className={index !== tiers.length - 1 ? "border-b" : ""}
              >
                <td className="p-4 text-sm text-gray-900">{tier.name}</td>
                <td className="p-4">
                  <img src={tier.icon} alt={tier.name} className="w-8 h-8" />
                </td>
                <td className="p-4 text-sm text-gray-900">{tier.points}</td>
                <td className="p-4 text-sm text-gray-900">
                  {tier.description}
                </td>
                <td className="p-4 text-sm text-gray-900">{tier.condition}</td>
                <td className="p-4">
                  <button className="text-green-600 hover:text-green-700">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Tiers;
