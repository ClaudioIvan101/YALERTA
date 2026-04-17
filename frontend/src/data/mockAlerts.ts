import type { AlertItem } from '@/src/types';

export const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'a1',
    title: 'Fuera de Límite',
    subtitle: 'El ejemplar ha traspasado el perímetro virtual del Alambrado Norte.',
    description: 'Posible rotura de cerco o portón abierto.',
    severity: 'critical',
    timestamp: 'Hace 4 min',
    animalName: 'Blanca',
    animalTag: 'DEV-012',
    category: 'perimeter',
  },
  {
    id: 'a2',
    title: 'Batería Baja',
    subtitle: 'El dispositivo entrará en modo ahorro en breve. Recambio sugerido.',
    severity: 'warning',
    timestamp: 'Hace 2 horas',
    animalName: 'Pampero',
    animalTag: 'DEV-005',
    category: 'battery',
  },
  {
    id: 'a3',
    title: 'Gateway OK',
    subtitle: 'Sector 4 — Todos los sistemas operativos.',
    severity: 'success',
    timestamp: 'Hace 30 min',
    category: 'system',
  },
  {
    id: 'a4',
    title: 'Señal Intermitente',
    subtitle: 'El tag RFID-LW-0021 presenta conectividad inestable.',
    severity: 'warning',
    timestamp: 'Hace 1 hora',
    animalName: 'Ternero Sur #21',
    animalTag: 'RFID-LW-0021',
    category: 'signal',
  },
  {
    id: 'a5',
    title: 'Salio del Potrero A',
    subtitle: 'Detectado hace 45 minutos.',
    severity: 'critical',
    timestamp: 'Ayer 14:32',
    animalName: 'Toro Negro',
    animalTag: 'RFID-LW-9402',
    category: 'perimeter',
  },
];

export const ALERT_HISTORY = [
  { id: 'h1', title: 'Salio del Potrero A', subtitle: 'Detectado hace 45 minutos', type: 'error' as const },
  { id: 'h2', title: 'Actividad Baja Detectada', subtitle: 'Detectado ayer a las 22:15', type: 'warning' as const },
  { id: 'h3', title: 'Sincronizacion de Datos Completa', subtitle: 'Detectado hace 2 dias', type: 'info' as const },
];
