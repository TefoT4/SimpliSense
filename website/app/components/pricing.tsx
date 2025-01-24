import React from "react";

const Pricing = () => {
  return (
    <section className="py-16 bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">Our Pricing Plan</h1>
        <p className="text-gray-600 mt-4">
          Choose the perfect plan that fits your needs. Upgrade anytime.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Free Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border">
          <h2 className="text-xl font-semibold text-gray-800">Free Plan</h2>
          <p className="text-4xl font-bold text-blue-600 mt-4">R0</p>
          <p className="text-gray-600 mt-2">Perfect for casual learners.</p>
          <ul className="mt-6 text-left space-y-2 text-gray-500">
            <li>✔ Access to basic topics</li>
            <li>✔ Limited 3 daily explanations</li>
            <li>✔ LLM integration with free models</li>
          </ul>
          <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Choose Free Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-blue-600">
          <h2 className="text-xl font-semibold text-gray-800">Pro Plan</h2>
          <p className="text-4xl font-bold text-blue-600 mt-4">R9.99/month</p>
          <p className="text-gray-600 mt-2 ">
            Best for professionals and students.
          </p>
          <ul className="mt-6 text-left space-y-2 text-gray-500">
            <li>✔ Unlimited explanations</li>
            <li>✔ Access to premium LLMs</li>
            <li>✔ Advanced topics and features</li>
          </ul>
          <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Choose Pro Plan
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border">
          <h2 className="text-xl font-semibold text-gray-800">
            Enterprise Plan
          </h2>
          <p className="text-4xl font-bold text-blue-600 mt-4">
            Custom Pricing
          </p>
          <p className="text-gray-600 mt-2">For teams and organizations.</p>
          <ul className="mt-6 text-left space-y-2 text-gray-500">
            <li>✔ Team accounts</li>
            <li>✔ Advanced analytics</li>
            <li>✔ Custom LLM integrations</li>
          </ul>
          <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
