import React, { memo, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Radio } from 'lucide-react-native';
import type { Animal } from '@/src/types';
import { Colors } from '@/src/constants';
import { getAnimalStatusStyle } from '@/src/utils';
import { useAnimatedEntry } from '@/src/hooks/useAnimatedEntry';

type AnimalCardProps = {
  item: Animal;
  index?: number;
};

export const AnimalCard = memo(function AnimalCard({ item, index = 0 }: AnimalCardProps) {
  const statusStyle = getAnimalStatusStyle(item.status);
  const StatusIcon = statusStyle.icon;
  const scale = useRef(new Animated.Value(1)).current;
  const entryStyle = useAnimatedEntry(index, 60);

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
    <Animated.View style={[entryStyle, { transform: [...entryStyle.transform, { scale }] }]}>
      <Pressable
        className={`mb-4 rounded-xl border border-ya-outline-variant/20 border-l-4 bg-ya-surface-high/60 shadow-xl ${statusStyle.borderClass} overflow-hidden`}
        onPress={() => router.push({ pathname: '/animal-detail', params: { id: item.id } })}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View className="px-4 py-3 bg-ya-surface-low/30">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-lg font-bold">{item.name}</Text>
                <View className={`rounded bg-opacity-20 px-2 py-0.5 ${statusStyle.badgeClass}`}>
                  <Text
                    style={{ fontFamily: 'Space Grotesk', color: statusStyle.color }}
                    className="text-[10px] font-bold uppercase"
                  >
                    {statusStyle.label}
                  </Text>
                </View>
              </View>
              <Text className="mt-1 text-ya-text-muted text-xs">
                {item.type} · {item.breed}
              </Text>
            </View>
            <ChevronRight size={20} color={Colors.textSecondary} />
          </View>
        </View>

        <View className="px-4 py-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Radio size={14} color={Colors.textSecondary} />
            <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-text-muted text-xs font-semibold">{item.tagID}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <StatusIcon size={14} color={statusStyle.color} />
            <Text style={{ fontFamily: 'Space Grotesk' }} className={`text-xs font-medium ${statusStyle.textClass}`}>
              {item.lastSeen}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});
