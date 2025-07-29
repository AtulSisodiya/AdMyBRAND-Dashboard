// src/components/charts/bar-chart.tsx
"use client";

import { salesByCityData } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="text-sm">
          <CardContent className="p-2">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-bold">
              {`₹${Number(payload[0].value).toLocaleString('en-IN')}`}
            </p>
          </CardContent>
        </Card>
      );
    }
  
    return null;
};

export function CampaignBarChart({ onCitySelect }: { onCitySelect: (city: string) => void }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={salesByCityData}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${Number(value) / 100000}L`}
        />
        <YAxis
          type="category"
          dataKey="city"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          content={<CustomTooltip />}
        />
        <Bar
          dataKey="sales"
          fill="#82ca9d"
          radius={[0, 4, 4, 0]}
          cursor="pointer"
          // THE FIX IS HERE: Access the city via data.payload
          onClick={(data) => onCitySelect(data.payload.city)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
