
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FurnitureServiceCardProps {
  onScheduleService: () => void;
}

const FurnitureServiceCard: React.FC<FurnitureServiceCardProps> = ({ onScheduleService }) => (
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
        onClick={onScheduleService}
      >
        Schedule Service
      </Button>
    </CardFooter>
  </Card>
);

export default FurnitureServiceCard;
