export const sendSubscriptionEmail = async (email: string, type: "upgrade" | "downgrade" | "cancel") => {
  const subject = {
    upgrade: "Subscription Upgrade Confirmation",
    downgrade: "Subscription Downgrade Confirmation",
    cancel: "Subscription Cancellation Confirmation",
  }[type];

  const body = {
    upgrade: "Your subscription has been successfully upgraded to Premium.",
    downgrade: "Your subscription has been downgraded to Free.",
    cancel: "Your subscription has been cancelled.",
  }[type];

  // Simulate email sending
  console.log(`Sending email to ${email}: ${subject} - ${body}`);
}; 