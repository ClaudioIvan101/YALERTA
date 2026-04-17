import React, { useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { Colors } from '@/src/constants';

type FilterChipProps = {
  label: string;
  active: boolean;
  count?: number;
  onPress: () => void;
};

export function FilterChip({ label, active, count, onPress }: FilterChipProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.93,
      duration: 100,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`flex-row items-center gap-1.5 px-4 py-2 rounded-full ${
          active
            ? 'bg-ya-primary'
            : 'bg-ya-surface-high border border-ya-surface-low'
        }`}
      >
        <Text
          style={{ fontFamily: 'Space Grotesk' }}
          className={`font-semibold text-xs ${
            active ? 'text-[#004625]' : 'text-ya-text-muted'
          }`}
        >
          {label}
        </Text>
        {count !== undefined && count > 0 && (
          <View
            className={`min-w-[18px] h-[18px] rounded-full items-center justify-center ${
              active ? 'bg-[#004625]/30' : 'bg-ya-surface-low'
            }`}
          >
            <Text
              className={`text-[10px] font-bold ${
                active ? 'text-[#004625]' : 'text-ya-text-muted'
              }`}
            >
              {count}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}
