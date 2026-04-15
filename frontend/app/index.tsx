import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Bell, ChevronRight, PawPrint, Wifi } from 'lucide-react-native';

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0a1120' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6b728a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a1120' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#1f293e' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#121a2c' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#162038' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0e1628' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#030712' }] },
];

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-ya-surface">
      <MapView
        style={StyleSheet.absoluteFillObject}
        customMapStyle={darkMapStyle}
        initialRegion={{
          latitude: -32.8895,
          longitude: -68.8458,
          latitudeDelta: 0.07,
          longitudeDelta: 0.06,
        }}
      />

      <SafeAreaView className="absolute inset-x-0 top-0 px-4 pt-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-ya-primary text-3xl font-extrabold tracking-tight">YAlerta</Text>
          <View className="h-10 w-10 rounded-full bg-ya-surface-low/90 items-center justify-center border border-ya-surface-high">
            <Wifi size={18} color="#4dfd9d" />
          </View>
        </View>

        <View className="mt-4 rounded-2xl bg-ya-surface-low/85 border border-ya-surface-high px-3 py-3 flex-row items-center justify-between">
          <StatItem label="Total" value="20" valueClassName="text-ya-primary" />
          <StatItem label="En Potrero" value="18" valueClassName="text-white" />
          <StatItem label="Fuera" value="2" valueClassName="text-ya-error" />
          <StatItem label="Alertas" value="1" valueClassName="text-ya-tertiary" />
        </View>
      </SafeAreaView>

      <View className="absolute left-4 right-4 top-[43%]">
        <View className="rounded-2xl bg-ya-surface-low/95 border border-ya-surface-high p-4">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-white text-lg font-bold">Toro Negro</Text>
              <Text className="text-ya-text-muted text-xs mt-1">ID: TN-9842</Text>
            </View>
            <View className="flex-row items-center gap-1 rounded-full bg-ya-error/20 px-2.5 py-1">
              <Bell size={12} color="#ff716c" />
              <Text className="text-ya-error text-[11px] font-semibold">Alerta</Text>
            </View>
          </View>
          <Text className="text-ya-text-muted text-sm mt-3">Último evento hace 2 min, fuera de perímetro.</Text>
        </View>
      </View>

      <View className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-ya-surface border-t border-ya-surface-high px-4 pt-4 pb-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-2xl font-bold">Rodeo Activo</Text>
          <View className="rounded-full bg-ya-primary/15 border border-ya-primary/40 px-3 py-1">
            <Text className="text-ya-primary text-xs font-semibold">20 Animales</Text>
          </View>
        </View>

        <View className="rounded-2xl border-l-4 border-l-ya-error bg-ya-surface-low border border-ya-surface-high px-3 py-3 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Bell size={17} color="#ff716c" />
              <View>
                <Text className="text-white font-semibold">Vaquillona #402</Text>
                <Text className="text-ya-error text-xs mt-0.5">Fuera de Potrero</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#a6aabf" />
          </View>
        </View>

        <View className="rounded-2xl border-l-4 border-l-ya-primary bg-ya-surface-low border border-ya-surface-high px-3 py-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <PawPrint size={17} color="#4dfd9d" />
              <View>
                <Text className="text-white font-semibold">Novillo Brangus</Text>
                <Text className="text-ya-primary text-xs mt-0.5">En Potrero</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#a6aabf" />
          </View>
        </View>
      </View>
    </View>
  );
}

type StatItemProps = {
  label: string;
  value: string;
  valueClassName: string;
};

function StatItem({ label, value, valueClassName }: StatItemProps) {
  return (
    <View className="items-center flex-1">
      <Text className="text-ya-text-muted text-[11px]">{label}</Text>
      <Text className={`font-bold text-lg ${valueClassName}`}>{value}</Text>
    </View>
  );
}