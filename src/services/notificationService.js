export const sendNotification = async (type, data) => {
  const notifications = {
    adjustment_requested: {
      title: "New Point Adjustment Request",
      message: `A new point adjustment request for ${data.points} points has been submitted for ${data.customerName}`,
      recipients: ["approvers"],
    },
    adjustment_approved: {
      title: "Point Adjustment Approved",
      message: `Your point adjustment request for ${data.points} points has been approved`,
      recipients: ["requester"],
    },
    adjustment_rejected: {
      title: "Point Adjustment Rejected",
      message: `Your point adjustment request for ${data.points} points has been rejected. Reason: ${data.reason}`,
      recipients: ["requester"],
    },
  };

  const notification = notifications[type];
  
  try {
    // API call to send notification would go here
    console.log("Sending notification:", notification);
    return true;
  } catch (error) {
    console.error("Failed to send notification:", error);
    return false;
  }
}; 