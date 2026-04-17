import React from 'react';
import { Text, View } from 'react-native';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
};

export function SectionTitle({ title, subtitle, rightContent }: SectionTitleProps) {
  return (
    <View className="flex-row items-end justify-between mb-4">
      <View className="flex-1">
        <Text
          style={{ fontFamily: 'Space Grotesk' }}
          className="text-white text-2xl font-bold"
        >
          {title}
        </Text>
        {subtitle && (
          <Text className="text-ya-text-muted text-sm mt-1">{subtitle}</Text>
        )}
      </View>
      {rightContent}
    </View>
  );
}
