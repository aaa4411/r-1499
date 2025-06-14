
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Armchair, 
  BedDouble, 
  Sofa, 
  LampFloor, 
  BookOpen, 
  ShoppingCart,
  Search,
  Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

// Furniture categories and items
const furnitureCategories = [
  {
    id: "living",
    name: "Living Room",
    icon: Sofa,
    items: [
      { id: "sofa1", name: "Modern Sectional Sofa", price: "$1,299", image: "placeholder.svg" },
      { id: "chair1", name: "Accent Armchair", price: "$499", image: "placeholder.svg" },
      { id: "coffee1", name: "Glass Coffee Table", price: "$349", image: "placeholder.svg" },
      { id: "lamp1", name: "Floor Lamp", price: "$129", image: "placeholder.svg" },
    ]
  },
  {
    id: "bedroom",
    name: "Bedroom",
    icon: BedDouble,
    items: [
      { id: "bed1", name: "Queen Platform Bed", price: "$899", image: "placeholder.svg" },
      { id: "dresser1", name: "6-Drawer Dresser", price: "$649", image: "placeholder.svg" },
      { id: "nightstand1", name: "Nightstand Set", price: "$299", image: "placeholder.svg" },
      { id: "mirror1", name: "Full-Length Mirror", price: "$199", image: "placeholder.svg" },
    ]
  },
  {
    id: "dining",
    name: "Dining Room",
    icon: BookOpen,
    items: [
      { id: "table1", name: "Expandable Dining Table", price: "$799", image: "placeholder.svg" },
      { id: "chairs1", name: "Set of 4 Dining Chairs", price: "$599", image: "placeholder.svg" },
      { id: "buffet1", name: "Sideboard Buffet", price: "$649", image: "placeholder.svg" },
      { id: "bar1", name: "Bar Cart", price: "$249", image: "placeholder.svg" },
    ]
  },
  {
    id: "office",
    name: "Home Office",
    icon: LampFloor,
    items: [
      { id: "desk1", name: "Writing Desk", price: "$399", image: "placeholder.svg" },
      { id: "chair2", name: "Ergonomic Office Chair", price: "$349", image: "placeholder.svg" },
      { id: "bookcase1", name: "5-Shelf Bookcase", price: "$259", image: "placeholder.svg" },
      { id: "lamp2", name: "Desk Lamp", price: "$79", image: "placeholder.svg" },
    ]
  }
];

const Furniture = () => {
  const [selectedCategory, setSelectedCategory] = useState("living");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "consultation",
      date: "",
      message: "",
    },
  });

  const handleAddToCart = (itemId: string) => {
    setCartItems([...cartItems, itemId]);
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  const handleRequestService = (values: any) => {
    console.log("Service request submitted:", values);
    toast({
      title: "Service Request Submitted",
      description: "Our team will contact you shortly to arrange your furniture service.",
    });
    form.reset();
  };

  // Filter items based on search query
  const filteredItems = furnitureCategories
    .find(cat => cat.id === selectedCategory)?.items
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-display text-estate-800 mb-4">
            Home Furniture Collection
          </h1>
          <p className="text-estate-500 text-lg">
            Browse our curated selection of premium furniture to transform your home
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Search furniture..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="relative">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Cart
                      {cartItems.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-estate-600">{cartItems.length}</Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Your Cart</SheetTitle>
                      <SheetDescription>
                        {cartItems.length > 0 ? 
                          `You have ${cartItems.length} items in your cart` : 
                          "Your cart is empty"}
                      </SheetDescription>
                    </SheetHeader>
                    {cartItems.length > 0 && (
                      <div className="mt-6">
                        <ul className="space-y-4">
                          {cartItems.map((itemId, index) => {
                            // Find the item across all categories
                            const item = furnitureCategories.flatMap(cat => cat.items).find(i => i.id === itemId);
                            return (
                              <li key={index} className="flex justify-between items-center border-b pb-2">
                                <span>{item?.name}</span>
                                <span className="font-medium">{item?.price}</span>
                              </li>
                            );
                          })}
                        </ul>
                        <Button className="mt-6 w-full bg-estate-800 hover:bg-estate-700">
                          Checkout
                        </Button>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="bg-estate-800 hover:bg-estate-700">
                      <Calendar className="mr-2 h-4 w-4" />
                      Request Service
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Request Furniture Service</SheetTitle>
                      <SheetDescription>
                        Fill in the details below and our team will contact you shortly.
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="mt-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRequestService)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} required />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Your email" {...field} required />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="Your phone number" {...field} required />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select service type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="consultation">Furniture Consultation</SelectItem>
                                    <SelectItem value="delivery">Furniture Delivery</SelectItem>
                                    <SelectItem value="assembly">Furniture Assembly</SelectItem>
                                    <SelectItem value="repair">Repair & Maintenance</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <textarea 
                                    className="w-full min-h-[120px] border border-gray-300 rounded-md p-2"
                                    placeholder="Describe your furniture needs..."
                                    {...field}
                                  ></textarea>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full bg-estate-800 hover:bg-estate-700">
                            Submit Request
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
                {furnitureCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                    <category.icon className="mr-2 h-4 w-4" />
                    <span>{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {furnitureCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-4">
                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-square bg-gray-100 relative">
                            <img 
                              src={`/${item.image}`} 
                              alt={item.name} 
                              className="object-cover w-full h-full" 
                            />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-medium text-estate-800">{item.price}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button 
                              variant="outline" 
                              className="w-1/2 mr-2"
                            >
                              Details
                            </Button>
                            <Button 
                              className="w-1/2 bg-estate-800 hover:bg-estate-700"
                              onClick={() => handleAddToCart(item.id)}
                            >
                              Add to Cart
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-estate-500">No furniture items match your search.</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Our Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-md hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium mb-1">Furniture Consultation</h3>
                  <p className="text-sm text-gray-600">Get expert advice on selecting the right furniture for your home</p>
                </div>
                <div className="p-3 border rounded-md hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium mb-1">Furniture Delivery</h3>
                  <p className="text-sm text-gray-600">Professional delivery service direct to your home</p>
                </div>
                <div className="p-3 border rounded-md hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium mb-1">Furniture Assembly</h3>
                  <p className="text-sm text-gray-600">Expert assembly service for all your furniture needs</p>
                </div>
                <div className="p-3 border rounded-md hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium mb-1">Repair & Maintenance</h3>
                  <p className="text-sm text-gray-600">Keep your furniture looking new with our repair services</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-estate-800 hover:bg-estate-700"
                  onClick={() => {
                    const triggerEl = document.querySelector('[data-sheet-trigger="true"]');
                    if (triggerEl && "click" in triggerEl && typeof (triggerEl as HTMLElement).click === "function") {
                      (triggerEl as HTMLElement).click();
                    }
                  }}
                >
                  Schedule Service
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Furniture;
