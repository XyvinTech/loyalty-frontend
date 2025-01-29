import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const Notification = ({ message, type = "success", onClose }) => {
  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const borderColor =
    type === "success" ? "border-green-200" : "border-red-200";
  const Icon = type === "success" ? CheckCircleIcon : XCircleIcon;

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} border ${borderColor} rounded-lg p-4 shadow-lg max-w-md z-50`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${textColor}`} />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onClose}
            className={`inline-flex rounded-md p-1.5 ${textColor} hover:bg-white focus:outline-none`}
          >
            <span className="sr-only">Dismiss</span>
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
