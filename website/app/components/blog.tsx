"use client";

import { useEffect, useState } from "react";
import Tag from "./controls/Tag";
import Image from "next/image";

const posts = [
  {
    id: 1,
    title: "How SimpliSense Enhances Learning for Students",
    description:
      "Discover how SimpliSense can help students learn more effectively with real-time explanations.",
    date: "January 15, 2025",
    category: "Education",
    author: {
      name: "Emily Carter",
      role: "Educator",
      image: "/images/authors/emily-carter.png",
    },
  },
  {
    id: 2,
    title: "The Future of AI in Education",
    description:
      "Exploring the impact of AI technologies on the educational landscape.",
    date: "February 10, 2025",
    category: "Technology",
    author: {
      name: "Michael Brown",
      role: "Tech Writer",
      image: "/images/authors/michael-brown.png",
    },
  },
  {
    id: 3,
    title: "Mastering Complex Topics for Lifelong Learning",
    description:
      "Explore how SimpliSense is helping lifelong learners tackle subjects like blockchain, philosophy, and more with its intuitive explanation tools.",
    date: "March 12, 2025",
    category: "Personal Growth",
    author: {
      name: "Sophia Rodriguez",
      role: "Freelance Writer",
      image: "/images/authors/sophia-rodriguez.png",
    },
  },
];

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="blog"
      className="relative min-h-screen flex items-center py-24 bg-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Blog</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights and updates from the world of SimpliSense
          </p>
        </div>

        {/* Blog Posts Grid */}
        {/* 1) items-stretch => each cell stretches to the same height */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {posts.map((post, index) => (
            // 2) h-full on the outer wrapper
            <div
              key={post.id}
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              } h-full`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* 3) flex flex-col h-full on the card so it occupies full space */}
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full transition-transform duration-300 hover:shadow-2xl hover:scale-105">
                <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Optional: Add a spacer here if you want the tag/date/author to sit at the bottom */}
                {/* <div className="flex-grow" /> */}

                <div className="flex items-center justify-between">
                  <Tag label={post.category} />
                  <span className="text-gray-500">{post.date}</span>
                </div>
                <div className="flex items-center mt-4">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {post.author.name}
                    </p>
                    <p className="text-gray-500 text-sm">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
