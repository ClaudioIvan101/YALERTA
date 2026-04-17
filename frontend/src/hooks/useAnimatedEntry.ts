import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Hook for staggered fade-in + slide-up entry animation.
 * Use in FlatList renderItem with the item index.
 */
export function useAnimatedEntry(index: number, delay = 80) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 380,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, index * delay);

    return () => clearTimeout(timeout);
  }, [index, delay, opacity, translateY]);

  return { opacity, transform: [{ translateY }] };
}
