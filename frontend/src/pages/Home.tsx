import HeroSection from "../components/HeroSection"

export function Home() {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to Legal AI Assistant
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Your intelligent companion for legal document analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
              <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                Learn More
              </button>
            </div> */}
            <HeroSection/>
        </div>
      </div>
    );
  }