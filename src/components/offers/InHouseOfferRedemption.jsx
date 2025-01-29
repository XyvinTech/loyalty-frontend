import React, { useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const InHouseOfferRedemption = ({ offer }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [error, setError] = useState(null);

  const applyDiscount = async (transactionAmount) => {
    let discountAmount = 0;

    try {
      // Verify conditions first
      if (
        offer.conditions.minTransactionAmount &&
        transactionAmount < offer.conditions.minTransactionAmount
      ) {
        throw new Error(
          `Minimum transaction amount: ${offer.conditions.minTransactionAmount} OMR`
        );
      }

      switch (offer.discountType) {
        case "percentage":
          discountAmount = (transactionAmount * offer.discountValue) / 100;
          if (offer.conditions.maxDiscountAmount) {
            discountAmount = Math.min(
              discountAmount,
              offer.conditions.maxDiscountAmount
            );
          }
          break;

        case "fixed":
          discountAmount = offer.discountValue;
          break;

        case "cashback":
          discountAmount = (transactionAmount * offer.discountValue) / 100;
          if (offer.conditions.maxCashbackAmount) {
            discountAmount = Math.min(
              discountAmount,
              offer.conditions.maxCashbackAmount
            );
          }
          break;
      }

      // Verify service type if specified
      if (
        offer.redemptionProcess.serviceTypes &&
        !offer.redemptionProcess.serviceTypes.includes(currentService)
      ) {
        throw new Error("Offer not valid for this service");
      }

      // Verify payment method if specified
      if (
        offer.redemptionProcess.paymentMethods &&
        !offer.redemptionProcess.paymentMethods.includes(currentPaymentMethod)
      ) {
        throw new Error("Offer not valid for this payment method");
      }

      await deductPoints(offer.pointsRequired);
      setIsApplied(true);
      return discountAmount;
    } catch (error) {
      setError(error.message);
      return 0;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{offer.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
        </div>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          {offer.pointsRequired} points
        </span>
      </div>

      {/* Discount Details */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Discount:</span>
          <span>
            {offer.discountType === "fixed"
              ? `${offer.discountValue} OMR`
              : `${offer.discountValue}%`}
          </span>
        </div>

        {/* Conditions */}
        <div className="text-sm text-gray-600">
          {offer.conditions.minTransactionAmount && (
            <div className="flex items-center gap-1">
              <span>Min. Transaction:</span>
              <span>{offer.conditions.minTransactionAmount} OMR</span>
            </div>
          )}
          {offer.conditions.maxDiscountAmount && (
            <div className="flex items-center gap-1">
              <span>Max. Discount:</span>
              <span>{offer.conditions.maxDiscountAmount} OMR</span>
            </div>
          )}
        </div>

        {/* Service/Payment Method Restrictions */}
        {(offer.redemptionProcess.serviceTypes ||
          offer.redemptionProcess.paymentMethods) && (
          <div className="mt-3 text-sm">
            <p className="font-medium text-gray-900">Valid for:</p>
            {offer.redemptionProcess.serviceTypes && (
              <div className="flex flex-wrap gap-2 mt-1">
                {offer.redemptionProcess.serviceTypes.map((service) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}
            {offer.redemptionProcess.paymentMethods && (
              <div className="flex flex-wrap gap-2 mt-1">
                {offer.redemptionProcess.paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                  >
                    {method}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-2 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
          <XMarkIcon className="w-4 h-4" />
          {error}
        </div>
      )}

      {isApplied && (
        <div className="mt-4 p-2 bg-green-50 text-green-600 text-sm rounded-lg flex items-center gap-2">
          <CheckIcon className="w-4 h-4" />
          Discount applied successfully!
        </div>
      )}
    </div>
  );
};

export default InHouseOfferRedemption;
