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
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  ExclamationCircleIcon,
  DocumentChartBarIcon,
  BellIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  ClipboardDocumentListIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const [expandedMenus, setExpandedMenus] = useState({
    offers: false,
    masterData: false,
    support: false,
    communications: false,
    sdk: false,
    audit: false,
    points: false,
    customers: false,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: ChartBarIcon },
    {
      type: "dropdown",
      label: "Points Management",
      icon: CurrencyDollarIcon,
      isExpanded: expandedMenus.points,
      onClick: () => toggleMenu("points"),
      subItems: [
        {
          label: "Points Criteria",
          path: "/points-criteria",
          icon: CurrencyDollarIcon,
        },
        {
          label: "Transactions",
          path: "/transactions",
          icon: ArrowPathIcon,
        },
        {
          label: "Tiers",
          path: "/tiers",
          icon: TrophyIcon,
        },
      ],
    },
    {
      type: "dropdown",
      label: "Customer Management",
      icon: UsersIcon,
      isExpanded: expandedMenus.customers,
      onClick: () => toggleMenu("customers"),
      subItems: [
        {
          label: "Customers",
          path: "/customers",
          icon: UserGroupIcon,
        },
        {
          label: "Support",
          path: "/support",
          icon: ChatBubbleLeftRightIcon,
        },
      ],
    },
    {
      type: "dropdown",
      label: "Master Data",
      icon: Cog6ToothIcon,
      isExpanded: expandedMenus.masterData,
      onClick: () => toggleMenu("masterData"),
      subItems: [
        {
          label: "Categories",
          path: "/categories",
          icon: TagIcon,
        },
        {
          label: "Brands",
          path: "/brands",
          icon: BuildingStorefrontIcon,
        },
        {
          label: "Apps",
          path: "/apps",
          icon: DevicePhoneMobileIcon,
        },
      ],
    },
    {
      type: "dropdown",
      label: "Offers & Promotions",
      icon: TagIcon,
      isExpanded: expandedMenus.offers,
      onClick: () => toggleMenu("offers"),
      subItems: [
        {
          label: "Merchant Offers",
          path: "/merchant-offers",
          icon: TicketIcon,
        },
        {
          label: "Khedmah Coupons",
          path: "/khedmah-coupons",
          icon: TagIcon,
        },
      ],
    },
    {
      type: "dropdown",
      label: "Communications",
      icon: BellIcon,
      isExpanded: expandedMenus.communications,
      onClick: () => toggleMenu("communications"),
      subItems: [
        {
          label: "Push Notifications",
          path: "/notifications",
          icon: BellIcon,
        },
        {
          label: "SMS",
          path: "/communications/sms",
          icon: ChatBubbleLeftRightIcon,
        },
        {
          label: "Email",
          path: "/communications/email",
          icon: EnvelopeIcon,
        },
      ],
    },
    {
      type: "dropdown",
      label: "System & Settings",
      icon: Cog6ToothIcon,
      isExpanded: expandedMenus.settings,
      onClick: () => toggleMenu("settings"),
      subItems: [
        {
          label: "Users",
          path: "/users",
          icon: UserIcon,
        },
        {
          label: "Privacy & Security",
          path: "/privacy",
          icon: ShieldCheckIcon,
        },
        {
          label: "SDK Management",
          path: "/sdk/components",
          icon: CodeBracketIcon,
        },
        {
          label: "Theme Settings",
          path: "/sdk/theme",
          icon: Cog6ToothIcon,
        },
      ],
    },
    {
      type: "dropdown",
      label: "Reports & Audit",
      icon: DocumentChartBarIcon,
      isExpanded: expandedMenus.audit,
      onClick: () => toggleMenu("audit"),
      subItems: [
        {
          label: "Reports",
          path: "/reports",
          icon: DocumentChartBarIcon,
        },
        {
          label: "Point Transactions",
          path: "/audit/points",
          icon: CurrencyDollarIcon,
        },
        {
          label: "Admin Actions",
          path: "/audit/admin",
          icon: UserIcon,
        },
        {
          label: "System Logs",
          path: "/audit/system",
          icon: CodeBracketIcon,
        },
        {
          label: "API Logs",
          path: "/audit/api",
          icon: CommandLineIcon,
        },
      ],
    },
  ];

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
          {navItems.map((item) =>
            item.type === "dropdown" ? (
              <div key={item.label}>
                <button
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    item.isExpanded
                      ? "text-white bg-green-700/90"
                      : "text-gray-300 hover:bg-green-700/50 hover:text-white"
                  } ${!isOpen && "justify-center"}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {isOpen && item.label}
                  </div>
                  {isOpen &&
                    (item.isExpanded ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    ))}
                </button>

                {item.isExpanded && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg ${
                            isActive
                              ? "text-white bg-green-800"
                              : "text-gray-200 hover:bg-green-700/30 hover:text-white"
                          }`
                        }
                      >
                        <subItem.icon className="w-4 h-4" />
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
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
            )
          )}
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
