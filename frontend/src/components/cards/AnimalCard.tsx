import React, { memo, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Radio } from 'lucide-react-native';
import type { Animal } from '@/src/types';
import { Colors } from '@/src/constants';
import { getAnimalStatusStyle } from '@/src/utils';

type AnimalCardProps = {
  item: Animal;
  index?: number;
};

export const AnimalCard = memo(function AnimalCard({ item, index = 0 }: AnimalCardProps) {
  const statusStyle = getAnimalStatusStyle(item.status);
  const StatusIcon = statusStyle.icon;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.97,
      duration: 100,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        className={`mb-3 rounded-2xl border border-ya-surface-high border-l-4 bg-ya-surface-low px-4 py-3 ${statusStyle.borderClass}`}
        onPress={() => router.push({ pathname: '/animal-detail', params: { id: item.id } })}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-base font-semibold">{item.name}</Text>
              <View className={`rounded-full border px-2 py-1 ${statusStyle.badgeClass}`}>
                <Text
                  style={{ fontFamily: 'Space Grotesk' }}
                  className={`text-[10px] font-semibold uppercase ${statusStyle.textClass}`}
                >
                  {statusStyle.label}
                </Text>
              </View>
            </View>
            <Text className="mt-1 text-ya-text-muted text-xs">
              {item.type} · {item.breed}
            </Text>
          </View>
          <ChevronRight size={18} color={Colors.textSecondary} />
        </View>

        <View className="mt-3 rounded-xl border border-ya-surface-high bg-ya-surface px-3 py-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Radio size={14} color={Colors.textSecondary} />
              <Text className="text-ya-text-muted text-xs">{item.tagID}</Text>
            </View>
            <Text className="text-ya-text-muted text-xs">{item.lastSeen}</Text>
          </View>
          <View className="mt-2 flex-row items-center gap-2">
            <StatusIcon size={14} color={statusStyle.color} />
            <Text className={`text-xs ${statusStyle.textClass}`}>
              LoRaWAN {item.lorawanStatus}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});
