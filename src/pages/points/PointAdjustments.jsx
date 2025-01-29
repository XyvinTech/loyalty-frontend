import { useState } from "react";
import PointAdjustmentModal from "../../components/points/PointAdjustmentModal";
import PendingAdjustments from "../../components/points/PendingAdjustments";

const PointAdjustments = () => {
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Points Adjustments
        </h1>
        <button
          onClick={() => setIsAdjustmentModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          New Adjustment
        </button>
      </div>

      <PendingAdjustments />

      {isAdjustmentModalOpen && (
        <PointAdjustmentModal
          isOpen={isAdjustmentModalOpen}
          onClose={() => setIsAdjustmentModalOpen(false)}
          customerId={selectedCustomerId}
        />
      )}
    </div>
  );
};

export default PointAdjustments;
