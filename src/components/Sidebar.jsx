import { NavLink, useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  UserGroupIcon,
  DevicePhoneMobileIcon,
  TagIcon,
  BuildingStorefrontIcon,
  TicketIcon,
  TrophyIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";

const navItems = [
  { path: "/dashboard", name: "Dashboard", icon: ChartBarIcon },
  {
    path: "/points-criteria",
    name: "Points Criteria",
    icon: CurrencyDollarIcon,
  },
  { path: "/transactions", name: "Transactions", icon: ArrowPathIcon },
  {
    name: "Customers",
    path: "/customers",
    icon: UsersIcon,
    submenu: [
      { name: "All Customers", path: "/customers" },
      { name: "VIP Customers", path: "/customers?segment=vip" },
      { name: "At Risk", path: "/customers?segment=at-risk" },
      { name: "New Customers", path: "/customers?segment=new" },
    ],
  },
  { path: "/apps", name: "Apps", icon: DevicePhoneMobileIcon },
  { path: "/categories", name: "Categories", icon: TagIcon },
  { path: "/brands", name: "Brands", icon: BuildingStorefrontIcon },
  { path: "/offers", name: "Offers", icon: TicketIcon },
  { path: "/tiers", name: "Tiers", icon: TrophyIcon },
  {
    path: "/privacy",
    name: "Privacy & Security",
    icon: ShieldCheckIcon,
  },
  {
    path: "/users",
    name: "Users",
    icon: UserIcon,
  },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#2B5C3F] transition-all duration-200 ${
        isOpen ? "w-64" : "w-20"
      } shadow-xl z-30`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-green-700/50">
          <div
            className={`flex items-center ${
              !isOpen && "justify-center w-full"
            }`}
          >
            <img
              src="/logo.svg"
              alt="Khedmah"
              className="h-8 transition-transform duration-200 hover:scale-105"
            />
            {isOpen && (
              <span className="ml-3 text-white text-lg font-semibold tracking-wide">
                Khedmah
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-white/80 hover:text-white transition-colors ${
              !isOpen && "hidden"
            }`}
          >
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          </button>
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="absolute -right-3 top-9 bg-white rounded-full p-1 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
            >
              <ChevronDoubleRightIcon className="w-4 h-4 text-green-700" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white bg-green-700/90 border-r-4 border-white"
                    : "text-gray-300 hover:bg-green-700/50 hover:text-white"
                } ${!isOpen && "justify-center"}`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className={`flex items-center px-4 py-4 text-sm font-medium text-gray-300 hover:bg-green-700/50 hover:text-white transition-colors border-t border-green-700/50 ${
            !isOpen && "justify-center"
          }`}
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
