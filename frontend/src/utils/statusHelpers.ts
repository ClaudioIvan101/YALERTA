import { Colors } from '@/src/constants';
import type { AnimalStatus, AlertSeverity, DeviceStatus } from '@/src/types';
import {
  AlertTriangle,
  BatteryWarning,
  CheckCircle2,
  Fence,
  ShieldCheck,
  TrendingDown,
  BellOff,
  Wifi,
  WifiOff,
} from 'lucide-react-native';

/**
 * Visual style tokens for animal status indicators.
 */
export function getAnimalStatusStyle(status: AnimalStatus) {
  switch (status) {
    case 'Alert':
      return {
        borderClass: 'border-l-ya-error',
        badgeClass: 'bg-ya-error/15 border-ya-error/30',
        textClass: 'text-ya-error',
        color: Colors.error,
        icon: AlertTriangle,
        label: 'Alerta',
      };
    case 'Low Battery':
      return {
        borderClass: 'border-l-ya-tertiary',
        badgeClass: 'bg-ya-tertiary/15 border-ya-tertiary/30',
        textClass: 'text-ya-tertiary',
        color: Colors.tertiary,
        icon: BatteryWarning,
        label: 'Batería Baja',
      };
    default:
      return {
        borderClass: 'border-l-ya-primary',
        badgeClass: 'bg-ya-primary/15 border-ya-primary/30',
        textClass: 'text-ya-primary',
        color: Colors.primary,
        icon: ShieldCheck,
        label: 'En Perímetro',
      };
  }
}

/**
 * Visual style tokens for alert severity.
 */
export function getAlertSeverityStyle(severity: AlertSeverity) {
  switch (severity) {
    case 'critical':
      return {
        borderClass: 'border-l-ya-error',
        bgClass: 'bg-ya-error/20',
        textClass: 'text-ya-error',
        color: Colors.error,
        label: 'CRÍTICO',
        icon: Fence,
      };
    case 'warning':
      return {
        borderClass: 'border-l-ya-tertiary',
        bgClass: 'bg-ya-tertiary/20',
        textClass: 'text-ya-tertiary',
        color: Colors.tertiary,
        label: 'ADVERTENCIA',
        icon: TrendingDown,
      };
    case 'success':
      return {
        borderClass: 'border-l-ya-primary',
        bgClass: 'bg-ya-primary/10',
        textClass: 'text-ya-primary',
        color: Colors.primary,
        label: 'OK',
        icon: CheckCircle2,
      };
    default:
      return {
        borderClass: 'border-l-ya-surface-high',
        bgClass: 'bg-ya-surface-high',
        textClass: 'text-ya-text-muted',
        color: Colors.textSecondary,
        label: 'INFO',
        icon: BellOff,
      };
  }
}

/**
 * Visual style for device status.
 */
export function getDeviceStatusStyle(status: DeviceStatus) {
  switch (status) {
    case 'online':
      return { color: Colors.primary, label: 'Online', icon: Wifi };
    case 'warning':
      return { color: Colors.tertiary, label: 'Inestable', icon: Wifi };
    default:
      return { color: Colors.error, label: 'Offline', icon: WifiOff };
  }
}
