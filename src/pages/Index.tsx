
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import AboutUs from "@/components/AboutUs";
import OurVision from "@/components/OurVision";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Armchair, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <section id="properties" className="py-32 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-estate-800 mb-4">
              Featured Properties
            </h2>
            <p className="text-estate-500 text-lg">
              Browse our exclusive selection of premium properties that represent the finest in luxury real estate.
            </p>
          </div>
          <PropertyGrid />
        </div>
      </section>

      <section id="furniture" className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-estate-50 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 max-w-lg">
              <div className="inline-flex items-center justify-center p-2 bg-estate-100 rounded-full mb-4">
                <Armchair className="h-6 w-6 text-estate-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">
                Home Furniture Collection
              </h2>
              <p className="text-estate-600 mb-8">
                Explore our curated selection of premium furniture to transform your living space. From elegant sofas to functional dining sets, we have everything you need for your perfect home.
              </p>
              <Link to="/furniture">
                <Button className="bg-estate-800 hover:bg-estate-700 inline-flex items-center">
                  Browse Furniture
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="aspect-square bg-estate-100 rounded-lg flex items-center justify-center p-4">
                <img src="/placeholder.svg" alt="Modern sofa" className="max-h-full"/>
              </div>
              <div className="aspect-square bg-estate-200 rounded-lg flex items-center justify-center p-4">
                <img src="/placeholder.svg" alt="Dining table" className="max-h-full"/>
              </div>
              <div className="aspect-square bg-estate-200 rounded-lg flex items-center justify-center p-4">
                <img src="/placeholder.svg" alt="Office desk" className="max-h-full"/>
              </div>
              <div className="aspect-square bg-estate-100 rounded-lg flex items-center justify-center p-4">
                <img src="/placeholder.svg" alt="Bedroom set" className="max-h-full"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutUs />
      <OurVision />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
