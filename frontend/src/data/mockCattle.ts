export type CattleStatus = 'ok' | 'warning';

export type Cattle = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: CattleStatus;
  battery: number;
  lastUpdate: string;
};

export const MOCK_CATTLE: Cattle[] = [
  {
    id: 'cow-001',
    name: 'Vaca 001',
    latitude: -27.4569,
    longitude: -58.9892,
    status: 'ok',
    battery: 92,
    lastUpdate: '10:18',
  },
  {
    id: 'cow-014',
    name: 'Vaca 014',
    latitude: -27.4638,
    longitude: -58.9806,
    status: 'ok',
    battery: 86,
    lastUpdate: '10:21',
  },
  {
    id: 'cow-042',
    name: 'Vaca 042',
    latitude: -27.4682,
    longitude: -58.9759,
    status: 'warning',
    battery: 41,
    lastUpdate: '10:23',
  },
  {
    id: 'cow-077',
    name: 'Vaca 077',
    latitude: -27.4528,
    longitude: -58.9948,
    status: 'warning',
    battery: 33,
    lastUpdate: '10:27',
  },
];
