import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const ConversionRulesModal = ({ isOpen, onClose }) => {
  const [rules, setRules] = useState({
    pointsToCoins: {
      rate: 10, // 10 points = 1 coin
      minimumPoints: 100,
      maximumPerDay: 1000,
      enabled: true,
    },
    tierBonuses: {
      silver: 0,
      gold: 5,
      platinum: 10,
    },
    restrictions: {
      requireKYC: true,
      allowPartial: false,
      cooldownHours: 24,
    },
    specialRates: [
      {
        name: "Weekend Bonus",
        multiplier: 1.2,
        startDay: 5, // Friday
        endDay: 6, // Saturday
        enabled: true,
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call would go here
      toast.success("Conversion rules updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update conversion rules");
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
              Points Conversion Rules
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Conversion Rate */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Basic Conversion Rate
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Points per Coin
                  </label>
                  <input
                    type="number"
                    value={rules.pointsToCoins.rate}
                    onChange={(e) =>
                      setRules({
                        ...rules,
                        pointsToCoins: {
                          ...rules.pointsToCoins,
                          rate: Number(e.target.value),
                        },
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum Points
                  </label>
                  <input
                    type="number"
                    value={rules.pointsToCoins.minimumPoints}
                    onChange={(e) =>
                      setRules({
                        ...rules,
                        pointsToCoins: {
                          ...rules.pointsToCoins,
                          minimumPoints: Number(e.target.value),
                        },
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Tier Bonuses */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Tier Bonuses (%)
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(rules.tierBonuses).map(([tier, bonus]) => (
                  <div key={tier}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {tier}
                    </label>
                    <input
                      type="number"
                      value={bonus}
                      onChange={(e) =>
                        setRules({
                          ...rules,
                          tierBonuses: {
                            ...rules.tierBonuses,
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
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Restrictions
              </h4>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rules.restrictions.requireKYC}
                    onChange={(e) =>
                      setRules({
                        ...rules,
                        restrictions: {
                          ...rules.restrictions,
                          requireKYC: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-gray-300 text-green-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Require KYC Verification
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rules.restrictions.allowPartial}
                    onChange={(e) =>
                      setRules({
                        ...rules,
                        restrictions: {
                          ...rules.restrictions,
                          allowPartial: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-gray-300 text-green-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Allow Partial Conversions
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cooldown Period (hours)
                  </label>
                  <input
                    type="number"
                    value={rules.restrictions.cooldownHours}
                    onChange={(e) =>
                      setRules({
                        ...rules,
                        restrictions: {
                          ...rules.restrictions,
                          cooldownHours: Number(e.target.value),
                        },
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                  />
                </div>
              </div>
            </div> */}

            {/* Special Rates */}
            {/* <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Special Rates
              </h4>
              {rules.specialRates.map((rate, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={rate.enabled}
                        onChange={(e) => {
                          const newRates = [...rules.specialRates];
                          newRates[index].enabled = e.target.checked;
                          setRules({ ...rules, specialRates: newRates });
                        }}
                        className="rounded border-gray-300 text-green-600"
                      />
                      <input
                        type="text"
                        value={rate.name}
                        onChange={(e) => {
                          const newRates = [...rules.specialRates];
                          newRates[index].name = e.target.value;
                          setRules({ ...rules, specialRates: newRates });
                        }}
                        className="ml-2 block border-0 bg-transparent focus:ring-0 text-sm font-medium"
                      />
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      value={rate.multiplier}
                      onChange={(e) => {
                        const newRates = [...rules.specialRates];
                        newRates[index].multiplier = Number(e.target.value);
                        setRules({ ...rules, specialRates: newRates });
                      }}
                      className="w-24 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm"
                    />
                  </div>
                </div>
              ))}
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

export default ConversionRulesModal;
