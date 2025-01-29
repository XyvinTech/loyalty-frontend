import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useStore from "../store/useStore";

const AddBrandModal = ({ isOpen, onClose, editingBrand }) => {
  const [errors, setErrors] = useState({});
  const addBrand = useStore((state) => state.addBrand);
  const updateBrand = useStore((state) => state.updateBrand);

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Brand name is required";
    if (!data.logo?.trim()) newErrors.logo = "Logo is required";
    if (!data.brandId?.trim()) newErrors.brandId = "Brand ID is required";
    if (!data.category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const brandData = {
      name: formData.get("name"),
      logo: formData.get("logo"),
      brandId: formData.get("brandId"),
      category: formData.get("category"),
      status: "Active",
      createdOn: new Date().toLocaleDateString("en-GB"),
      code: formData.get("brandId"),
    };

    const formErrors = validateForm(brandData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      if (editingBrand) {
        updateBrand({ ...brandData, id: editingBrand.id });
      } else {
        addBrand(brandData);
      }
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to save brand. Please try again." });
    }
  };

  const ErrorMessage = ({ message }) =>
    message ? <p className="text-red-500 text-xs mt-1">{message}</p> : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Brand</h2>
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
              Brand
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter brand name"
              defaultValue={editingBrand?.name}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            <ErrorMessage message={errors.name} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Icon
            </label>
            <div className="relative">
              <input
                type="text"
                name="logo"
                placeholder="Upload logo icon"
                className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID
            </label>
            <div className="relative">
              <input
                type="text"
                name="brandId"
                placeholder="Enter Brand ID"
                className="w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Choose category</option>
              <option value="Food">Food</option>
              <option value="Retail">Retail</option>
              <option value="Services">Services</option>
            </select>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandModal;
