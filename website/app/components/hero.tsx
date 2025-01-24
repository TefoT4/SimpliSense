import Image from "next/image";
import hero from "@/public/hero.webp";

const HeroSection = () => {
  return (
    <section className="bg-white text-black py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 -right-10 w-60 h-60 bg-blue-300 rounded-full opacity-40"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gray-100 rounded-full opacity-30 blur-2xl"></div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center px-4 relative">
        {/* Left Section: Title, Subtitle, and CTAs */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Personal Knowledge Hub for Real-Time Explanations
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Understand complex ideas instantly, anytime, anywhere.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
              Install Extension
            </button>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Section: Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={hero}
            alt="Illustration representing real-time explanations"
            className="rounded-lg shadow-lg"
            width={600}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
