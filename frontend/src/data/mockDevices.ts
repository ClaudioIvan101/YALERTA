import type { Gateway } from '@/src/types';

export const MOCK_GATEWAYS: Gateway[] = [
  {
    id: 'gw-001',
    name: 'Gateway Norte',
    location: 'Sector 1 — Potrero Principal',
    status: 'online',
    signal: 95,
    lastPing: 'Hace 12 seg',
    connectedDevices: 8,
  },
  {
    id: 'gw-002',
    name: 'Gateway Sur',
    location: 'Sector 4 — Bebedero',
    status: 'online',
    signal: 82,
    lastPing: 'Hace 45 seg',
    connectedDevices: 6,
  },
  {
    id: 'gw-003',
    name: 'Gateway Este',
    location: 'Sector 2 — Alambrado',
    status: 'warning',
    signal: 54,
    lastPing: 'Hace 3 min',
    connectedDevices: 4,
  },
];

/** Weekly activity data for statistics chart */
export const WEEKLY_ACTIVITY = [
  { day: 'Lun', value: 85, alerts: 1 },
  { day: 'Mar', value: 72, alerts: 0 },
  { day: 'Mié', value: 90, alerts: 2 },
  { day: 'Jue', value: 65, alerts: 1 },
  { day: 'Vie', value: 78, alerts: 0 },
  { day: 'Sáb', value: 92, alerts: 0 },
  { day: 'Dom', value: 88, alerts: 1 },
];

/** Summary stats for the dashboard */
export const RODEO_STATS = {
  totalAnimals: 20,
  inPerimeter: 18,
  outPerimeter: 2,
  activeAlerts: 1,
  avgBattery: 74,
  healthScore: 85,
};
