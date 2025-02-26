"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    "Real-Time Explanations - Get instant clarification as you read content online",
    "Wide Topic Coverage - From science to humanities, we've got you covered",
    "Adjustable Detail Level - Choose how deep you want explanations to go",
    "Citation Support - References to back up explanations",
    "Distraction-Free Interface - Focus on what matters most",
    "Cross-Platform Support - Works seamlessly across your devices",
  ];

  return (
    <section
      id="features"
      className="relative min-h-screen py-24 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
              Features That Make Learning Effortless
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              SimpliSense is designed to enhance your learning experience with
              powerful features that explain complex topics in real-time.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative max-w-lg mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Image
                      src="/demo.gif"
                      alt="SimpliSense Demo"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
                How SimpliSense Transforms Your Reading Experience
              </h3>
              <ul className="space-y-6">
                {features.map((feature, index) => {
                  const [title, description] = feature.split(" - ");
                  return (
                    <li key={index} className="flex items-start">
                      <div className="mr-4 mt-1 flex-shrink-0 text-green-500">
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 tracking-wide">
                          {title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;