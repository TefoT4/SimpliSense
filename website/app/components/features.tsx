import Image from "next/image";
import demoGif from "@/public/demo.gif";

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-black">
          Key Features
        </h2>

        {/* Live Demo and Features List Section */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-top">
          {/* Live Demo Section */}
          <div className="w-full md:w-1/2 mb-16 mr-4 md:mb-0 text-center md:text-left border border-gray-300 rounded-lg shadow-lg">
            <div className="mock-browser p-4 border rounded-lg shadow-lg inline-block overflow-hidden">
              <Image
                src={demoGif}
                alt="Live Demo of SimpliSense"
                className="h-auto object-cover"
              />
            </div>
          </div>

          {/* Features List Section */}
          <div className="w-full md:w-1/2 text-left p-8 border ml-4 border-gray-300 rounded-lg">
            <h4 className="text-blue-600 font-semibold mb-2">
              DISCOVER SIMPLISENSE
            </h4>
            <p className="text-gray-500 mb-4 text-base">
              Powerful Knowledge Features
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">&#10004;</span>
                <p className="text-gray-500">
                  <span className="font-semibold">
                    Real-Time Explanations:
                  </span>{" "}
                  Get instant, accurate explanations of complex terms and
                  concepts.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">&#10004;</span>
                <p className="text-gray-500">
                  <span className="font-semibold">Wide Topic Coverage:</span> From science and
                  technology to art and philosophy, we cover it all.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">&#10004;</span>
                <p className="text-gray-500">
                  <span className="font-semibold">Customizable Experience:</span> Choose your
                  preferred language model for tailored results.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">&#10004;</span>
                <p className="text-gray-500">
                  <span className="font-semibold">User-Friendly Interface:</span> Simple and intuitive
                  design for seamless use.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">&#10004;</span>
                <p className="text-gray-500">
                  <span className="font-semibold">Cross-Domain Applications:</span> Perfect for
                  students, professionals, and lifelong learners.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
