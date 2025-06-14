
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  School, 
  ShoppingBag, 
  Utensils, 
  TreeDeciduous 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyHeader from "@/components/property/PropertyHeader";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyDescription from "@/components/property/PropertyDescription";
import PropertyActions from "@/components/property/PropertyActions";
import PropertyMap from "@/components/property/PropertyMap";
import { PropertyStatusBadge } from "@/components/property/PropertyStatusBadge";
import { properties } from "@/data/propertyDetails";
import { useProperties } from "@/hooks/useProperties";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRoles } from "@/hooks/useAdminRoles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isRental, setIsRental] = useState(false);
  const { getPropertyById } = useProperties();
  const { user } = useAuth();
  const { isAdmin } = useAdminRoles();
  
  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const supabaseProperty = await getPropertyById(id);
        if (supabaseProperty) {
          setProperty(supabaseProperty);
          return;
        }
      }

      const foundProperty = properties.find(p => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);
      }
    };
    
    fetchProperty();
  }, [id, getPropertyById]);

  const handlePayment = (rental: boolean) => {
    setIsRental(rental);
    setPaymentModalOpen(true);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h2 className="text-3xl font-display">Property not found</h2>
          <Link to="/properties" className="mt-6 inline-block text-blue-600 hover:underline">
            Return to all properties
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const price = property.price?.toString ? property.price.toString() : property.price;
  const numericPrice = parseInt(price?.replace(/[^0-9]/g, "") || "0");
  const monthlyRent = Math.round(numericPrice * 0.004);
  const propertyId = property.id || id || "1";
  const isOwner = user?.id === property.user_id;
  const showStatusBadges = isAdmin() || isOwner;
  
  const nearbyAmenities = [
    { type: "School", name: "Lincoln Elementary School", distance: "0.5 miles", icon: School },
    { type: "Shopping", name: "Market Square Mall", distance: "1.2 miles", icon: ShoppingBag },
    { type: "Dining", name: "Riverfront Restaurants", distance: "0.8 miles", icon: Utensils },
    { type: "Park", name: "Greenview Park", distance: "0.3 miles", icon: TreeDeciduous },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/properties" className="flex items-center text-estate-500 hover:text-estate-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all properties
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery 
              images={property.images || [property.image]} 
              title={property.title} 
            />
            
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="pt-4">
                <div className="space-y-6">
                  <PropertyDescription 
                    description={property.description}
                    features={property.features}
                  />
                  
                  <div>
                    <h3 className="font-medium text-lg mb-3">Key Facts</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-estate-500 mb-1">Property Type</p>
                        <p className="font-medium">{property.type || "Single Family Home"}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-estate-500 mb-1">Year Built</p>
                        <p className="font-medium">{property.yearBuilt || "2018"}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-estate-500 mb-1">Heating</p>
                        <p className="font-medium">{property.heating || "Central"}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-estate-500 mb-1">Cooling</p>
                        <p className="font-medium">{property.cooling || "Central"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-3">Virtual Tour</h3>
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <Button variant="outline">Request Virtual Tour Access</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="map" className="pt-4">
                <PropertyMap
                  location={property.location}
                  coordinates={property.coordinates}
                />
              </TabsContent>
              
              <TabsContent value="nearby" className="pt-4">
                <div className="space-y-6">
                  <h3 className="font-medium text-lg">Nearby Amenities</h3>
                  <div className="space-y-4">
                    {nearbyAmenities.map((item, index) => (
                      <div key={index} className="flex items-start p-4 border rounded-md">
                        <div className="bg-estate-100 p-2 rounded-full mr-4">
                          <item.icon className="w-5 h-5 text-estate-600" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{item.name}</h4>
                            <Badge variant="outline" className="ml-2 text-xs">{item.type}</Badge>
                          </div>
                          <p className="text-estate-500 text-sm">{item.distance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6 order-first lg:order-last">
            <PropertyHeader 
              title={property.title}
              location={property.location}
              price={price}
              monthlyRent={monthlyRent}
            />
            
            {/* Status badges for property owners and admins */}
            {showStatusBadges && (property.status || property.featured) && (
              <div className="flex flex-wrap gap-2">
                {property.featured && (
                  <PropertyStatusBadge 
                    status={property.status || 'approved'} 
                    featured={true}
                  />
                )}
                {!property.featured && property.status && property.status !== 'approved' && (
                  <PropertyStatusBadge status={property.status} />
                )}
              </div>
            )}
            
            <PropertyFeatures 
              bedrooms={property.bedrooms} 
              bathrooms={property.bathrooms} 
              sqft={property.area || property.sqft}
            />
            
            <PropertyActions 
              title={property.title}
              propertyId={propertyId}
              onPayment={handlePayment}
            />
          </div>
        </div>
      </div>
      
      <PaymentModal 
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        propertyTitle={property?.title || ""}
        price={price || ""}
        isRental={isRental}
      />
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
