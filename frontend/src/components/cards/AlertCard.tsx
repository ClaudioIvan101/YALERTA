import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { AlertItem } from '@/src/types';
import { Colors } from '@/src/constants';
import { getAlertSeverityStyle } from '@/src/utils';
import { StatusBadge } from '@/src/components/ui/StatusBadge';

type AlertCardProps = {
  item: AlertItem;
  onIgnore?: () => void;
  onIntervene?: () => void;
  compact?: boolean;
};

export function AlertCard({ item, onIgnore, onIntervene, compact = false }: AlertCardProps) {
  const style = getAlertSeverityStyle(item.severity);
  const Icon = style.icon;

  if (compact) {
    return (
      <View className={`bg-ya-surface-low rounded-xl border-l-4 ${style.borderClass} p-4 mb-3`}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <View className={`w-10 h-10 rounded-full items-center justify-center ${style.bgClass}`}>
              <Icon size={18} color={style.color} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-sm font-bold">{item.title}</Text>
              {item.animalName && (
                <Text className="text-ya-text-muted text-xs">{item.animalName}</Text>
              )}
            </View>
          </View>
          <Text
            style={{ fontFamily: 'Space Grotesk' }}
            className="text-ya-text-muted text-[10px] uppercase"
          >
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={`bg-ya-surface-low rounded-xl border-l-4 ${style.borderClass} p-5 mb-4`}>
      <View className="flex-row justify-between items-start mb-3">
        <StatusBadge severity={item.severity} label={style.label} showDot={item.severity === 'critical'} />
        <Text
          style={{ fontFamily: 'Space Grotesk' }}
          className="text-ya-text-muted text-[10px] uppercase"
        >
          {item.timestamp}
        </Text>
      </View>

      <Text
        style={{ fontFamily: 'Space Grotesk' }}
        className="text-white text-xl font-bold mb-3"
      >
        {item.title}
      </Text>

      {item.animalName && (
        <View className="flex-row items-center gap-3 mb-3">
          <View className={`w-10 h-10 rounded-lg items-center justify-center bg-ya-surface-high border border-ya-surface-high`}>
            <Icon size={18} color={Colors.primary} />
          </View>
          <View>
            <Text style={{ fontFamily: 'Space Grotesk' }} className="font-bold text-ya-primary">
              {item.animalName}
            </Text>
            {item.animalTag && (
              <Text className="text-xs text-ya-text-muted">{item.animalTag}</Text>
            )}
          </View>
        </View>
      )}

      <Text className="text-sm text-ya-text-muted leading-relaxed mb-4">
        {item.subtitle}
        {item.description && (
          <Text className="text-white font-semibold"> {item.description}</Text>
        )}
      </Text>

      {(onIgnore || onIntervene) && (
        <View className="flex-row justify-end gap-3 pt-4 border-t border-ya-surface-high">
          {onIgnore && (
            <Pressable className="px-4 py-2.5 rounded-lg bg-ya-surface-high" onPress={onIgnore}>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white font-bold text-[10px]">
                IGNORAR
              </Text>
            </Pressable>
          )}
          {onIntervene && (
            <Pressable className="px-4 py-2.5 rounded-lg bg-ya-primary" onPress={onIntervene}>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-[#090e1c] font-bold text-[10px]">
                INTERVENIR
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
