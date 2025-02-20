"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div
            className={`flex-1 text-center lg:text-left transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Your Personal Knowledge Hub for Real-Time Explanations
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              Get instant, AI-powered explanations for any topic. Learn faster,
              understand better, and boost your knowledge retention with our
              cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium 
                  transform transition-all duration-300 
                  hover:bg-blue-700 hover:scale-105 hover:shadow-lg 
                  active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => console.log("Install Extension clicked")}
              >
                Install Extension
              </button>
              <button
                className="px-8 py-4 bg-gray-700 text-white rounded-full font-medium 
                  transform transition-all duration-300 
                  hover:bg-gray-600 hover:scale-105 hover:shadow-lg 
                  active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => console.log("Learn More clicked")}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`flex-1 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <Image
                  src="/hero.webp"
                  alt="SimpliSense Demo"
                  width={600}
                  height={400}
                  priority
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
