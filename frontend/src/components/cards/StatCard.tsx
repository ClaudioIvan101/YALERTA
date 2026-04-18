import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Colors } from '@/src/constants';

type StatCardProps = {
  icon: LucideIcon | React.ComponentType<{ size: number; color: string }>;
  label: string;
  value: number | string;
  suffix?: string;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
  animate?: boolean;
};

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  color = Colors.primary,
  trend,
  animate = true,
}: StatCardProps) {
  const scaleAnim = useRef(new Animated.Value(animate ? 0.9 : 1)).current;
  const opacityAnim = useRef(new Animated.Value(animate ? 0 : 1)).current;

  useEffect(() => {
    if (!animate) return;
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [animate, scaleAnim, opacityAnim]);

  return (
    <Animated.View
      style={{ opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}
      className="flex-1 rounded-xl bg-ya-surface-high p-4 border border-ya-surface-high"
    >
      <View className="flex-row items-center justify-between mb-3">
        <Text
          style={{ fontFamily: 'Space Grotesk' }}
          className="text-ya-text-muted text-[10px] uppercase tracking-widest flex-1"
        >
          {label}
        </Text>
        <View
          style={{ backgroundColor: `${color}15` }}
          className="h-7 w-7 rounded-lg items-center justify-center"
        >
          <Icon size={14} color={color} />
        </View>
      </View>
      <View className="flex-row items-end gap-1">
        <Text
          style={{ color, fontFamily: 'Space Grotesk' }}
          className="text-3xl font-bold"
        >
          {value}
        </Text>
        {suffix && (
          <Text className="text-ya-text-muted text-sm mb-1">{suffix}</Text>
        )}
      </View>
      {trend && (
        <Text className={`text-[10px] mt-2 ${
          trend === 'up' ? 'text-ya-primary' : trend === 'down' ? 'text-ya-error' : 'text-ya-text-muted'
        }`}>
          {trend === 'up' ? '↑ Subiendo' : trend === 'down' ? '↓ Bajando' : '→ Estable'}
        </Text>
      )}
    </Animated.View>
  );
}
