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
          <View className="flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center">
              <PawPrint size={20} color={Colors.primary} />
            </View>
            <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-2xl font-bold tracking-tighter">
              YAlerta
            </Text>
          </View>
          <View className="flex-row items-center gap-4">
            <Wifi size={24} color={Colors.textSecondary} />
          </View>
        </View>

        <View className="mt-6 rounded-xl bg-ya-surface-high/60 overflow-hidden border border-ya-outline-variant/30 p-1 flex-row items-center justify-between gap-1">
          <StatItem label="Total" value="20" color={Colors.primary} bg="bg-black/40" />
          <StatItem label="En Potrero" value="18" color="#cfd7f2" bg="bg-transparent" />
          <StatItem label="Fuera" value="2" color={Colors.error} bg="bg-transparent" />
          <StatItem label="Batería Baja" value="1" color={Colors.tertiary} bg="bg-transparent" />
        </View>
      </SafeAreaView>

      <View className="absolute top-[50%] left-[10%]">
        <View className="rounded-xl bg-[#242b43]/90 overflow-hidden border border-ya-primary/20 p-4 shadow-2xl min-w-[220px]">
          <View className="flex-row items-start justify-between mb-3">
            <View>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-lg font-bold">Toro Negro</Text>
              <Text className="text-ya-text-muted text-xs font-medium">ID: #TN-9842</Text>
            </View>
            <View className="rounded bg-ya-error/20 px-2 py-1">
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-error text-[10px] font-bold uppercase">ALERTA</Text>
            </View>
          </View>
          <View className="flex-row gap-2 mb-3">
            <View className="flex-1 bg-ya-surface-high rounded-lg p-2">
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-[9px] uppercase text-ya-text-muted">Batería</Text>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-sm font-semibold text-white mt-1">87%</Text>
            </View>
            <View className="flex-1 bg-ya-surface-high rounded-lg p-2">
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-[9px] uppercase text-ya-text-muted">Temp</Text>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-sm font-semibold text-ya-tertiary mt-1">38.6°C</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="absolute inset-x-0 bottom-20 rounded-t-[24px] bg-ya-surface-low/95 overflow-hidden border-t border-ya-outline-variant/30 px-6 pt-3 pb-8 shadow-2xl">
        <View className="items-center mb-5">
          <View className="h-1 w-12 rounded-full bg-ya-outline-variant/50" />
        </View>
        <View className="flex-row items-center justify-between mb-6">
          <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-xl font-bold tracking-tight">Rodeo Activo</Text>
          <View className="rounded-full bg-ya-primary/10 px-3 py-1">
            <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-primary text-xs font-medium">20 Animales</Text>
          </View>
        </View>

        <View className="rounded-xl border-l-4 border-l-ya-error bg-ya-surface-high/50 p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#1e253b]">
              <PawPrint size={20} color={Colors.textSecondary} />
            </View>
            <View>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white font-bold">Vaquillona #402</Text>
              <Text className="text-ya-error text-xs font-medium mt-0.5">Fuera de Potrero</Text>
            </View>
          </View>
          <ChevronRight size={20} color={Colors.textSecondary} />
        </View>

        <View className="rounded-xl border-l-4 border-l-ya-primary bg-ya-surface-high/50 p-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#1e253b]">
              <PawPrint size={20} color={Colors.textSecondary} />
            </View>
            <View>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white font-bold">Novillo Brangus</Text>
              <Text className="text-ya-text-muted text-xs font-medium mt-0.5">En Potrero</Text>
            </View>
          </View>
          <ChevronRight size={20} color={Colors.textSecondary} />
        </View>
      </View>
    </View>
  );
}

type StatItemProps = {
  label: string;
  value: string;
  color: string;
  bg?: string;
};

function StatItem({ label, value, color, bg = 'bg-transparent' }: StatItemProps) {
  return (
    <View className={`flex-1 items-center px-2 py-3 rounded-lg ${bg}`}>
      <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-text-muted text-[10px] uppercase tracking-widest font-medium mb-1">
        {label}
      </Text>
      <Text style={{ fontFamily: 'Space Grotesk', color }} className="font-bold text-xl">
        {value}
      </Text>
    </View>
  );
}