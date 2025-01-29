import { useState, useEffect } from "react";
import { CalculatorIcon } from "@heroicons/react/24/outline";

const ConversionCalculator = ({ rules }) => {
  const [points, setPoints] = useState("");
  const [result, setResult] = useState({
    coins: 0,
    bonus: 0,
    total: 0,
  });
  const [userTier] = useState("gold"); // This would come from user context/props

  const calculateConversion = () => {
    const pointsNum = Number(points);
    if (!pointsNum) return;

    // Base conversion
    const baseCoins = pointsNum / rules.pointsToCoins.rate;

    // Tier bonus
    const tierBonus = baseCoins * (rules.tierBonuses[userTier] / 100);

    // Special rates
    const activeSpecialRates = rules.specialRates.filter((r) => r.enabled);
    const specialBonus = activeSpecialRates.reduce((acc, rate) => {
      return acc + baseCoins * (rate.multiplier - 1);
    }, 0);

    setResult({
      coins: baseCoins,
      bonus: tierBonus + specialBonus,
      total: baseCoins + tierBonus + specialBonus,
    });
  };

  useEffect(() => {
    calculateConversion();
  }, [points]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <CalculatorIcon className="w-6 h-6 text-green-600" />
        <h2 className="text-lg font-medium text-gray-900">
          Conversion Calculator
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Points to Convert
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
              placeholder="Enter points amount"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Base Coins</p>
              <p className="text-lg font-semibold text-gray-900">
                {result.coins.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bonus Coins</p>
              <p className="text-lg font-semibold text-green-600">
                +{result.bonus.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Coins</p>
              <p className="text-lg font-semibold text-gray-900">
                {result.total.toFixed(2)}
              </p>
            </div>
          </div>

          {points && Number(points) < rules.pointsToCoins.minimumPoints && (
            <div className="mt-4 text-sm text-red-600">
              Minimum {rules.pointsToCoins.minimumPoints} points required for
              conversion
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversionCalculator;
