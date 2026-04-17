export type AnimalStatus = 'In Perimeter' | 'Alert' | 'Low Battery';

export type LoRaWANStatus = 'Online' | 'Intermittent' | 'Offline';

export type AnimalBreed = 'Brangus' | 'Braford' | 'Aberdeen Angus';

export type Animal = {
  id: string;
  name: string;
  tagID: string;
  type: string;
  breed: AnimalBreed;
  status: AnimalStatus;
  lastSeen: string;
  lorawanStatus: LoRaWANStatus;
};

export type CattleMapItem = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'ok' | 'warning';
  battery: number;
  lastUpdate: string;
};
