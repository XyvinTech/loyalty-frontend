import { ClockIcon } from "@heroicons/react/24/outline";

const UserActivityLog = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <ClockIcon className="w-5 h-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              User Activity Log
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Track user login and system activities
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {activity.userName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {activity.userEmail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.action === "login"
                        ? "bg-blue-100 text-blue-800"
                        : activity.action === "logout"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.action.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {activity.ipAddress}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {activity.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActivityLog;
