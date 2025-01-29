import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Customers from "./pages/Customers";
import PointsCriteria from "./pages/PointsCriteria";
import Offers from "./pages/Offers";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/points-criteria" element={<PointsCriteria />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
