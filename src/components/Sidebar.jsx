import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ArrowPathIcon,
  UserGroupIcon,
  Square3Stack3DIcon,
  TagIcon,
  GiftIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Dashboard", icon: HomeIcon, path: "/" },
  { name: "Transactions", icon: ArrowPathIcon, path: "/transactions" },
  { name: "Customers", icon: UserGroupIcon, path: "/customers" },
  { name: "Apps", icon: Square3Stack3DIcon, path: "/apps" },
  { name: "Categories", icon: TagIcon, path: "/categories" },
  { name: "Brands", icon: GiftIcon, path: "/brands" },
  { name: "Merchant Coupons", icon: TagIcon, path: "/merchant-coupons" },
  { name: "Offers", icon: GiftIcon, path: "/offers" },
  { name: "Points Criteria", icon: ChartBarIcon, path: "/points-criteria" },
  { name: "Tiers", icon: ChartBarIcon, path: "/tiers" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-[#2B5C3F] text-white w-64 min-h-screen flex flex-col">
      <div className="p-6">
        <img src="/logo.svg" alt="Khedmah" className="h-8" />
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""} mb-1`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-green-700">
        <button className="sidebar-link w-full">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
