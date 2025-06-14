
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const propertyData = [
  { month: 'Jan', properties: 45, approved: 38, pending: 7 },
  { month: 'Feb', properties: 52, approved: 45, pending: 7 },
  { month: 'Mar', properties: 61, approved: 54, pending: 7 },
  { month: 'Apr', properties: 58, approved: 51, pending: 7 },
  { month: 'May', properties: 67, approved: 59, pending: 8 },
  { month: 'Jun', properties: 73, approved: 65, pending: 8 },
];

const statusData = [
  { name: 'Approved', value: 312, color: '#22c55e' },
  { name: 'Pending', value: 43, color: '#f59e0b' },
  { name: 'Rejected', value: 15, color: '#ef4444' },
];

const chartConfig = {
  properties: {
    label: "Properties",
    color: "hsl(var(--chart-1))",
  },
  approved: {
    label: "Approved",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
};

export const PropertyAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Submissions</CardTitle>
          <CardDescription>Monthly property submissions and approval rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={propertyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="approved" stackId="a" fill="var(--color-approved)" />
              <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Status Distribution</CardTitle>
          <CardDescription>Current status of all properties in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
