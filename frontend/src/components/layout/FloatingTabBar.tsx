import React, { useEffect, useRef } from 'react';
import { BlurView } from 'expo-blur';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Bell, ChartNoAxesColumn, LayoutGrid, PawPrint, Settings2 } from 'lucide-react-native';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/src/constants';

const TAB_ICONS = {
  index: LayoutGrid,
  rodeo: PawPrint,
  alertas: Bell,
  estadisticas: ChartNoAxesColumn,
  configuracion: Settings2,
} as const;

type RouteName = keyof typeof TAB_ICONS;

type FloatingTabButtonProps = {
  focused: boolean;
  label: string;
  onPress: () => void;
  onLongPress: () => void;
  routeName: RouteName;
};

function FloatingTabButton({ focused, label, onPress, onLongPress, routeName }: FloatingTabButtonProps) {
  const Icon = TAB_ICONS[routeName];
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = (toValue: number) => {
    Animated.timing(scale, {
      toValue,
      duration: 140,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      className="flex-1 items-center justify-center py-1"
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={() => animateScale(0.90)}
      onPressOut={() => animateScale(1)}
      accessibilityRole="button"
    >
      <Animated.View 
        style={{ transform: [{ scale }] }} 
        className={`items-center justify-center rounded-xl px-3 py-1.5 ${focused ? 'bg-ya-primary/10' : ''}`}
      >
        <Icon size={20} color={focused ? Colors.primary : Colors.textSecondary} />
        <Text
          style={{
            color: focused ? Colors.primary : Colors.textSecondary,
            fontFamily: 'Space Grotesk',
            fontSize: 10,
            textTransform: 'uppercase',
            fontWeight: '500',
            marginTop: 2,
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const enterOpacity = useRef(new Animated.Value(0)).current;
  const enterY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(enterOpacity, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(enterY, {
        toValue: 0,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [enterOpacity, enterY]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: enterOpacity,
          transform: [{ translateY: enterY }],
        },
      ]}
    >
      <BlurView intensity={40} tint="dark" style={[styles.nav, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View className="flex-row items-center justify-around px-2 pt-3">
          {state.routes.map((route, index) => {
            const descriptor = descriptors[route.key];
            const href = (descriptor.options as { href?: string | null }).href;
            if (href === null) return null;

            const focused = state.index === index;
            const routeName = route.name as RouteName;
            const label =
              typeof descriptor.options.title === 'string' ? descriptor.options.title : route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({ type: 'tabLongPress', target: route.key });
            };

            return (
              <FloatingTabButton
                key={route.key}
                focused={focused}
                label={label}
                onPress={onPress}
                onLongPress={onLongPress}
                routeName={routeName}
              />
            );
          })}
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  nav: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderColor: '#0d1323',
    backgroundColor: 'rgba(9, 14, 28, 0.60)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 20,
  },
});
