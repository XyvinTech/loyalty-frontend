import { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import useStore from "../../store/useStore";
import { sendNotification } from "../../services/notificationService";

const PendingAdjustments = () => {
  const [adjustments] = useState([
    {
      id: 1,
      customerId: "CUST123",
      customerName: "John Doe",
      type: "add",
      points: 500,
      reason: "system_error",
      notes: "System failed to credit points for purchase",
      requestedBy: "agent@khedmah.com",
      requestedAt: "2024-02-20T10:00:00",
      status: "pending",
      evidence: "receipt.pdf",
    },
    // More adjustments...
  ]);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedAdjustment, setSelectedAdjustment] = useState(null);

  const user = useStore((state) => state.user);
  const checkPermission = useStore((state) => state.checkPermission);

  const canViewAll = checkPermission("points", "viewAll");
  const canApprove = checkPermission("points", "approve");
  const canBulkAdjust = checkPermission("points", "bulkAdjust");
  const approvalLimit = useStore(
    (state) => state.permissions?.points?.approvalLimit || 0
  );

  const handleApprove = async (id) => {
    try {
      // API call would go here
      await sendNotification("adjustment_approved", {
        points: adjustments.find((a) => a.id === id).points,
        customerName: adjustments.find((a) => a.id === id).customerName,
      });
      toast.success("Adjustment approved successfully");
    } catch (error) {
      toast.error("Failed to approve adjustment");
    }
  };

  const handleReject = (id) => {
    // API call would go here
    toast.error("Adjustment rejected");
  };

  const openRejectModal = (adjustment) => {
    setSelectedAdjustment(adjustment);
    setShowRejectModal(true);
  };

  const submitRejection = async () => {
    try {
      await sendNotification("adjustment_rejected", {
        points: selectedAdjustment.points,
        customerName: selectedAdjustment.customerName,
        reason: rejectionReason,
      });
      handleReject(selectedAdjustment.id, rejectionReason);
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedAdjustment(null);
    } catch (error) {
      toast.error("Failed to reject adjustment");
    }
  };

  const filteredAdjustments = adjustments.filter((adj) => {
    if (canViewAll) return true;
    return adj.requestedBy === user?.email;
  });

  const canApproveAdjustment = (adjustment) => {
    if (!canApprove) return false;
    return adjustment.points <= approvalLimit;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          {canViewAll ? "All Pending Adjustments" : "My Pending Adjustments"}
        </h2>
        {canBulkAdjust && (
          <button
            onClick={() => {
              /* Handle bulk adjustments */
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Bulk Adjust
          </button>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adjustment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {canApprove ? "Actions" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAdjustments.map((adjustment) => (
                <tr key={adjustment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium text-gray-900">
                      {adjustment.customerName}
                    </div>
                    <div className="text-gray-500">{adjustment.customerId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        adjustment.type === "add"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {adjustment.type === "add" ? "+" : "-"}
                      {adjustment.points} points
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {adjustment.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {adjustment.requestedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(adjustment.requestedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {canApprove ? (
                      <div className="flex items-center justify-end gap-2">
                        {canApproveAdjustment(adjustment) && (
                          <button
                            onClick={() => handleApprove(adjustment.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => openRejectModal(adjustment)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircleIcon className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <EyeIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <span className={`status-badge ${adjustment.status}`}>
                        {adjustment.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRejectModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="relative bg-white rounded-lg w-full max-w-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reject Adjustment
              </h3>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                rows={3}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRejection}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAdjustments;
