import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, DimensionValue } from 'react-native';
import { Colors } from '@/src/constants';

type SkeletonLoaderProps = {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  className?: string;
};

export function SkeletonLoader({
  width = '100%',
  height = 16,
  borderRadius = 8,
  className,
}: SkeletonLoaderProps) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <View className={className}>
      <Animated.View
        style={{
          width,
          height,
          borderRadius,
          backgroundColor: Colors.surfaceHigh,
          opacity,
        }}
      />
    </View>
  );
}
