// Sample dataset for Zone Monitoring Dashboard - Group Trip Monitoring
export interface User {
  id: string;
  name: string;
  zone: 'Safe' | 'Restricted' | 'Inactive';
  status: 'Active' | 'Alert' | 'Inactive';
  location: { lat: number; lng: number };
  lastSeen: Date;
  alert?: string;
  tripGroup?: string;
}

export interface Zone {
  id: string;
  name: string;
  type: 'safe' | 'restricted';
  coordinates: { lat: number; lng: number }[];
  color: string;
}

// Travel destination coordinates (using a sample tourist location)
const DESTINATION_CENTER = { lat: 40.7128, lng: -74.0060 };

// Generate 100 travellers on the same group trip
export const generateUsers = (): User[] => {
  const users: User[] = [];
  const tripName = "Europe Explorer Tour 2024";
  
  // Safe zone travellers (85)
  for (let i = 1; i <= 85; i++) {
    users.push({
      id: `TRV${String(i).padStart(3, '0')}`,
      name: `Traveller ${i}`,
      zone: 'Safe',
      status: 'Active',
      tripGroup: tripName,
      location: {
        lat: DESTINATION_CENTER.lat + (Math.random() - 0.5) * 0.01,
        lng: DESTINATION_CENTER.lng + (Math.random() - 0.5) * 0.01
      },
      lastSeen: new Date(Date.now() - Math.random() * 300000) // Within 5 minutes
    });
  }
  
  // Restricted zone travellers (15)
  for (let i = 86; i <= 100; i++) {
    users.push({
      id: `TRV${String(i).padStart(3, '0')}`,
      name: `Traveller ${i}`,
      zone: 'Restricted',
      status: 'Alert',
      tripGroup: tripName,
      location: {
        lat: DESTINATION_CENTER.lat + 0.005 + (Math.random() - 0.5) * 0.003,
        lng: DESTINATION_CENTER.lng + 0.005 + (Math.random() - 0.5) * 0.003
      },
      lastSeen: new Date(Date.now() - Math.random() * 60000), // Within 1 minute
      alert: 'Entered restricted zone'
    });
  }
  
  return users;
};

// Travel zones
export const travelZones: Zone[] = [
  {
    id: 'safe-1',
    name: 'Tourist Area',
    type: 'safe',
    coordinates: [
      { lat: DESTINATION_CENTER.lat - 0.002, lng: DESTINATION_CENTER.lng - 0.003 },
      { lat: DESTINATION_CENTER.lat + 0.002, lng: DESTINATION_CENTER.lng - 0.003 },
      { lat: DESTINATION_CENTER.lat + 0.002, lng: DESTINATION_CENTER.lng + 0.002 },
      { lat: DESTINATION_CENTER.lat - 0.002, lng: DESTINATION_CENTER.lng + 0.002 }
    ],
    color: '#22c55e'
  },
  {
    id: 'restricted-1',
    name: 'Off-Limits Area',
    type: 'restricted',
    coordinates: [
      { lat: DESTINATION_CENTER.lat + 0.003, lng: DESTINATION_CENTER.lng + 0.003 },
      { lat: DESTINATION_CENTER.lat + 0.007, lng: DESTINATION_CENTER.lng + 0.003 },
      { lat: DESTINATION_CENTER.lat + 0.007, lng: DESTINATION_CENTER.lng + 0.007 },
      { lat: DESTINATION_CENTER.lat + 0.003, lng: DESTINATION_CENTER.lng + 0.007 }
    ],
    color: '#ef4444'
  }
];

export const DESTINATION_CENTER_COORDS = DESTINATION_CENTER;