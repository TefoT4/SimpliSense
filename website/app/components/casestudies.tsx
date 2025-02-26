"use client";

import { useEffect, useState } from "react";
import Card from "./controls/Card";
import academiaImg from "@/public/academia.png";
import businessImg from "@/public/business.png";
import learningImg from "@/public/learning.png";

const caseStudies = [
  {
    id: 1,
    title: "Academia",
    description:
      "How graduate students improved research speed by 40% using SimpliSense",
    image: academiaImg,
    stats: "40% faster research completion",
  },
  {
    id: 2,
    title: "Business",
    description:
      "Enterprise team reduced onboarding time by 60% with AI-powered learning",
    image: businessImg,
    stats: "60% reduced training time",
  },
  {
    id: 3,
    title: "Personal Learning",
    description:
      "Content creators streamlined their fact-checking process using real-time explanations",
    image: learningImg,
    stats: "85% accuracy improvement",
  },
];

const CaseStudies = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="case-studies"
      className="relative min-h-screen flex items-center py-24 bg-gradient-to-b from-gray-700 to-gray-800 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 font-sans leading-tight">
            Case Studies
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed tracking-wide">
            See how organizations are transforming knowledge sharing with
            SimpliSense
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card
                title={study.title}
                description={study.description}
                image={study.image}
                variant="elevated"
                footer={
                  <div className="flex items-center text-blue-500 font-semibold">
                    <span className="text-2xl mr-2">↑</span>
                    {study.stats}
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
