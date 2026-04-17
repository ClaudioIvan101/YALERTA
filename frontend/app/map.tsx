import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, darkMapStyle } from '@/src/constants';
import { MOCK_CATTLE_MAP } from '@/src/data';
import { AnimalMarker } from '@/src/components/map';

export default function MapScreen() {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        customMapStyle={darkMapStyle}
        initialRegion={{
          latitude: -27.46056,
          longitude: -58.98389,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {MOCK_CATTLE_MAP.map((animal) => (
          <Marker
            key={animal.id}
            coordinate={{ latitude: animal.latitude, longitude: animal.longitude }}
            onPress={() => setSelectedMarkerId(animal.id)}
            tracksViewChanges
          >
            <AnimalMarker
              status={animal.status}
              selected={selectedMarkerId === animal.id}
            />

            <Callout>
              <View
                style={{
                  minWidth: 190,
                  borderRadius: 12,
                  backgroundColor: Colors.surfaceLow,
                  padding: 12,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '800', color: Colors.textPrimary }}>
                  {animal.name}
                </Text>
                <Text style={{ marginTop: 4, fontSize: 13, fontWeight: '500', color: Colors.textSecondary }}>
                  Batería: {animal.battery}%
                </Text>
                <Text style={{ marginTop: 2, fontSize: 13, color: Colors.textMuted }}>
                  Última actualización: {animal.lastUpdate}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View className="absolute left-4 top-12">
        <Pressable
          className="flex-row items-center gap-2 rounded-xl border border-ya-surface-high bg-ya-surface-low/95 px-4 py-3"
          onPress={() => router.back()}
        >
          <ArrowLeft size={16} color={Colors.primary} />
          <Text
            style={{ fontFamily: 'Space Grotesk', color: Colors.primary }}
            className="text-sm font-bold"
          >
            Volver
          </Text>
        </Pressable>
      </View>
    </View>
  );
}