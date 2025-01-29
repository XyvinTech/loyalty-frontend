import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import PointsCriteria from "./pages/PointsCriteria";
import Transactions from "./pages/Transactions";
import Customers from "./pages/Customers";
import Apps from "./pages/Apps";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Offers from "./pages/Offers";
import Tiers from "./pages/Tiers";
import Login from "./pages/Login";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import useStore from "./store/useStore";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        {isAuthenticated && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        <main
          className={`flex-1 overflow-auto transition-all duration-200 ${
            isAuthenticated && (isSidebarOpen ? "ml-64" : "ml-20")
          }`}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/points-criteria"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PointsCriteria />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Transactions />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Customers />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/apps"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Apps />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Categories />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/brands"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Brands />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/offers"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Offers />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tiers"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Tiers />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/customers/:id" element={<CustomerDetailsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
