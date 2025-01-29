import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateKhedmahCouponModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "service",
    pointsRequired: "",
    discountType: "percentage",
    discountValue: "",
    maxDiscount: "",
    validServices: [],
    status: "active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Create New Khedmah Coupon
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Same form fields as EditKhedmahCouponModal */}
            {/* ... */}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
              >
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateKhedmahCouponModal;
