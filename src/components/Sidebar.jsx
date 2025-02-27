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
  ArrowRightOnRectangleIcon,
  UsersIcon,
  ShieldCheckIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  BellIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  CommandLineIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import useStore from "../store/useStore";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const [expandedMenus, setExpandedMenus] = useState({
    offers: false,
    referenceData: false,
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
          label: "Point Adjustments",
          path: "/points/adjustments",
          icon: AdjustmentsHorizontalIcon,
        },
        {
          label: "Rules & Expiry",
          path: "/points/rules",
          icon: Cog6ToothIcon,
        },
        {
          label: "Tiers",
          path: "/tiers",
          icon: TrophyIcon,
        },
        {
          label: "Referral Program",
          path: "/points/referrals",
          icon: UserGroupIcon,
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
      label: "Reference Data",
      icon: Cog6ToothIcon,
      isExpanded: expandedMenus.referenceData,
      onClick: () => toggleMenu("referenceData"),
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
          label: "SDK & API Access",
          path: "/settings/sdk",
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
      label: "Audit",
      icon: AdjustmentsHorizontalIcon,
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
    // {
    //   path: "/ai-chat",
    //   name: "AI Chat",
    //   icon: ChatBubbleBottomCenterTextIcon,
    // },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#2B5C3F] shadow-xl z-30">
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b border-green-700/50">
          <div className="flex items-center">
            <img
              src="/khedmah-logo.png"
              alt="Khedmah"
              className="h-8 w-auto transition-transform duration-200 hover:scale-105"
            />
            <span className="ml-3 text-white text-lg font-semibold tracking-wide">
              Khedmah
            </span>
          </div>
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
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </div>
                  {item.isExpanded ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )}
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
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <item.icon className="w-5 h-5 text-gray-300" />
                <span className="text-sm font-medium text-gray-300">
                  {item.name}
                </span>
              </NavLink>
            )
          )}
        </nav>
   

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-4 text-sm font-medium text-gray-300 hover:bg-green-700/50 hover:text-white transition-colors border-t border-green-700/50"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
