export type AlertSeverity = 'critical' | 'warning' | 'info' | 'success';

export type AlertCategory = 'perimeter' | 'battery' | 'signal' | 'system';

export type AlertItem = {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  severity: AlertSeverity;
  timestamp: string;
  animalName?: string;
  animalTag?: string;
  category: AlertCategory;
};
