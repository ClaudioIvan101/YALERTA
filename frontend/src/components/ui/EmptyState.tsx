import React from 'react';
import { Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Colors } from '@/src/constants';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <View className="mt-10 items-center justify-center rounded-2xl border border-ya-surface-high bg-ya-surface-low px-6 py-10">
      <View className="h-14 w-14 rounded-2xl bg-ya-primary/15 items-center justify-center border border-ya-primary/40 mb-4">
        <Icon size={24} color={Colors.primary} />
      </View>
      <Text className="text-white text-lg font-semibold text-center">{title}</Text>
      <Text className="mt-2 text-center text-ya-text-muted">{description}</Text>
    </View>
  );
}
