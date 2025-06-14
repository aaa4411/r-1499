
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PropertyGrid from "@/components/PropertyGrid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertiesTabProps {
  properties: any[];
  loading: boolean;
}

const PropertiesTab = ({ properties, loading }: PropertiesTabProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Listed Properties</CardTitle>
        <CardDescription>
          View and manage all your listed properties
        </CardDescription>
      </CardHeader>
      <CardContent>
        {properties.length > 0 ? (
          <PropertyGrid 
            properties={properties} 
            loading={loading}
            fromSupabase={true}
            showAdminBadges={true}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-estate-800 mb-2">No properties listed yet</h3>
            <p className="text-estate-500 mb-6">Get started by adding your first property listing</p>
            <Button 
              onClick={() => navigate("/add-property")}
              className="bg-estate-800 hover:bg-estate-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Property
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertiesTab;
