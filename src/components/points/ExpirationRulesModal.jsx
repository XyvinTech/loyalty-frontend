import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { pointsRulesService } from "../../services/pointsRulesService";
import { toast } from "react-hot-toast";

const ExpirationRulesModal = ({ isOpen, onClose }) => {
  const [rules, setRules] = useState({
    defaultExpiryPeriod: 12, // months
    tierExtensions: {
      silver: 0,
      gold: 3,
      platinum: 6,
    },
    notifications: {
      firstReminder: 30, // days before expiry
      secondReminder: 15,
      finalReminder: 7,
    },
    policies: {
      allowGracePeriod: true,
      gracePeriodDays: 30,
      expireOldestFirst: true,
      allowRenewal: true,
      renewalFee: 10, // percentage of points
    },
    exemptions: {
      promotionalPoints: true,
      referralPoints: true,
      compensationPoints: true,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pointsRulesService.updateExpirationRules(rules);
      toast.success("Expiration rules updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update expiration rules");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative bg-white rounded-lg w-full max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Points Expiration Rules
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Expiry Period (months)
              </label>
              <input
                type="number"
                value={rules.defaultExpiryPeriod}
                onChange={(e) =>
                  setRules({
                    ...rules,
                    defaultExpiryPeriod: Number(e.target.value),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              />
            </div>

            {/* Tier Extensions */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Tier-based Extensions (months)
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(rules.tierExtensions).map(([tier, months]) => (
                  <div key={tier}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {tier}
                    </label>
                    <input
                      type="number"
                      value={months}
                      onChange={(e) =>
                        setRules({
                          ...rules,
                          tierExtensions: {
                            ...rules.tierExtensions,
                            [tier]: Number(e.target.value),
                          },
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Settings */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Expiry Notifications (days before)
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(rules.notifications).map(([key, days]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="number"
                      value={days}
                      onChange={(e) =>
                        setRules({
                          ...rules,
                          notifications: {
                            ...rules.notifications,
                            [key]: Number(e.target.value),
                          },
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Expiration Policies
              </h4>
              <div className="space-y-4">
                {/* <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rules.policies.allowGracePeriod}
                    onChange={(e) =>
                      setRules({
                        ...rules,
                        policies: {
                          ...rules.policies,
                          allowGracePeriod: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-gray-300 text-green-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Allow Grace Period
                  </span>
                </label> */}

                {rules.policies.allowGracePeriod && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Grace Period (days)
                    </label>
                    <input
                      type="number"
                      value={rules.policies.gracePeriodDays}
                      onChange={(e) =>
                        setRules({
                          ...rules,
                          policies: {
                            ...rules.policies,
                            gracePeriodDays: Number(e.target.value),
                          },
                        })
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                    />
                  </div>
                )}

                {/* <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rules.policies.expireOldestFirst}
                    onChange={(e) =>
                      setRules({
                        ...rules,
                        policies: {
                          ...rules.policies,
                          expireOldestFirst: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-gray-300 text-green-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Expire Oldest Points First
                  </span>
                </label> */}
              </div>
            </div>

            {/* Exemptions */}
            {/* <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Point Type Exemptions
              </h4>
              <div className="space-y-3">
                {Object.entries(rules.exemptions).map(([type, value]) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setRules({
                          ...rules,
                          exemptions: {
                            ...rules.exemptions,
                            [type]: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-gray-300 text-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {type.replace(/([A-Z])/g, " $1")} Points
                    </span>
                  </label>
                ))}
              </div>
            </div> */}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
              >
                Save Rules
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpirationRulesModal;
