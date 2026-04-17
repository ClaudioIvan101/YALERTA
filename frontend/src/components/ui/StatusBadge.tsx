import React from 'react';
import { Text, View } from 'react-native';
import type { AlertSeverity } from '@/src/types';
import { Colors } from '@/src/constants';
import { GlowingDot } from './GlowingDot';

type StatusBadgeProps = {
  severity: AlertSeverity;
  label: string;
  showDot?: boolean;
  size?: 'sm' | 'md';
};

const severityColors: Record<AlertSeverity, string> = {
  critical: Colors.error,
  warning: Colors.tertiary,
  success: Colors.primary,
  info: Colors.textSecondary,
};

const severityBg: Record<AlertSeverity, string> = {
  critical: 'bg-ya-error/20',
  warning: 'bg-ya-tertiary/20',
  success: 'bg-ya-primary/15',
  info: 'bg-ya-surface-high',
};

export function StatusBadge({ severity, label, showDot = false, size = 'sm' }: StatusBadgeProps) {
  const color = severityColors[severity];
  const bgClass = severityBg[severity];
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';
  const padding = size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5';

  return (
    <View className={`flex-row items-center gap-1.5 rounded ${bgClass} ${padding}`}>
      {showDot && <GlowingDot color={color} size={5} active={severity === 'critical'} />}
      <Text
        style={{ color, fontFamily: 'Space Grotesk' }}
        className={`font-bold uppercase ${textSize}`}
      >
        {label}
      </Text>
    </View>
  );
}
