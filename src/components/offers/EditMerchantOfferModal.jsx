import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EditMerchantOfferModal = ({ isOpen, onClose, offer }) => {
  const [formData, setFormData] = useState({
    merchantName: "",
    title: "",
    pointsRequired: "",
    validUntil: "",
    status: "active",
    logo: "",
  });

  useEffect(() => {
    if (offer) {
      setFormData({
        merchantName: offer.merchantName,
        title: offer.title,
        pointsRequired: offer.pointsRequired,
        validUntil: offer.validUntil,
        status: offer.status,
        logo: offer.logo,
      });
    }
  }, [offer]);

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
              Edit Merchant Offer
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
                Merchant Name
              </label>
              <input
                type="text"
                value={formData.merchantName}
                onChange={(e) =>
                  setFormData({ ...formData, merchantName: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Offer Title
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valid Until
              </label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) =>
                  setFormData({ ...formData, validUntil: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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

export default EditMerchantOfferModal;
