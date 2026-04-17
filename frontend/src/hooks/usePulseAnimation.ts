import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Hook for pulsing glow animation.
 * Returns animated scale and opacity values for the pulse ring.
 */
export function usePulseAnimation(active: boolean, duration = 1800) {
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (!active) {
      pulseScale.setValue(1);
      pulseOpacity.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1.8,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseScale, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(pulseOpacity, { toValue: 0.6, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [active, duration, pulseScale, pulseOpacity]);

  return { pulseScale, pulseOpacity };
}
