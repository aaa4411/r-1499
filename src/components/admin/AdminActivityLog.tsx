
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export const AdminActivityLog: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Admin Activity Log
        </CardTitle>
        <CardDescription>
          View recent admin actions and system activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          Activity log will show recent admin actions here.
          This feature can be extended with specific activity tracking.
        </div>
      </CardContent>
    </Card>
  );
};
