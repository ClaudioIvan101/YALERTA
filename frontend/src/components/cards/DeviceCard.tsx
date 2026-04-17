import React from 'react';
import { Text, View } from 'react-native';
import type { Gateway } from '@/src/types';
import { getDeviceStatusStyle } from '@/src/utils';
import { GlowingDot } from '@/src/components/ui/GlowingDot';

type DeviceCardProps = {
  device: Gateway;
};

export function DeviceCard({ device }: DeviceCardProps) {
  const style = getDeviceStatusStyle(device.status);
  const StatusIcon = style.icon;

  return (
    <View className="rounded-xl bg-ya-surface-low border border-ya-surface-high p-4 mb-3">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 rounded-lg bg-ya-surface-high items-center justify-center">
            <StatusIcon size={18} color={style.color} />
          </View>
          <View>
            <Text className="text-white font-semibold">{device.name}</Text>
            <Text className="text-ya-text-muted text-xs">{device.location}</Text>
          </View>
        </View>
        <GlowingDot
          color={style.color}
          size={6}
          active={device.status === 'online'}
          label={style.label}
        />
      </View>

      <View className="flex-row items-center gap-4 mt-2 pt-2 border-t border-ya-surface-high">
        <View className="flex-row items-center gap-1">
          <Text className="text-ya-text-muted text-[10px] uppercase">Señal</Text>
          <Text style={{ color: style.color }} className="text-xs font-bold">
            {device.signal}%
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-ya-text-muted text-[10px] uppercase">Devices</Text>
          <Text className="text-white text-xs font-bold">{device.connectedDevices}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-ya-text-muted text-[10px] uppercase">Ping</Text>
          <Text className="text-ya-text-muted text-xs">{device.lastPing}</Text>
        </View>
      </View>
    </View>
  );
}
