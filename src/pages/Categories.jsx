import { useState } from "react";
import { MagnifyingGlassIcon, PencilIcon } from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import AddCategoryModal from "../components/AddCategoryModal";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories } = useStore();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
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
            Add Categories
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Title
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Code
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Description
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Created on
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={index !== categories.length - 1 ? "border-b" : ""}
              >
                <td className="p-4 text-sm text-gray-900">{category.title}</td>
                <td className="p-4">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-8 h-8 object-contain"
                  />
                </td>
                <td className="p-4 text-sm text-gray-900">{category.code}</td>
                <td className="p-4 text-sm text-gray-900">
                  {category.description}
                </td>
                <td className="p-4 text-sm text-gray-900">
                  {category.createdOn}
                </td>
                <td className="p-4">
                  <button className="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-50">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Categories;
