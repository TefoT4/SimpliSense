"use client";

import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import CustomButton from "./controls/CustomButton";
import ConfirmationModal from "./ConfirmationModal";

export default function SubscriptionManagement() {
  const [subscription, setSubscription] = useState({
    plan: "Free",
    status: "Active",
    nextBillingDate: "2024-01-01",
    usage: {
      used: 12,
      total: 15,
    },
  });

  const [showUpgradePrompt, setShowUpgradePrompt] = useState(
    subscription.usage.used / subscription.usage.total >= 0.8
  );

  const [showCancelModal, setShowCancelModal] = useState(false);

  const [{ isPending }] = usePayPalScriptReducer();

  const subscriptionPlans = [
    {
      id: "P-3MX06535JJ3220836L5IFM4I",
      name: "Basic",
      price: "$9.99/month",
      features: ["50 explanations/month", "Basic support"],
    },
    {
      id: "P-3MX06535JJ3220836L5IFM4I-PREMIUM",
      name: "Premium",
      price: "$19.99/month",
      features: ["Unlimited explanations", "Priority support", "Advanced features"],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);

  const createSubscription = (
    data: Record<string, unknown>,
    actions: Record<string, unknown>
  ) => {
    return (
      actions.subscription as {
        create: (options: { plan_id: string }) => Promise<string>;
      }
    ).create({
      plan_id: "P-3MX06535JJ3220836L5IFM4I",
    });
  };

  const onApprove = async () => {
    setSubscription((prev) => ({
      ...prev,
      plan: "Premium",
      status: "Active",
      usage: {
        used: 0,
        total: 150,
      },
    }));
    setShowUpgradePrompt(false);
  };

  const onError = (err: Record<string, unknown>) => {
    console.error("PayPal error:", err);
    alert("Payment failed. Please try again.");
  };

  const handleCancelSubscription = () => {
    setSubscription((prev) => ({
      ...prev,
      plan: "Free",
      status: "Cancelled",
      usage: {
        used: 0,
        total: 15,
      },
    }));
    setShowCancelModal(false);
  };

  return (
    <div className="space-y-6">
      {showUpgradePrompt && (
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
          <p>
            You&apos;ve used{" "}
            {Math.round(
              (subscription.usage.used / subscription.usage.total) * 100
            )}
            % of your monthly quota. Upgrade now for unlimited access!
          </p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Current Plan:</span>
            <span className="font-medium">{subscription.plan}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-medium">{subscription.status}</span>
          </div>
          <div className="flex justify-between">
            <span>Next Billing Date:</span>
            <span className="font-medium">{subscription.nextBillingDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Usage:</span>
            <span className="font-medium">
              {subscription.usage.used}/{subscription.usage.total} explanations
            </span>
          </div>
        </div>
      </div>

      {subscription.plan === "Free" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedPlan.id === plan.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {plan.price}
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {isPending ? (
            <div className="text-center">Loading PayPal...</div>
          ) : (
            <PayPalButtons
              createSubscription={() =>
                createSubscription({}, { subscription: { create: () => Promise.resolve(selectedPlan.id) } })
              }
              onApprove={onApprove}
              onError={onError}
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "subscribe",
              }}
            />
          )}
        </div>
      )}

      {subscription.plan === "Free" ? (
        <CustomButton
          variant="danger"
          onClick={() => setShowCancelModal(true)}
          className="w-full"
        >
          Cancel Subscription
        </CustomButton>
      ) : (
        <CustomButton
          variant="danger"
          onClick={() => setShowCancelModal(true)}
          className="w-full"
        >
          Cancel Subscription
        </CustomButton>
      )}

      <ConfirmationModal
        isOpen={showCancelModal}
        onConfirm={handleCancelSubscription}
        onCancel={() => setShowCancelModal(false)}
        title="Cancel Subscription"
        message="Are you sure you want to cancel your Premium subscription? You'll lose access to premium features at the end of your billing period."
      />
    </div>
  );
}
