import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Text, TextInput } from 'react-native';
import '../global.css';

export default function RootLayout() {
  useEffect(() => {
    const systemFontFamily = Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'System',
    });

    if (systemFontFamily) {
      const textDefaultProps = (Text as typeof Text & { defaultProps?: Record<string, unknown> })
        .defaultProps ?? {};
      (Text as typeof Text & { defaultProps?: Record<string, unknown> }).defaultProps = {
        ...textDefaultProps,
        style: [textDefaultProps.style, { fontFamily: systemFontFamily }],
      };

      const inputDefaultProps = (
        TextInput as typeof TextInput & { defaultProps?: Record<string, unknown> }
      ).defaultProps ?? {};
      (TextInput as typeof TextInput & { defaultProps?: Record<string, unknown> }).defaultProps = {
        ...inputDefaultProps,
        style: [inputDefaultProps.style, { fontFamily: systemFontFamily }],
      };
    }
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f8fafc' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="map" />
      </Stack>
    </>
  );
}