"use client";

import { useEffect, useState } from "react";
import Card from "./controls/Card";
import Tag from "./controls/Tag";
import Image from "next/image";
import { posts } from "@/app/data/posts";

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="blog"
      className="relative min-h-screen flex items-center py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white font-sans leading-tight">
            Blog
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed tracking-wide">
            Insights and updates from the world of SimpliSense
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card
                title={post.title}
                description={post.description}
                image={post.image}
                variant="default"
                className="hover:scale-105"
                href={`/blog/${post.id}`}
              >
                <div className="flex items-center justify-between">
                  <Tag
                    label={post.category}
                    color={post.category === "Education" ? "blue" : "green"}
                  />
                  <time
                    dateTime="2025-01-15"
                    className="text-gray-500 dark:text-gray-400 text-sm font-medium"
                  >
                    {post.date}
                  </time>
                </div>
                <div className="flex items-center mt-4">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold dark:text-gray-300">
                      {post.author.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {post.author.role}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
