// src/app/page.tsx
"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MetricCard } from "@/components/metric-card";
import { kpiData, userTableData, recentSalesData } from "@/lib/data"; // Import recentSalesData here
import { RevenueLineChart } from "@/components/charts/line-chart";
import { AcquisitionDonutChart } from "@/components/charts/donut-chart";
import { CampaignBarChart } from "@/components/charts/bar-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "@/components/user-table";
import { columns } from "@/components/columns";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import { RecentSales } from "@/components/recent-sales";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [dynamicKpiData, setDynamicKpiData] = React.useState(kpiData);
  // New state to track the selected city
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDynamicKpiData(prevData =>
        prevData.map(item => {
          if (item.title === 'Revenue') {
            const currentValue = parseFloat(item.value.replace(/[₹,]/g, ''));
            const newValue = currentValue + Math.random() * 5000 - 2500;
            return { ...item, value: `₹${newValue.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` };
          }
          if (item.title === 'Users') {
            const currentValue = parseInt(item.value.replace(/[+,]/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 10 - 4);
            return { ...item, value: `+${newValue.toLocaleString('en-IN')}` };
          }
          return item;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter sales based on the selected city
  const filteredSales = selectedCity
    ? recentSalesData.filter(sale => sale.city === selectedCity)
    : recentSalesData;

  // Handle click events from the bar chart
  const handleCitySelect = (city: string) => {
    // Allow deselecting by clicking the same city again
    setSelectedCity(prevCity => (prevCity === city ? null : city));
  };


  const handleExportCSV = () => {
    const csv = Papa.unparse(userTableData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("User Data", 20, 10);
    autoTable(doc, {
        head: [['ID', 'Name', 'Email', 'Role', 'Status']],
        body: userTableData.map(user => [user.id, user.name, user.email, user.role, user.status]),
    });
    doc.save('user_data.pdf');
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex items-center justify-between p-4 md:p-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            ADmyBRAND Insights
          </h1>

          <div className="hidden items-center space-x-2 md:flex">
            <DatePickerWithRange />
            <Button onClick={handleExportCSV} variant="outline">Export CSV</Button>
            <Button onClick={handleExportPDF} variant="outline">Export PDF</Button>
            <ThemeToggle />
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={handleExportCSV}>Export CSV</DropdownMenuItem>
                <DropdownMenuItem onSelect={handleExportPDF}>Export PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="block border-t p-4 md:hidden">
          <DatePickerWithRange />
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dynamicKpiData.map((kpi) => (
            <MetricCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              growth={kpi.growth}
              icon={kpi.icon as any}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full lg:col-span-4">
                <CardHeader><CardTitle>Monthly Revenue</CardTitle></CardHeader>
                <CardContent><RevenueLineChart /></CardContent>
            </Card>
             <Card className="col-span-full lg:col-span-3">
                <CardHeader><CardTitle>User Acquisition</CardTitle></CardHeader>
                <CardContent><AcquisitionDonutChart /></CardContent>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              {selectedCity ? `Showing sales for ${selectedCity}.` : "An overview of sales across top cities."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sales-by-city">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sales-by-city">Sales by City</TabsTrigger>
                <TabsTrigger value="sales">Recent Sales</TabsTrigger>
              </TabsList>
              <TabsContent value="sales-by-city" className="pt-4">
                {/* Pass the click handler to the chart */}
                <CampaignBarChart onCitySelect={handleCitySelect} />
              </TabsContent>
              <TabsContent value="sales" className="pt-4">
                {/* Show a "Clear Filter" button if a city is selected */}
                {selectedCity && (
                  <Button variant="outline" size="sm" className="mb-4" onClick={() => handleCitySelect(selectedCity)}>
                    <X className="mr-2 h-4 w-4" /> Clear Filter (Show All)
                  </Button>
                )}
                {/* Pass the filtered list to the component */}
                <RecentSales sales={filteredSales} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-4 grid-cols-1">
            <Card>
                <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
                <CardContent><UserTable columns={columns} data={userTableData} /></CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}