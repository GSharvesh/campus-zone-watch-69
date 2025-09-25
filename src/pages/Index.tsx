import { useEffect, useState } from "react";
import { StatCards } from "@/components/StatCards";
import { ZoneMap } from "@/components/ZoneMap";  
import { UserTable } from "@/components/UserTable";
import { DashboardCharts } from "@/components/DashboardCharts";
import { generateUsers, travelZones, User } from "@/data/sampleData";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserHeader from "@/components/UserHeader";

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Initialize users data
    setUsers(generateUsers());
    
    // Set up auto-refresh every 30 seconds to simulate real-time updates
    const interval = setInterval(() => {
      setUsers(generateUsers());
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setUsers(generateUsers());
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">ZONE MONITORING DASHBOARD</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time travel group monitoring • Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <UserHeader />
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Statistics Cards */}
        <StatCards users={users} />
        
        {/* Map and Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Interactive Zone Map */}
          <div className="xl:col-span-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground">Travel Zone Map</h2>
              <p className="text-sm text-muted-foreground">
                Interactive map showing traveller locations, safe zones (green), and restricted areas (red)
              </p>
            </div>
            <ZoneMap users={users} zones={travelZones} />
          </div>
          
          {/* Charts */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Analytics</h2>
              <DashboardCharts users={users} />
            </div>
          </div>
        </div>

        {/* User Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">Traveller Activity Log</h2>
            <p className="text-sm text-muted-foreground">
              Detailed view of all monitored travellers with real-time status updates
            </p>
          </div>
          <UserTable users={users} />
        </div>
      </main>
    </div>
  );
};

export default Index;