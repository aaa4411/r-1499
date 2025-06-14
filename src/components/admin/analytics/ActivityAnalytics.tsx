
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, MessageCircle, Heart } from 'lucide-react';

const activityData = [
  { hour: '00:00', logins: 12, views: 45, messages: 8, favorites: 15 },
  { hour: '04:00', logins: 8, views: 23, messages: 3, favorites: 7 },
  { hour: '08:00', logins: 145, views: 320, messages: 78, favorites: 95 },
  { hour: '12:00', logins: 189, views: 450, messages: 120, favorites: 140 },
  { hour: '16:00', logins: 167, views: 380, messages: 95, favorites: 110 },
  { hour: '20:00', logins: 134, views: 290, messages: 67, favorites: 85 },
];

const recentActivities = [
  { id: 1, action: 'Property approved', user: 'John Doe', time: '2 minutes ago', type: 'approval' },
  { id: 2, action: 'New user registered', user: 'Jane Smith', time: '5 minutes ago', type: 'registration' },
  { id: 3, action: 'Property rejected', user: 'Mike Johnson', time: '8 minutes ago', type: 'rejection' },
  { id: 4, action: 'User role updated', user: 'Sarah Wilson', time: '12 minutes ago', type: 'role_change' },
  { id: 5, action: 'Property featured', user: 'David Brown', time: '15 minutes ago', type: 'feature' },
];

const chartConfig = {
  logins: {
    label: "Logins",
    color: "hsl(var(--chart-1))",
  },
  views: {
    label: "Page Views",
    color: "hsl(var(--chart-2))",
  },
  messages: {
    label: "Messages",
    color: "hsl(var(--chart-3))",
  },
  favorites: {
    label: "Favorites",
    color: "hsl(var(--chart-4))",
  },
};

const getActivityBadgeVariant = (type: string) => {
  switch (type) {
    case 'approval': return 'default';
    case 'registration': return 'secondary';
    case 'rejection': return 'destructive';
    case 'role_change': return 'outline';
    case 'feature': return 'secondary';
    default: return 'default';
  }
};

export const ActivityAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logins</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">655</div>
            <p className="text-xs text-muted-foreground">Today's logins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,508</div>
            <p className="text-xs text-muted-foreground">Today's page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">371</div>
            <p className="text-xs text-muted-foreground">Messages sent today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">452</div>
            <p className="text-xs text-muted-foreground">Properties favorited today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hourly Activity</CardTitle>
          <CardDescription>User activity patterns throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="logins" fill="var(--color-logins)" />
              <Bar dataKey="views" fill="var(--color-views)" />
              <Bar dataKey="messages" fill="var(--color-messages)" />
              <Bar dataKey="favorites" fill="var(--color-favorites)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest admin actions and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={getActivityBadgeVariant(activity.type)}>
                    {activity.action}
                  </Badge>
                  <span className="text-sm font-medium">{activity.user}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
