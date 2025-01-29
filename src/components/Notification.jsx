import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Notification = ({ type, message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`rounded-lg p-4 ${
        type === 'success' ? 'bg-green-50' : 'bg-red-50'
      } flex items-center gap-3`}>
        {type === 'success' ? (
          <CheckCircleIcon className="w-5 h-5 text-green-400" />
        ) : (
          <XCircleIcon className="w-5 h-5 text-red-400" />
        )}
        <p className={`text-sm font-medium ${
          type === 'success' ? 'text-green-800' : 'text-red-800'
        }`}>
          {message}
        </p>
        <button
          onClick={onClose}
          className={`ml-4 ${
            type === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
