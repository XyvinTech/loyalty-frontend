import React, { useState } from "react";

const MerchantOfferRedemption = ({ offer }) => {
  const [redemptionPin, setRedemptionPin] = useState(null);

  const handleRedeem = async () => {
    try {
      // 1. Verify points balance
      const hasEnoughPoints = await verifyPointsBalance(offer.pointsRequired);
      if (!hasEnoughPoints) {
        throw new Error("Insufficient points");
      }

      // 2. Generate unique PIN
      const pin = await generateRedemptionPin({
        offerId: offer.id,
        merchantId: offer.merchantId,
        userId: currentUser.id,
      });

      // 3. Deduct points
      await deductPoints(offer.pointsRequired);

      // 4. Save redemption record
      await saveRedemption({
        offerId: offer.id,
        userId: currentUser.id,
        pin: pin,
        status: "active",
        expiryDate: calculateExpiryDate(offer.validityPeriod),
      });

      setRedemptionPin(pin);
    } catch (error) {
      console.error("Redemption failed:", error);
    }
  };

  return (
    <div>
      {redemptionPin ? (
        <div className="text-center">
          <h3>Your Redemption PIN</h3>
          <div className="text-2xl font-bold my-4">{redemptionPin}</div>
          <p>Show this PIN at {offer.merchantName} to avail your offer</p>
          <p>Valid for: {offer.validityPeriod}</p>
        </div>
      ) : (
        <button onClick={handleRedeem}>
          Redeem for {offer.pointsRequired} points
        </button>
      )}
    </div>
  );
};

export default MerchantOfferRedemption;
