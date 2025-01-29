import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CriteriaCard from "../components/CriteriaCard";
import AddPointCriteriaModal from "../components/AddPointCriteriaModal";

const criteriaData = [
  {
    id: 1,
    title: "Recharge",
    description: "Get 200 points on recharge of telecom services.",
    icon: "lightning",
  },
  {
    id: 2,
    title: "Donations",
    description: "Get 200 points on any donations you make",
    icon: "heart",
  },
  {
    id: 3,
    title: "Pay Bills",
    description:
      "Get 200 points on paying bills like Electricity, water, SPF, ROP etc.",
    icon: "payment",
  },
];

const PointsCriteria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [criteria, setCriteria] = useState(criteriaData);

  const handleAddCriteria = (newCriteria) => {
    setCriteria([...criteria, { ...newCriteria, id: criteria.length + 1 }]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Points Criteria
        </h1>
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
            Add Points Criteria
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {criteria.map((criteria) => (
          <CriteriaCard key={criteria.id} {...criteria} />
        ))}
      </div>

      <AddPointCriteriaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCriteria}
      />
    </div>
  );
};

export default PointsCriteria;
