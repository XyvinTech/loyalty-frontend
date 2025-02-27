import { useState, useEffect } from "react";
import { pointsRulesService } from "../../services/pointsRulesService";
import {
  CalendarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const UpcomingExpirations = () => {
  const [expirations, setExpirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("30"); // days

  useEffect(() => {
    const fetchExpirations = async () => {
      try {
        const data = await pointsRulesService.getUpcomingExpirations({
          days: Number(timeframe),
        });
        setExpirations(data);
      } catch (error) {
        console.error("Failed to fetch expirations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpirations();
  }, [timeframe]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Upcoming Point Expirations
        </h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-md border-gray-300 text-sm"
        >
          <option value="7">Next 7 days</option>
          <option value="30">Next 30 days</option>
          <option value="90">Next 90 days</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
          {expirations.map((exp) => (
            <div key={exp.customerId} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {exp.customerName}
                  </h3>
                  <p className="text-sm text-gray-500">{exp.customerId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {exp.points.toLocaleString()} points
                  </p>
                  <p className="text-sm text-gray-500">Tier: {exp.tier}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <div className="flex items-center text-yellow-600">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  <span>Expires in {exp.daysRemaining} days</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>{new Date(exp.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingExpirations;
