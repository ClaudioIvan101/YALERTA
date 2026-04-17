import React from 'react';
import { Animated, Text, View } from 'react-native';
import { usePulseAnimation } from '@/src/hooks';
import { Colors } from '@/src/constants';

type GlowingDotProps = {
  color?: string;
  size?: number;
  active?: boolean;
  label?: string;
};

export function GlowingDot({
  color = Colors.primary,
  size = 8,
  active = true,
  label,
}: GlowingDotProps) {
  const { pulseScale, pulseOpacity } = usePulseAnimation(active);

  return (
    <View className="flex-row items-center gap-2">
      <View style={{ width: size * 2.5, height: size * 2.5, alignItems: 'center', justifyContent: 'center' }}>
        {active && (
          <Animated.View
            style={{
              position: 'absolute',
              width: size * 2,
              height: size * 2,
              borderRadius: size,
              backgroundColor: color,
              opacity: pulseOpacity,
              transform: [{ scale: pulseScale }],
            }}
          />
        )}
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          }}
        />
      </View>
      {label && (
        <Text
          style={{ color, fontFamily: 'Space Grotesk', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          {label}
        </Text>
      )}
    </View>
  );
}
