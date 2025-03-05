import { FileText, Brain, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
// import "./../../public/img1.jpg"
const slides = [
  {
    icon: <FileText className="h-16 w-16 text-indigo-400 mb-6" />,
    title: "Smart Document Analysis",
    description: "Upload any legal document and get instant, AI-powered analysis and summaries.",
    background: "./../../img1.jpg",
  },
  {
    icon: <Brain className="h-16 w-16 text-indigo-400 mb-6" />,
    title: "AI-Powered Chat",
    description: "Ask questions about your documents and get intelligent, context-aware responses.",
    background: "./../../img2.jpg",
  },
  {
    icon: <Users className="h-16 w-16 text-indigo-400 mb-6" />,
    title: "Secure & Private",
    description: "Your documents are processed securely and privately, with user-specific access control.",
    background: "./../../img3.jpg",
  },
];

const HeroSection = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay, Pagination]}
      effect="fade"
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      className="w-full h-[90vh]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-[90vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.background})` }}
          >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="p-8 rounded-lg shadow-lg">
                
                <h3 className="text-4xl font-bold text-white mb-3">{slide.title}</h3>
                <p className="text-lg text-gray-300 max-w-xl">{slide.description}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;