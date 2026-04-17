import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { Bell, ChevronRight, PawPrint, Wifi } from 'lucide-react-native';
import { Colors } from '@/src/constants';
import { darkMapStyle, DEFAULT_REGION } from '@/src/constants';
import { GlowingDot } from '@/src/components/ui';

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-ya-surface">
      <MapView
        style={StyleSheet.absoluteFillObject}
        customMapStyle={darkMapStyle}
        initialRegion={DEFAULT_REGION}
      />

      <SafeAreaView className="absolute inset-x-0 top-0 px-4 pt-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="text-ya-primary text-3xl font-extrabold tracking-tight">
              YAlerta
            </Text>
            <GlowingDot color={Colors.primary} size={6} active />
          </View>
          <View className="h-10 w-10 rounded-full bg-ya-surface-low/90 items-center justify-center border border-ya-surface-high">
            <Wifi size={18} color={Colors.primary} />
          </View>
        </View>

        <View className="mt-4 rounded-2xl bg-ya-surface-low/85 border border-ya-surface-high px-3 py-3 flex-row items-center justify-between">
          <StatItem label="Total" value="20" color={Colors.primary} />
          <StatItem label="En Potrero" value="18" color={Colors.textPrimary} />
          <StatItem label="Fuera" value="2" color={Colors.error} />
          <StatItem label="Alertas" value="1" color={Colors.tertiary} />
        </View>
      </SafeAreaView>

      <View className="absolute left-4 right-4 top-[43%]">
        <View className="rounded-2xl bg-ya-surface-low/95 border border-ya-surface-high p-4">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-white text-lg font-bold">Toro Negro</Text>
              <Text className="text-ya-text-muted text-xs mt-1">ID: TN-9842</Text>
            </View>
            <View className="flex-row items-center gap-1.5 rounded-full bg-ya-error/20 px-2.5 py-1">
              <GlowingDot color={Colors.error} size={5} active />
              <Text className="text-ya-error text-[11px] font-semibold">Alerta</Text>
            </View>
          </View>
          <Text className="text-ya-text-muted text-sm mt-3">
            Último evento hace 2 min, fuera de perímetro.
          </Text>
        </View>
      </View>

      <View className="absolute inset-x-0 bottom-24 rounded-t-3xl bg-ya-surface border-t border-ya-surface-high px-4 pt-4 pb-8">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-2xl font-bold">Rodeo Activo</Text>
          <View className="rounded-full bg-ya-primary/15 border border-ya-primary/40 px-3 py-1">
            <Text className="text-ya-primary text-xs font-semibold">20 Animales</Text>
          </View>
        </View>

        <View className="rounded-2xl border-l-4 border-l-ya-error bg-ya-surface-low border border-ya-surface-high px-3 py-3 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Bell size={17} color={Colors.error} />
              <View>
                <Text className="text-white font-semibold">Vaquillona #402</Text>
                <Text className="text-ya-error text-xs mt-0.5">Fuera de Potrero</Text>
              </View>
            </View>
            <ChevronRight size={18} color={Colors.textSecondary} />
          </View>
        </View>

        <View className="rounded-2xl border-l-4 border-l-ya-primary bg-ya-surface-low border border-ya-surface-high px-3 py-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <PawPrint size={17} color={Colors.primary} />
              <View>
                <Text className="text-white font-semibold">Novillo Brangus</Text>
                <Text className="text-ya-primary text-xs mt-0.5">En Potrero</Text>
              </View>
            </View>
            <ChevronRight size={18} color={Colors.textSecondary} />
          </View>
        </View>
      </View>
    </View>
  );
}

type StatItemProps = {
  label: string;
  value: string;
  color: string;
};

function StatItem({ label, value, color }: StatItemProps) {
  return (
    <View className="items-center flex-1">
      <Text className="text-ya-text-muted text-[11px]">{label}</Text>
      <Text style={{ color }} className="font-bold text-lg">
        {value}
      </Text>
    </View>
  );
}