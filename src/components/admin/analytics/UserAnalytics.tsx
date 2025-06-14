
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 1200, active: 980 },
  { month: 'Feb', users: 1350, active: 1100 },
  { month: 'Mar', users: 1520, active: 1250 },
  { month: 'Apr', users: 1680, active: 1380 },
  { month: 'May', users: 1890, active: 1520 },
  { month: 'Jun', users: 2100, active: 1680 },
];

const engagementData = [
  { day: 'Mon', sessions: 340, duration: 25 },
  { day: 'Tue', sessions: 425, duration: 28 },
  { day: 'Wed', sessions: 380, duration: 22 },
  { day: 'Thu', sessions: 465, duration: 30 },
  { day: 'Fri', sessions: 520, duration: 35 },
  { day: 'Sat', sessions: 290, duration: 18 },
  { day: 'Sun', sessions: 240, duration: 15 },
];

const chartConfig = {
  users: {
    label: "Total Users",
    color: "hsl(var(--chart-1))",
  },
  active: {
    label: "Active Users",
    color: "hsl(var(--chart-2))",
  },
  sessions: {
    label: "Sessions",
    color: "hsl(var(--chart-3))",
  },
};

export const UserAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Total and active user growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="users" stackId="1" stroke="var(--color-users)" fill="var(--color-users)" fillOpacity={0.3} />
              <Area type="monotone" dataKey="active" stackId="2" stroke="var(--color-active)" fill="var(--color-active)" fillOpacity={0.6} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Engagement</CardTitle>
          <CardDescription>User sessions and average duration by day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="sessions" stroke="var(--color-sessions)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
