import React from 'react';
import { Switch, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Colors } from '@/src/constants';

type SettingRowProps = {
  icon: LucideIcon;
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SettingRow({ icon: Icon, label, description, value, onValueChange }: SettingRowProps) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-ya-surface-high">
      <View className="flex-row items-center gap-3 flex-1">
        <View className="h-9 w-9 rounded-lg bg-ya-surface-high items-center justify-center">
          <Icon size={16} color={Colors.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-white text-sm font-medium">{label}</Text>
          {description && (
            <Text className="text-ya-text-muted text-xs mt-0.5">{description}</Text>
          )}
        </View>
      </View>
      <Switch
        trackColor={{ false: Colors.surfaceHigh, true: Colors.primaryMuted }}
        thumbColor={Colors.surface}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}
