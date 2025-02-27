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
import Privacy from "./pages/Privacy";
import useStore from "./store/useStore";
import Users from "./pages/Users";
import MerchantOffers from "./pages/MerchantOffers";
import KhedmahCoupons from "./pages/KhedmahCoupons";
import Support from "./pages/Support";
import Reports from "./pages/Reports";
import PushNotifications from "./pages/notifications/PushNotifications";
import UIComponents from "./pages/sdk/UIComponents";
import ThemeSettings from "./pages/sdk/ThemeSettings";
import SMS from "./pages/communications/SMS";
import Email from "./pages/communications/Email";
import EmailTemplates from "./pages/communications/EmailTemplates";
import PointTransactions from "./pages/audit/PointTransactions";
import AdminActions from "./pages/audit/AdminActions";
import SystemLogs from "./pages/audit/SystemLogs";
import ApiLogs from "./pages/audit/ApiLogs";
import ReferralProgram from "./pages/points/ReferralProgram";
import PointsManagement from "./pages/points/PointsManagement";
import SDKManagement from "./pages/sdk/SDKManagement";
import { Toaster } from "react-hot-toast";
import PointAdjustments from "./pages/points/PointAdjustments";
import AIChat from "./pages/AIChat";
import Footer from "./components/Footer";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return (
    <>
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
              <Route
                path="/privacy"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Privacy />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Users />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/merchant-offers"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <MerchantOffers />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/khedmah-coupons"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <KhedmahCoupons />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Replace old support routes with new ones */}
              <Route
                path="/support"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Support />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Reports />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <PushNotifications />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sdk/components"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <UIComponents />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sdk/theme"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ThemeSettings />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/communications/sms"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SMS />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/communications/email"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Email />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/communications/email/templates"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <EmailTemplates />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/audit/points"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <PointTransactions />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/audit/admin"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminActions />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/audit/system"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SystemLogs />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/audit/api"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ApiLogs />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/points/referrals"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ReferralProgram />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/points/adjustments"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <PointAdjustments />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/points/rules"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <PointsManagement />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings/sdk"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <SDKManagement />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-chat"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AIChat />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
        <Toaster position="top-right" />
      </BrowserRouter>

      <Footer />
    </>
  );
};

export default App;
