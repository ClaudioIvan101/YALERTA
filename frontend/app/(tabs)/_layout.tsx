import React, { useEffect, useRef } from 'react';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Bell, ChartNoAxesColumn, LayoutGrid, PawPrint, Settings2 } from 'lucide-react-native';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
      onPressIn={() => animateScale(0.94)}
      onPressOut={() => animateScale(1)}
      accessibilityRole="button"
    >
      <Animated.View style={{ transform: [{ scale }] }} className="items-center gap-1">
        <View className={`rounded-full px-3 py-2 ${focused ? 'bg-ya-primary/15' : ''}`}>
          <Icon size={18} color={focused ? '#4dfd9d' : '#a6aabf'} />
        </View>
        <Text
          style={{
            color: focused ? '#4dfd9d' : '#a6aabf',
            fontFamily: 'Space Grotesk',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: 0.7,
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
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
          bottom: Math.max(insets.bottom, 10) + 8,
        },
      ]}
      pointerEvents="box-none"
    >
      <BlurView intensity={78} tint="dark" style={styles.pill}>
        <View className="flex-row items-center justify-between px-2 py-2">
          {state.routes.map((route, index) => {
            const descriptor = descriptors[route.key];
            const href = (descriptor.options as { href?: string | null }).href;
            if (href === null) {
              return null;
            }

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
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
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

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#090e1c' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="rodeo" options={{ title: 'Rodeo' }} />
      <Tabs.Screen name="alertas" options={{ title: 'Alertas' }} />
      <Tabs.Screen name="estadisticas" options={{ title: 'Estadisticas' }} />
      <Tabs.Screen name="configuracion" options={{ title: 'Configuracion' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 14,
    right: 14,
  },
  pill: {
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#0d1323',
    backgroundColor: 'rgba(9, 14, 28, 0.88)',
  },
});