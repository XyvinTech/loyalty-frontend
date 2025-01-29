import { UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Breadcrumbs will go here */}
        <div></div>
        
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@khedmah.com</p>
          </div>
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Navbar; 