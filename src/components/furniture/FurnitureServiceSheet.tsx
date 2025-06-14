
import React from "react";
import { Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface FurnitureServiceSheetProps {}

const FurnitureServiceSheet: React.FC<FurnitureServiceSheetProps> = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "consultation",
      date: "",
      message: "",
    }
  });

  const handleRequestService = (values: any) => {
    toast({
      title: "Service Request Submitted",
      description: "Our team will contact you shortly to arrange your furniture service.",
    });
    form.reset();
  };

  return (
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
  );
};

export default FurnitureServiceSheet;
