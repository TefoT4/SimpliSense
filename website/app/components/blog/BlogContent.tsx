import React from "react";
import { BlogBlock } from "@/app/types/blog";

interface BlogContentProps {
  blocks: BlogBlock[];
}

const BlogContent: React.FC<BlogContentProps> = ({ blocks }) => {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
            const headingClasses = {
              1: "text-3xl font-bold mb-6 text-gray-900 dark:text-white",
              2: "text-2xl font-bold mb-4 text-gray-900 dark:text-white",
              3: "text-xl font-semibold mb-3 text-gray-900 dark:text-white",
              4: "text-lg font-semibold mb-2 text-gray-900 dark:text-white",
              5: "text-base font-medium mb-2 text-gray-900 dark:text-white",
              6: "text-sm font-medium mb-1 text-gray-900 dark:text-white",
            }[block.level];

            return (
              <HeadingTag key={index} className={headingClasses}>
                {block.text}
              </HeadingTag>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul
                key={index}
                className={
                  block.style === "bullet"
                    ? "list-disc pl-5"
                    : "list-decimal pl-5"
                }
              >
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "image":
            return (
              <figure key={index} className="my-6">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="rounded-lg w-full"
                />
                {block.caption && (
                  <figcaption className="text-sm text-center text-gray-500 mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300"
              >
                <p>{block.text}</p>
                {block.author && (
                  <footer className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    — {block.author}
                  </footer>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogContent;
