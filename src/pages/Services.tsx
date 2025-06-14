
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-estate-800 mb-4">
            Our Services
          </h1>
          <p className="text-estate-500 text-lg">
            Explore the range of services we offer to make your real estate journey seamless.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-gray-50">
                <h2 className="text-2xl font-bold text-estate-800 mb-2">Real Estate Services</h2>
                <p className="text-estate-600">From buying and selling to property management, our expert team is here to guide you every step of the way.</p>
            </div>
            <div className="p-8 border rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-gray-50">
                <h2 className="text-2xl font-bold text-estate-800 mb-2">Furniture Services</h2>
                <p className="text-estate-600">Furnish your new home with our curated selection of high-quality furniture, delivered and assembled for you.</p>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
