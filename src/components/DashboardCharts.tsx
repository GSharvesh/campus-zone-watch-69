import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User } from "@/data/sampleData";

interface DashboardChartsProps {
  users: User[];
}

export const DashboardCharts = ({ users }: DashboardChartsProps) => {
  // Pie chart data - Zone Distribution
  const zoneData = [
    {
      name: 'Safe Zone',
      value: users.filter(u => u.zone === 'Safe').length,
      color: '#22c55e'
    },
    {
      name: 'Restricted Zone',
      value: users.filter(u => u.zone === 'Restricted').length,
      color: '#ef4444'
    },
    {
      name: 'Inactive',
      value: users.filter(u => {
        const timeDiff = Date.now() - u.lastSeen.getTime();
        return timeDiff > 3 * 60 * 1000; // 3 minutes
      }).length,
      color: '#eab308'
    }
  ].filter(item => item.value > 0);

  // Bar chart data - Status Distribution  
  const statusData = [
    {
      name: 'Active',
      count: users.filter(u => u.status === 'Active').length,
      fill: '#22c55e'
    },
    {
      name: 'Alert', 
      count: users.filter(u => u.status === 'Alert').length,
      fill: '#ef4444'
    },
    {
      name: 'Inactive',
      count: users.filter(u => u.status === 'Inactive').length,
      fill: '#eab308'
    }
  ].filter(item => item.count > 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Count: <span className="font-semibold text-foreground">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Zone Distribution - Pie Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Zone Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={zoneData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {zoneData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                  color: 'hsl(var(--foreground))'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Distribution - Bar Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">User Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};