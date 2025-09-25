import { User, Zone } from '@/data/sampleData';

interface ZoneMapProps {
  users: User[];
  zones: Zone[];
}

export const ZoneMap = ({ users, zones }: ZoneMapProps) => {
  // Calculate relative positions for visualization
  const getRelativePosition = (lat: number, lng: number) => {
    const baselat = 40.7128;
    const baseLng = -74.0060;
    const scale = 50000; // Scale factor for visualization
    
    const x = ((lng - baseLng) * scale + 300) % 600;
    const y = ((baselat - lat) * scale + 250) % 500;
    
    return {
      x: Math.max(20, Math.min(580, x)),
      y: Math.max(20, Math.min(480, y))
    };
  };

  const safeZoneUsers = users.filter(u => u.zone === 'Safe');
  const restrictedZoneUsers = users.filter(u => u.zone === 'Restricted');

  return (
    <div className="h-[500px] rounded-lg overflow-hidden border border-border bg-card relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40">
        {/* Grid overlay for map-like appearance */}
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Zone Areas */}
      {/* Safe Zone Area */}
      <div 
        className="absolute bg-success/20 border-2 border-success/40 rounded-lg"
        style={{
          left: '10%',
          top: '15%', 
          width: '45%',
          height: '60%'
        }}
      >
        <div className="absolute top-2 left-2 text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded">
          ✅ Safe Zone - Academic Buildings
        </div>
      </div>

      {/* Restricted Zone Area */}
      <div 
        className="absolute bg-destructive/30 border-2 border-destructive/60 rounded-lg"
        style={{
          right: '10%',
          top: '25%',
          width: '35%', 
          height: '45%'
        }}
      >
        <div className="absolute top-2 left-2 text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded">
          🚫 Restricted - Construction Zone
        </div>
      </div>

      {/* User Markers - Safe Zone Users */}
      {safeZoneUsers.slice(0, 20).map((user, index) => {
        const position = {
          x: 12 + (index % 8) * 30 + Math.random() * 15,
          y: 18 + Math.floor(index / 8) * 25 + Math.random() * 15
        };
        
        return (
          <div
            key={user.id}
            className="absolute w-3 h-3 bg-success rounded-full border border-white shadow-sm cursor-pointer group"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            title={`${user.name} - ${user.zone} Zone`}
          >
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-card border border-border rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <strong>{user.name}</strong><br/>
              Zone: {user.zone}<br/>
              Status: {user.status}
            </div>
          </div>
        );
      })}

      {/* User Markers - Restricted Zone Users */}
      {restrictedZoneUsers.map((user, index) => {
        const position = {
          x: 68 + (index % 4) * 15 + Math.random() * 8,
          y: 30 + Math.floor(index / 4) * 20 + Math.random() * 10
        };
        
        return (
          <div
            key={user.id}
            className="absolute w-4 h-4 bg-destructive rounded-full border-2 border-white shadow-lg cursor-pointer group animate-pulse"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            title={`${user.name} - ALERT: ${user.alert}`}
          >
            {/* Alert indicator */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full animate-ping"></div>
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-card border border-border rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <strong className="text-destructive">{user.name}</strong><br/>
              Zone: <span className="text-destructive">Restricted</span><br/>
              Status: <span className="text-destructive">{user.status}</span><br/>
              <span className="text-warning">⚠️ {user.alert}</span>
            </div>
          </div>
        );
      })}

      {/* Heat Map Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Safe zone heat effect */}
        <div 
          className="absolute bg-gradient-to-r from-success/20 via-success/10 to-transparent rounded-full blur-sm"
          style={{
            left: '15%',
            top: '25%',
            width: '35%',
            height: '40%'
          }}
        ></div>
        
        {/* Restricted zone heat effect */}  
        <div 
          className="absolute bg-gradient-to-r from-destructive/30 via-destructive/15 to-transparent rounded-full blur-sm animate-pulse"
          style={{
            right: '15%',
            top: '35%',
            width: '25%',
            height: '25%'
          }}
        ></div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border border-border rounded-lg p-3 text-xs">
        <div className="font-semibold mb-2">Campus Map Legend</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span>Safe Zone Users ({safeZoneUsers.length})</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-destructive rounded-full"></div>
          <span>Restricted Zone Users ({restrictedZoneUsers.length})</span>
        </div>
        <div className="text-muted-foreground mt-2">
          Real-time tracking • Auto-refresh: 30s
        </div>
      </div>
    </div>
  );
};