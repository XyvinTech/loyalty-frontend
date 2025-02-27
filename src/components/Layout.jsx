import { useLocation } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const getBreadcrumbs = (pathname) => {
  const paths = pathname.split("/").filter(Boolean);
  return paths.map((path) => ({
    name: path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    path: `/${paths.slice(0, paths.indexOf(path) + 1).join("/")}`,
  }));
};

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-[calc(100%-16rem)]">
        <div className="flex flex-col h-full">
          <Navbar />
          <div className="bg-white border-b">
            <div className="px-8 py-2">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <div className="text-gray-400">
                      <ChevronRightIcon className="w-5 h-5" />
                    </div>
                  </li>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.path}>
                      <div className="flex items-center">
                        <span
                          className={`text-sm font-medium ${
                            index === breadcrumbs.length - 1
                              ? "text-gray-800"
                              : "text-gray-500"
                          }`}
                        >
                          {breadcrumb.name}
                        </span>
                        {index < breadcrumbs.length - 1 && (
                          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-gray-50">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
