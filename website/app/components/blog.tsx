import Image from "next/image";

const posts = [
  {
    id: 1,
    title: "How SimpliSense Enhances Learning for Students",
    description:
      "Discover how SimpliSense helps students in STEM fields simplify complex concepts like quantum mechanics and linear algebra through real-time explanations.",
    date: "January 15, 2025",
    datetime: "2025-01-15",
    category: { title: "Education", href: "/blog/education" },
    href: "/blog/enhancing-learning-for-students",
    author: {
      name: "Dr. Emily Carter",
      role: "Educational Specialist",
      href: "/authors/emily-carter",
      imageUrl: "authors/emily-carter.png",
    },
  },
  {
    id: 2,
    title: "Using SimpliSense in Business Presentations",
    description:
      "Learn how professionals use SimpliSense to quickly demystify jargon and enhance clarity in business reports and high-stakes presentations.",
    date: "February 2, 2025",
    datetime: "2025-02-02",
    category: { title: "Business", href: "/blog/business" },
    href: "/blog/simplisense-in-business",
    author: {
      name: "Michael Brown",
      role: "Business Strategist",
      href: "/authors/michael-brown",
      imageUrl: "authors/michael-brown.png",
    },
  },
  {
    id: 3,
    title: "Mastering Complex Topics for Lifelong Learning",
    description:
      "Explore how SimpliSense is helping lifelong learners tackle subjects like blockchain, philosophy, and more with its intuitive explanation tools.",
    date: "March 12, 2025",
    datetime: "2025-03-12",
    category: { title: "Personal Growth", href: "/blog/personal-growth" },
    href: "/blog/mastering-complex-topics",
    author: {
      name: "Sophia Rodriguez",
      role: "Freelance Writer",
      href: "/authors/sophia-rodriguez",
      imageUrl: "authors/sophia-rodriguez.png",
    },
  },
];

const Blog = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Discover insights and stories about mastering complex ideas,
            lifelong learning, and leveraging real-time knowledge in your daily
            life.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <Image
                  alt={post.author.name}
                  src={`/images/${post.author.imageUrl}`}
                  width={40}
                  height={40}
                  className="size-10 rounded-full bg-gray-50"
                />

                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
