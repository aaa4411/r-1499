
import { Button } from "./ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { FeatureBadge } from "./ui/feature-badge";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-estate-900 via-estate-800 to-estate-700 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2071&q=80"
          alt="Luxury home exterior"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-estate-900/80 via-estate-800/60 to-estate-700/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature Badge */}
        <div className="mb-6 flex justify-center">
          <FeatureBadge icon={<MapPin className="h-4 w-4" />}>
            Luxury Real Estate Solutions
          </FeatureBadge>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
          Find Your Dream{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            Luxury Home
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover exceptional properties and sustainable living spaces curated for modern lifestyles.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link to="/properties">
            <Button 
              size="lg" 
              className="bg-white text-estate-800 hover:bg-gray-100 font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
            >
              Explore Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/contact">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-estate-800 font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
            >
              Get Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
