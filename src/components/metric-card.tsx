// src/components/metric-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// 1. Import IndianRupee and remove DollarSign
import { IndianRupee, Users, CreditCard, Activity } from "lucide-react"; 

// Map icon names to actual icon components
const iconMap = {
  // 2. Use the new IndianRupee icon here
  dollar: <IndianRupee className="h-4 w-4 text-muted-foreground" />, 
  user: <Users className="h-4 w-4 text-muted-foreground" />,
  conversion: <CreditCard className="h-4 w-4 text-muted-foreground" />,
  spend: <Activity className="h-4 w-4 text-muted-foreground" />,
};

type MetricCardProps = {
  title: string;
  value: string;
  growth: string;
  icon: keyof typeof iconMap;
};

export function MetricCard({ title, value, growth, icon }: MetricCardProps) {
  const isPositive = growth.startsWith('+');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {iconMap[icon]}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {growth} from last month
        </p>
      </CardContent>
    </Card>
  );
}