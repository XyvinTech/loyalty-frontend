import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EditKhedmahCouponModal = ({ isOpen, onClose, coupon }) => {
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

  useEffect(() => {
    if (coupon) {
      setFormData({
        title: coupon.title,
        description: coupon.description,
        type: coupon.type,
        pointsRequired: coupon.pointsRequired,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        maxDiscount: coupon.maxDiscount,
        validServices: coupon.validServices,
        status: coupon.status,
      });
    }
  }, [coupon]);

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
              Edit Khedmah Coupon
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="service">Service</option>
                  <option value="payment">Payment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Points Required
                </label>
                <input
                  type="number"
                  value={formData.pointsRequired}
                  onChange={(e) =>
                    setFormData({ ...formData, pointsRequired: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount Type
                </label>
                <select
                  value={formData.discountType}
                  onChange={(e) =>
                    setFormData({ ...formData, discountType: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="cashback">Cashback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount Value
                </label>
                <input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) =>
                    setFormData({ ...formData, discountValue: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Discount (OMR)
              </label>
              <input
                type="text"
                value={formData.maxDiscount}
                onChange={(e) =>
                  setFormData({ ...formData, maxDiscount: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valid Services
              </label>
              <select
                multiple
                value={formData.validServices}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    validServices: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Electricity Payment">Electricity Payment</option>
                <option value="Water Payment">Water Payment</option>
                <option value="ROP Payments">ROP Payments</option>
                <option value="All Services">All Services</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Hold Ctrl/Cmd to select multiple
              </p>
            </div>

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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditKhedmahCouponModal;
