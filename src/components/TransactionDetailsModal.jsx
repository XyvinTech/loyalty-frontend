import { XMarkIcon } from "@heroicons/react/24/outline";

const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Basic Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(transaction.date).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                    transaction.type === "Purchase"
                      ? "bg-green-100 text-green-800"
                      : transaction.type === "Redemption"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                    transaction.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Transaction Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-sm font-medium text-gray-900">
                  OMR {transaction.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Points</p>
                <p
                  className={`text-sm font-medium ${
                    transaction.points >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.points >= 0 ? "+" : ""}
                  {transaction.points}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Merchant</p>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.merchant}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="text-sm font-medium text-gray-900">Credit Card</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
          <p className="text-sm text-gray-600">
            {transaction.notes || "No notes available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
