import { XMarkIcon } from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import { useState } from "react";

const DUMMY_APPS = [
  { id: "app1", name: "Khedmah Mobile" },
  { id: "app2", name: "Khedmah Business" },
  { id: "app3", name: "Khedmah Merchant" },
];

const DUMMY_TIERS = [
  { id: "silver", name: "Silver Tier" },
  { id: "gold", name: "Gold Tier" },
  { id: "platinum", name: "Platinum Tier" },
];

const AddOfferModal = ({ isOpen, onClose, editingOffer }) => {
  const [errors, setErrors] = useState({});
  const addOffer = useStore((state) => state.addOffer);
  const updateOffer = useStore((state) => state.updateOffer);

  if (!isOpen) return null;

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.title?.trim()) newErrors.title = "Title is required";
    if (!data.discountCode?.trim())
      newErrors.discountCode = "Discount code is required";
    if (!data.percentage) newErrors.percentage = "Percentage is required";
    else if (data.percentage < 0 || data.percentage > 100)
      newErrors.percentage = "Percentage must be between 0 and 100";
    if (!data.tierRequired) newErrors.tierRequired = "Tier is required";
    if (!data.app) newErrors.app = "App is required";
    if (!data.validFrom) newErrors.validFrom = "Valid from date is required";
    if (!data.validTo) newErrors.validTo = "Valid to date is required";
    if (
      data.validFrom &&
      data.validTo &&
      new Date(data.validFrom) > new Date(data.validTo)
    ) {
      newErrors.validTo = "End date must be after start date";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const offerData = {
      title: formData.get("title"),
      icon: formData.get("icon"),
      discountCode: formData.get("discountCode"),
      description: formData.get("description"),
      percentage: Number(formData.get("percentage")),
      tierRequired: formData.get("tierRequired"),
      app: formData.get("app"),
      validFrom: formData.get("validFrom"),
      validTo: formData.get("validTo"),
    };

    const formErrors = validateForm(offerData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      if (editingOffer) {
        updateOffer({ ...offerData, id: editingOffer.id });
        onSuccess("Offer updated successfully");
      } else {
        addOffer({ ...offerData, id: Date.now() });
        onSuccess("Offer added successfully");
      }
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to save offer. Please try again." });
    }
  };

  // Add error display component
  const ErrorMessage = ({ message }) =>
    message ? <p className="text-red-500 text-xs mt-1">{message}</p> : null;

  // Add general error message display
  {
    errors.submit && (
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-600">{errors.submit}</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingOffer ? "Edit Discount" : "Add Discount"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              className={`w-full border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              defaultValue={editingOffer?.title}
            />
            <ErrorMessage message={errors.title} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Icon
            </label>
            <input
              type="text"
              name="icon"
              placeholder="Upload Icon"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              defaultValue={editingOffer?.icon}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Code
            </label>
            <input
              type="text"
              name="discountCode"
              placeholder="Enter Discount Code"
              className={`w-full border ${
                errors.discountCode ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              defaultValue={editingOffer?.discountCode}
            />
            <ErrorMessage message={errors.discountCode} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter Description"
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              defaultValue={editingOffer?.description}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Percentage
            </label>
            <input
              type="number"
              name="percentage"
              placeholder="Enter Percentage"
              className={`w-full border ${
                errors.percentage ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              defaultValue={editingOffer?.percentage}
            />
            <ErrorMessage message={errors.percentage} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tier Required
            </label>
            <select
              name="tierRequired"
              className={`w-full border ${
                errors.tierRequired ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              defaultValue={editingOffer?.tierRequired}
            >
              <option value="">Select tier</option>
              {DUMMY_TIERS.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.name}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors.tierRequired} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apps
            </label>
            <select
              name="app"
              className={`w-full border ${
                errors.app ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              defaultValue={editingOffer?.app}
            >
              <option value="">Select app</option>
              {DUMMY_APPS.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.name}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors.app} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid From
              </label>
              <input
                type="date"
                name="validFrom"
                className={`w-full border ${
                  errors.validFrom ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                defaultValue={editingOffer?.validFrom}
              />
              <ErrorMessage message={errors.validFrom} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid To
              </label>
              <input
                type="date"
                name="validTo"
                className={`w-full border ${
                  errors.validTo ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                defaultValue={editingOffer?.validTo}
              />
              <ErrorMessage message={errors.validTo} />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
            >
              {editingOffer ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOfferModal;
