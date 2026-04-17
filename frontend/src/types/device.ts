export type DeviceStatus = 'online' | 'offline' | 'warning';

export type Gateway = {
  id: string;
  name: string;
  location: string;
  status: DeviceStatus;
  signal: number;
  lastPing: string;
  connectedDevices: number;
};
