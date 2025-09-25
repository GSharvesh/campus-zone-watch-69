import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { User } from "@/data/sampleData";

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getZoneBadgeVariant = (zone: string) => {
    switch (zone) {
      case 'Safe':
        return 'default';
      case 'Restricted':
        return 'destructive';
      case 'Inactive':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Alert':
        return 'destructive';
      case 'Inactive':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const formatLocation = (location: { lat: number; lng: number }) => {
    return `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">User Monitoring</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users, IDs, or zones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">User ID</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Zone</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Seen</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Alert</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-mono">{user.id}</td>
                  <td className="py-3 px-4 text-sm">{user.name}</td>
                  <td className="py-3 px-4">
                    <Badge variant={getZoneBadgeVariant(user.zone)}>
                      {user.zone}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-muted-foreground">
                    {formatLocation(user.location)}
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {formatTime(user.lastSeen)}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {user.alert ? (
                      <span className="text-destructive text-xs">⚠️ {user.alert}</span>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found matching your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};