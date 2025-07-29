// src/components/recent-sales.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the type for a single sale object
type Sale = {
    name: string;
    email: string;
    amount: string;
    city: string;
};

// The component now accepts the sales data as a prop
export function RecentSales({ sales }: { sales: Sale[] }) {
  return (
    <div className="space-y-6">
      {sales.length > 0 ? (
        sales.map((sale, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{sale.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1 min-w-0">
              <p className="truncate text-sm font-medium leading-none">{sale.name}</p>
              {/* Display the city below the name */}
              <p className="truncate text-sm text-muted-foreground">{sale.city}</p>
            </div>
            <div className="ml-auto font-medium">{sale.amount}</div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">No sales data for this selection.</p>
      )}
    </div>
  );
}