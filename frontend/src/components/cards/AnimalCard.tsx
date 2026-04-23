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
      toValue: 0.95,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[entryStyle, { transform: [...entryStyle.transform, { scale }] }]}>
      <Pressable
        className={`mb-4 rounded-[16px] border border-ya-outline-variant/30 bg-[#1a2133]/90 shadow-2xl overflow-hidden`}
        onPress={() => router.push({ pathname: '/animal-detail', params: { id: item.id } })}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View className="absolute top-0 bottom-0 left-0 w-1" style={{ backgroundColor: statusStyle.color }} />
        
        <View className="px-5 py-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <View className="flex-row items-center gap-3">
                <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-xl font-bold tracking-tight">{item.name}</Text>
                <View className={`rounded-full px-3 py-1 bg-opacity-10 border`} style={{ backgroundColor: `${statusStyle.color}15`, borderColor: `${statusStyle.color}30` }}>
                  <Text
                    style={{ fontFamily: 'Space Grotesk', color: statusStyle.color }}
                    className="text-[10px] font-extrabold uppercase tracking-widest"
                  >
                    {statusStyle.label}
                  </Text>
                </View>
              </View>
              <Text className="mt-1 text-ya-text-muted text-xs font-medium uppercase tracking-widest">
                {item.type} · {item.breed}
              </Text>
            </View>
            <View className="w-8 h-8 rounded-full bg-ya-surface/50 items-center justify-center border border-ya-outline-variant/20">
              <ChevronRight size={18} color={Colors.textSecondary} />
            </View>
          </View>

          <View className="flex-row items-center justify-between mt-2 pt-3 border-t border-ya-outline-variant/20">
            <View className="flex-row items-center gap-2 bg-ya-surface/40 px-2 py-1 rounded-md">
              <Radio size={12} color={Colors.textSecondary} />
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-text-muted text-xs font-semibold">{item.tagID}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <StatusIcon size={14} color={statusStyle.color} />
              <Text style={{ fontFamily: 'Space Grotesk' }} className={`text-xs font-semibold ${statusStyle.textClass}`}>
                {item.lastSeen}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});
