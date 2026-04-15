import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { Pressable, Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';

type AnimatedActionButtonProps = {
  label: string;
  icon: LucideIcon;
  onPress?: () => void | Promise<void>;
  className?: string;
  contentClassName?: string;
  labelClassName?: string;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean;
};

export default function AnimatedActionButton({
  label,
  icon: Icon,
  onPress,
  className,
  contentClassName,
  labelClassName,
  iconSize = 18,
  iconColor = '#052E16',
  disabled = false,
}: AnimatedActionButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handlePress = async () => {
    if (disabled) {
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      className={className}
    >
      <MotiView
        animate={{
          scale: pressed ? 0.95 : 1,
          opacity: pressed ? 0.9 : 1,
        }}
        transition={{
          type: 'timing',
          duration: 120,
        }}
        className={[
          'flex-row items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-4 shadow-sm',
          disabled ? 'opacity-60' : '',
          contentClassName ?? '',
        ].join(' ')}
      >
        <View className="rounded-lg bg-emerald-300/40 p-1.5">
          <Icon size={iconSize} color={iconColor} strokeWidth={2.35} />
        </View>

        <Text
          className={[
            'text-base font-extrabold tracking-tight text-emerald-950',
            labelClassName ?? '',
          ].join(' ')}
        >
          {label}
        </Text>
      </MotiView>
    </Pressable>
  );
}
