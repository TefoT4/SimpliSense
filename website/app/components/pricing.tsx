"use client";

import { useState, useEffect } from "react";
import Card from "./controls/Card";
import CustomButton from "./controls/CustomButton";
import Modal from "./controls/Modal";

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that works best for you. All plans include access
              to our core features with different usage limits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="flex">
              <Card
                title="Free Plan"
                description="Perfect for casual learners"
                className="flex-1 h-full"
                variant="default"
                footer={
                  <CustomButton
                    variant="outline"
                    className="w-full"
                    onClick={() => handlePlanSelection("Free")}
                  >
                    Get Started
                  </CustomButton>
                }
              >
                <div className="mb-8 text-center">
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Free
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    3 daily explanations, 15/month
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Includes:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Access to basic topics",
                      "Limited to 3 daily explanations",
                      "Standard LLM integration",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>

            {/* Premium Plan */}
            <div className="flex">
              <Card
                title="Premium Plan"
                description="Best for professionals and students"
                className="flex-1 h-full border-blue-500 dark:border-blue-400"
                variant="elevated"
                footer={
                  <CustomButton
                    variant="primary"
                    className="w-full"
                    onClick={() => handlePlanSelection("Premium")}
                  >
                    Upgrade Now
                  </CustomButton>
                }
              >
                <div className="mb-8 text-center">
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    R9.99/month
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    150 explanations per month
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Includes:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "High-quality, enhanced explanations",
                      "Access to premium LLMs",
                      "Advanced interactive features",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              All plans are subject to our fair use policy. For enterprise
              needs,{" "}
              <a href="#" className="text-blue-500 hover:underline">
                contact us
              </a>{" "}
              for custom pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Subscribe to ${selectedPlan} Plan`}
        size="md"
        footer={
          <>
            <CustomButton variant="default" onClick={() => setShowModal(false)}>
              Cancel
            </CustomButton>
            <CustomButton
              variant="primary"
              onClick={() => {
                console.log(`Subscribed to ${selectedPlan} plan`);
                setShowModal(false);
              }}
            >
              Confirm
            </CustomButton>
          </>
        }
      >
        <div className="py-4">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {selectedPlan === "Free"
              ? "You're about to start your free plan with SimpliSense. This includes 3 daily explanations, up to 15 per month."
              : "You're about to subscribe to our Premium plan for R9.99/month. This includes 150 explanations per month and access to all premium features."}
          </p>

          {selectedPlan === "Premium" && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Payment Details
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  • Subscription will start immediately
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  • You can cancel anytime from your account
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  • No long-term commitments
                </p>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default Pricing;
