import Image from "next/image";
import academiaImg from "@/public/academia.png";
import businessImg from "@/public/business.png";
import learningImg from "@/public/learning.png";

const CaseStudies = () => {
  return (
    <div>
      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-8 text-black">
            Case Studies
          </h3>
          <p className="text-center text-gray-600 mb-12">
            Discover how SimpliSense empowers users across various domains.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
              <Image
                src={academiaImg}
                alt="Academia"
                className="rounded-md w-24 h-24 mb-4"
              />
              <h4 className="text-lg font-bold mb-2 text-gray-800">Academia</h4>
              <p className="text-gray-600 text-center">
                Students in STEM fields have used SimpliSense to break down
                complex equations, theories, and concepts into digestible
                insights. For instance, physics students found the extension
                invaluable in simplifying quantum mechanics through real-time,
                step-by-step explanations of its principles.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
              <Image
                src={businessImg}
                alt="Business"
                className="rounded-md w-24 h-24 mb-4"
              />
              <h4 className="text-lg font-bold mb-2 text-gray-800">Business</h4>
              <p className="text-gray-600 text-center">
                In corporate environments, marketing teams leveraged SimpliSense
                to demystify technical terms in industry reports. The extension
                provided instant definitions and explanations, saving valuable
                time and boosting team productivity during high-stakes
                presentations.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
              <Image
                src={learningImg}
                alt="Personal Learning"
                className="rounded-md w-24 h-24 mb-4"
              />
              <h4 className="text-lg font-bold mb-2 text-gray-800">
                Personal Learning
              </h4>
              <p className="text-gray-600 text-center">
                Lifelong learners have embraced SimpliSense as a tool to explore
                topics ranging from blockchain to philosophy. The extension’s
                ability to simplify intricate subjects has made it a trusted
                companion for those seeking to enhance their knowledge in their
                free time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
