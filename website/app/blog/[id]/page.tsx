import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/app/data/posts";
import Tag from "@/app/components/controls/Tag";
import Header from "@/app/components/header";
import BlogContent from "@/app/components/blog/BlogContent";

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <Link
            href="/#blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Article header */}
          <article>
            <header className="mb-10">
              <Tag href={`/category/${post.category.toLowerCase()}`}>
                {post.category}
              </Tag>
              <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900 dark:text-white">
                {post.title}
              </h1>

              <div className="flex items-center mb-6">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <span className="block font-medium text-gray-900 dark:text-white">
                    {post.author.name}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {post.author.role}
                  </span>
                </div>
                <span className="mx-4 text-gray-300 dark:text-gray-600">|</span>
                <time
                  className="text-gray-500 dark:text-gray-400"
                  dateTime={post.date}
                >
                  {post.date}
                </time>
              </div>

              <div className="relative rounded-xl overflow-hidden mb-10 h-96">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </header>

            {/* Article content */}
            <div className="prose prose-lg max-w-none dark:prose-invert prose-blue">
              {post.content ? (
                <BlogContent blocks={post.content} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: post.details || "" }} />
              )}
            </div>
          </article>

          {/* Share section */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Share this article
              </h3>
              <div className="flex space-x-4">
                {/* Share buttons */}
                <button
                  aria-label="Share on Twitter"
                  className="text-gray-500 hover:text-blue-400 dark:text-gray-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button
                  aria-label="Share on LinkedIn"
                  className="text-gray-500 hover:text-blue-700 dark:text-gray-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button
                  aria-label="Share by Email"
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
