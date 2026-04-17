import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Radio, Wifi } from 'lucide-react-native';
import { Colors } from '@/src/constants';

type ScreenHeaderProps = {
  showBack?: boolean;
  showWifi?: boolean;
  showRadio?: boolean;
  rightContent?: React.ReactNode;
};

export function ScreenHeader({
  showBack = false,
  showWifi = true,
  showRadio = false,
  rightContent,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], paddingTop: insets.top }}
      className="px-4 pb-3"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          {showBack && (
            <Pressable
              className="h-9 w-9 items-center justify-center rounded-full bg-ya-surface-low border border-ya-surface-high"
              onPress={() => router.back()}
            >
              <ArrowLeft size={16} color={Colors.primary} />
            </Pressable>
          )}
          <Text
            style={{ fontFamily: 'Space Grotesk' }}
            className="text-ya-primary text-2xl font-bold"
          >
            YAlerta
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          {rightContent}
          {showRadio && (
            <View className="h-9 w-9 rounded-full bg-ya-surface-low border border-ya-surface-high items-center justify-center">
              <Radio size={15} color={Colors.primary} />
            </View>
          )}
          {showWifi && (
            <View className="h-9 w-9 rounded-full bg-ya-surface-low border border-ya-surface-high items-center justify-center">
              <Wifi size={15} color={Colors.primary} />
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
}
