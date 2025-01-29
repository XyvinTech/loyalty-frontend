import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import CustomerProfile from "../components/CustomerProfile";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const { customers } = useStore();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customerData = customers.find((c) => c.id === Number(id));
    setCustomer(customerData);
    setLoading(false);
  }, [id, customers]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-8">
        <div className="text-red-600">Customer not found</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link
          to="/customers"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Customers
        </Link>
      </div>
      <CustomerProfile customer={customer} />
    </div>
  );
};

export default CustomerDetailsPage;
