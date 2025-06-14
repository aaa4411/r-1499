
import { MapPin } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 animate-in zoom-in duration-700"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 animate-in fade-in duration-1000" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 animate-in slide-in-from-top duration-700 delay-300">
            <MapPin className="w-4 h-4 text-white animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Luxury Real Estate Solutions</span>
          </div>
          
          {/* Animated main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight tracking-tight animate-in slide-in-from-left duration-1000 delay-500">
            Find Your Dream
            <br />
            <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent animate-in slide-in-from-right duration-1000 delay-700">
              Luxury Home
            </span>
          </h1>
          
          {/* Animated description */}
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-900 drop-shadow-sm">
            Discover exceptional properties and sustainable living spaces curated for modern lifestyles.
          </p>
          
          {/* Animated search bar */}
          <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/5 p-2 rounded-2xl border border-white/10 animate-in slide-in-from-bottom duration-1000 delay-1100 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <SearchBar />
          </div>
        </div>

        {/* Animated stats at bottom */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-in fade-in duration-1000 delay-1300">
          <div className="grid grid-cols-3 gap-8 px-4">
            {[
              { label: "Properties", value: "1,500+", delay: "delay-1400" },
              { label: "Happy Clients", value: "800+", delay: "delay-1500" },
              { label: "Cities", value: "50+", delay: "delay-1600" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transform hover:scale-110 transition-all duration-300 animate-in slide-in-from-bottom duration-700 ${stat.delay}`}
              >
                <p className="text-3xl font-display text-white mb-1 drop-shadow-lg">{stat.value}</p>
                <p className="text-sm text-white/80 drop-shadow-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating elements for extra visual appeal */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-white/5 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-bounce opacity-25" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Hero;
