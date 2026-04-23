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
      <View className={`bg-[#1a2133]/90 rounded-[16px] border border-ya-outline-variant/30 p-4 mb-3 shadow-xl overflow-hidden`}>
        <View className="absolute top-0 bottom-0 left-0 w-1" style={{ backgroundColor: style.color }} />
        <View className="flex-row items-center justify-between pl-2">
          <View className="flex-row items-center gap-3 flex-1">
            <View className={`w-10 h-10 rounded-full items-center justify-center`} style={{ backgroundColor: `${style.color}15`, borderWidth: 1, borderColor: `${style.color}30` }}>
              <Icon size={18} color={style.color} />
            </View>
            <View className="flex-1">
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-[15px] font-bold tracking-tight">{item.title}</Text>
              {item.animalName && (
                <Text className="text-ya-text-muted text-xs font-medium mt-0.5">{item.animalName}</Text>
              )}
            </View>
          </View>
          <Text
            style={{ fontFamily: 'Space Grotesk' }}
            className="text-ya-text-muted text-[10px] font-semibold tracking-widest uppercase"
          >
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={`bg-[#1a2133]/95 rounded-[20px] border border-ya-outline-variant/30 p-5 mb-5 shadow-2xl overflow-hidden`}>
      <View className="absolute top-0 bottom-0 left-0 w-1.5" style={{ backgroundColor: style.color }} />
      <View className="pl-2">
        <View className="flex-row justify-between items-start mb-4">
          <StatusBadge severity={item.severity} label={style.label} showDot={item.severity === 'critical'} />
          <Text
            style={{ fontFamily: 'Space Grotesk' }}
            className="text-ya-text-muted text-[10px] font-bold tracking-widest uppercase"
          >
            {item.timestamp}
          </Text>
        </View>

        <Text
          style={{ fontFamily: 'Space Grotesk' }}
          className="text-white text-2xl font-bold tracking-tight mb-4"
        >
          {item.title}
        </Text>

        {item.animalName && (
          <View className="flex-row items-center gap-3 mb-4 bg-ya-surface/40 p-3 rounded-xl border border-ya-outline-variant/20">
            <View className={`w-10 h-10 rounded-lg items-center justify-center bg-ya-surface-high border border-ya-outline-variant/30`}>
              <Icon size={18} color={Colors.primary} />
            </View>
            <View>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="font-bold text-white text-[15px]">
                {item.animalName}
              </Text>
              {item.animalTag && (
                <Text className="text-[11px] font-semibold text-ya-text-muted uppercase tracking-widest mt-0.5">{item.animalTag}</Text>
              )}
            </View>
          </View>
        )}

        <Text className="text-[13px] text-ya-text-muted leading-relaxed mb-5 font-medium">
          {item.subtitle}
          {item.description && (
            <Text className="text-white/80 font-bold"> {item.description}</Text>
          )}
        </Text>

        {(onIgnore || onIntervene) && (
          <View className="flex-row justify-end gap-3 pt-5 border-t border-ya-outline-variant/20 mt-1">
            {onIgnore && (
              <Pressable className="px-5 py-3 rounded-xl bg-ya-surface/50 border border-ya-outline-variant/30" onPress={onIgnore}>
                <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-text-muted font-bold text-[11px] tracking-widest">
                  IGNORAR
                </Text>
              </Pressable>
            )}
            {onIntervene && (
              <Pressable className="px-5 py-3 rounded-xl" style={{ backgroundColor: style.color }} onPress={onIntervene}>
                <Text style={{ fontFamily: 'Space Grotesk' }} className="text-[#0a1120] font-extrabold text-[11px] tracking-widest">
                  INTERVENIR
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
