import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        <div className="bg-white shadow-sm p-4">
          <div className="flex justify-end items-center">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Admin</span>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
