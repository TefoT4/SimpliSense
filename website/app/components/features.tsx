"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const featuresList = [
  {
    id: 1,
    title: "Real-Time Explanations",
    description:
      "Get instant, accurate explanations of complex terms and concepts.",
  },
  {
    id: 2,
    title: "Wide Topic Coverage",
    description:
      "From science and technology to art and philosophy, we cover it all.",
  },
  {
    id: 3,
    title: "Customizable Experience",
    description: "Choose your preferred language model for tailored results.",
  },
  {
    id: 4,
    title: "User-Friendly Interface",
    description: "Simple and intuitive design for seamless use.",
  },
  {
    id: 5,
    title: "Cross-Domain Applications",
    description: "Perfect for students, professionals, and lifelong learners.",
  },
];

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="features"
      className="relative min-h-screen flex items-center py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,black,rgba(0,0,0,0))]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600">
            Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the power of instant knowledge with our cutting-edge AI
            technology
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Demo Section */}
          <div
            className={`w-full md:w-1/2 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group">
              {/* Browser Mock Header */}
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 group-hover:animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 group-hover:animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 group-hover:animate-pulse"></div>
                </div>
                <div className="flex-1 bg-gray-100 rounded h-8 group-hover:bg-gray-200 transition-colors duration-300"></div>
              </div>
              {/* Demo GIF */}
              <div className="relative rounded-lg overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <Image
                  src="/demo.gif"
                  alt="SimpliSense Demo"
                  width={800}
                  height={450}
                  className="w-full rounded relative"
                />
              </div>
            </div>
          </div>

          {/* Features List */}
          <div
            className={`w-full md:w-1/2 transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <h3 className="text-blue-600 font-semibold mb-2 tracking-wide">
              DISCOVER SIMPLISENSE
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Powerful Knowledge Features
            </p>
            <ul className="space-y-6">
              {featuresList.map((feature, index) => (
                <li
                  key={feature.id}
                  className={`flex items-start gap-4 transform transition-all duration-500 hover:translate-x-2`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
