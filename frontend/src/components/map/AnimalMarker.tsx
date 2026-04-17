import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { Colors } from '@/src/constants';

type AnimalMarkerProps = {
  status: 'ok' | 'warning';
  selected?: boolean;
};

export function AnimalMarker({ status, selected = false }: AnimalMarkerProps) {
  const color = status === 'ok' ? Colors.primary : Colors.error;

  return (
    <MotiView
      from={{ scale: 1, opacity: 1 }}
      animate={{
        scale: status === 'warning' ? [1, 1.15, 1] : selected ? 1.14 : 1,
        opacity: status === 'warning' ? [1, 0.45, 1] : 1,
      }}
      transition={{
        type: 'timing',
        duration: status === 'warning' ? 1300 : 170,
        loop: status === 'warning',
      }}
      className="items-center"
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          borderWidth: 2,
          borderColor: Colors.surface,
          backgroundColor: color,
          shadowColor: color,
          shadowOpacity: 0.5,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 0 },
          elevation: 4,
        }}
      />
      <View
        style={{
          marginTop: 2,
          width: 8,
          height: 8,
          backgroundColor: Colors.surface,
          transform: [{ rotate: '45deg' }],
          borderRadius: 1,
        }}
      />
    </MotiView>
  );
}
