import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { pointsRulesService } from "../../services/pointsRulesService";
import { toast } from "react-hot-toast";

const RedemptionRulesModal = ({ isOpen, onClose }) => {
  const [rules, setRules] = useState({
    minimumPoints: 100,
    maximumPerDay: 1000,
    cooldownPeriod: 24, // hours
    blackoutDates: [],
    tierMultipliers: {
      silver: 1,
      gold: 1.5,
      platinum: 2,
    },
    restrictions: {
      requireKYC: true,
      allowPartialRedemption: true,
      requireActiveStatus: true,
    },
    categories: {
      food: { enabled: true, multiplier: 1 },
      retail: { enabled: true, multiplier: 1.1 },
      travel: { enabled: true, multiplier: 1.2 },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pointsRulesService.updateRedemptionRules(rules);
      toast.success("Redemption rules updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update redemption rules");
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
              Redemption Rules Configuration
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Rules */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Points Required
                </label>
                <input
                  type="number"
                  value={rules.minimumPoints}
                  onChange={(e) =>
                    setRules({
                      ...rules,
                      minimumPoints: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Points Per Day
                </label>
                <input
                  type="number"
                  value={rules.maximumPerDay}
                  onChange={(e) =>
                    setRules({
                      ...rules,
                      maximumPerDay: Number(e.target.value),
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                />
              </div>
            </div>

            {/* Tier Multipliers */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Tier Multipliers- for maximum points per day
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(rules.tierMultipliers).map(([tier, value]) => (
                  <div key={tier}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {tier}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={value}
                      onChange={(e) =>
                        setRules({
                          ...rules,
                          tierMultipliers: {
                            ...rules.tierMultipliers,
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

            {/* Restrictions */}
            {/* <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Restrictions
              </h4>
              <div className="space-y-3">
                {Object.entries(rules.restrictions).map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setRules({
                          ...rules,
                          restrictions: {
                            ...rules.restrictions,
                            [key]: e.target.checked,
                          },
                        })
                      }
                      className="rounded border-gray-300 text-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div> */}

            {/* Category Rules */}
            {/* <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Category Rules
              </h4>
              <div className="space-y-4">
                {Object.entries(rules.categories).map(
                  ([category, settings]) => (
                    <div key={category} className="flex items-center gap-4">
                      <label className="flex items-center min-w-[200px]">
                        <input
                          type="checkbox"
                          checked={settings.enabled}
                          onChange={(e) =>
                            setRules({
                              ...rules,
                              categories: {
                                ...rules.categories,
                                [category]: {
                                  ...settings,
                                  enabled: e.target.checked,
                                },
                              },
                            })
                          }
                          className="rounded border-gray-300 text-green-600"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">
                          {category}
                        </span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.multiplier}
                        onChange={(e) =>
                          setRules({
                            ...rules,
                            categories: {
                              ...rules.categories,
                              [category]: {
                                ...settings,
                                multiplier: Number(e.target.value),
                              },
                            },
                          })
                        }
                        className="block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                      />
                    </div>
                  )
                )}
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

export default RedemptionRulesModal;
