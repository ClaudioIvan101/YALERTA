import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { MotiView } from 'moti';
import { MOCK_CATTLE } from '../src/data/mockCattle';
import AnimatedActionButton from '../src/components/AnimatedActionButton';

export default function MapScreen() {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        initialRegion={{
          latitude: -27.46056,
          longitude: -58.98389,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {MOCK_CATTLE.map((animal) => (
          <Marker
            key={animal.id}
            coordinate={{ latitude: animal.latitude, longitude: animal.longitude }}
            onPress={() => setSelectedMarkerId(animal.id)}
            tracksViewChanges
          >
            <MotiView
              from={{
                scale: 1,
                opacity: 1,
              }}
              animate={{
                scale:
                  animal.status === 'warning'
                    ? [1, 1.15, 1]
                    : selectedMarkerId === animal.id
                    ? 1.14
                    : 1,
                opacity: animal.status === 'warning' ? [1, 0.45, 1] : 1,
              }}
              transition={{
                type: 'timing',
                duration: animal.status === 'warning' ? 1300 : 170,
                loop: animal.status === 'warning',
              }}
              className="items-center"
            >
              <View
                className="h-7 w-7 rounded-full border-2 border-white"
                style={{ backgroundColor: animal.status === 'ok' ? '#16A34A' : '#DC2626' }}
              />
              <View className="mt-0.5 h-2 w-2 rotate-45 bg-slate-900" />
            </MotiView>

            <Callout>
              <View className="min-w-[190px] rounded-xl bg-white p-3">
                <Text className="text-base font-extrabold text-slate-900">{animal.name}</Text>
                <Text className="mt-1 text-sm font-medium text-slate-700">
                  Bateria: {animal.battery}%
                </Text>
                <Text className="mt-0.5 text-sm text-slate-600">
                  Ultima actualizacion: {animal.lastUpdate}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View className="absolute right-5 top-12">
        <AnimatedActionButton
          label="Back"
          icon={ChevronLeft}
          onPress={() => router.back()}
          iconColor="#1e293b"
          contentClassName="bg-white/95 border border-slate-200 px-4 py-3"
          labelClassName="text-slate-800"
        />
      </View>
    </View>
  );
}