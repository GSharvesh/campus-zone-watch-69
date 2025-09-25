import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, AlertTriangle, Clock } from "lucide-react";
import { User } from "@/data/sampleData";

interface StatCardsProps {
  users: User[];
}

export const StatCards = ({ users }: StatCardsProps) => {
  const totalUsers = users.length;
  const safeZoneUsers = users.filter(u => u.zone === 'Safe').length;
  const restrictedZoneUsers = users.filter(u => u.zone === 'Restricted').length;
  const inactiveUsers = users.filter(u => {
    const timeDiff = Date.now() - u.lastSeen.getTime();
    return timeDiff > 3 * 60 * 1000; // 3 minutes
  }).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-foreground",
      bgColor: "bg-primary/10"
    },
    {
      title: "Safe Zone Users",
      value: safeZoneUsers,
      icon: Shield,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Restricted Zone Users", 
      value: restrictedZoneUsers,
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      title: "Inactive >3 Min",
      value: inactiveUsers,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.value === restrictedZoneUsers && restrictedZoneUsers > 0 
                  ? "⚠️ Alert active" 
                  : "Real-time monitoring"}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};