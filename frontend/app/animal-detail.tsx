import React, { useMemo } from 'react';
import { FlatList, Pressable, Text, View, DimensionValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import {
  Activity,
  ChevronRight,
  LocateFixed,
  MapPin,
  Thermometer,
} from 'lucide-react-native';
import { Colors, darkMapStyle } from '@/src/constants';
import { ScreenHeader } from '@/src/components/layout';
import { StatusBadge } from '@/src/components/ui';
import { ALERT_HISTORY } from '@/src/data';
import { getAlertSeverityStyle } from '@/src/utils';

export default function AnimalDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();

  const animal = useMemo(() => {
    return {
      id: params.id ?? 'TN-9402',
      name: 'Toro Negro',
      breed: 'Aberdeen Angus',
      tagId: 'RFID-LW-9402',
      temp: '38.6',
      activity: '72',
      battery: '87',
    };
  }, [params.id]);

  return (
    <SafeAreaView className="flex-1 bg-ya-surface" edges={['top']}>
      <FlatList
        data={ALERT_HISTORY}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 140 }}
        ListHeaderComponent={
          <View>
            <ScreenHeader showBack showRadio />

            <View className="mb-5">
              <View className="mb-2 flex-row items-center gap-2">
                <StatusBadge severity="critical" label="Alerta" showDot />
                <Text className="text-ya-text-muted text-xs uppercase">ID: #{animal.id}</Text>
              </View>

              <Text
                style={{ fontFamily: 'Space Grotesk' }}
                className="text-white text-4xl font-bold"
              >
                {animal.name}
              </Text>
              <Text className="mt-1 text-ya-text-muted">Raza: {animal.breed}</Text>

              <View className="mt-4 flex-row gap-2">
                <Pressable className="rounded-lg border border-ya-surface-high bg-ya-surface-low px-4 py-3">
                  <Text
                    style={{ fontFamily: 'Space Grotesk' }}
                    className="text-ya-primary text-xs uppercase font-bold"
                  >
                    Editar Perfil
                  </Text>
                </Pressable>
                <Pressable
                  className="rounded-lg bg-ya-primary px-4 py-3"
                  onPress={() => router.push('/map')}
                >
                  <Text
                    style={{ fontFamily: 'Space Grotesk' }}
                    className="text-ya-surface text-xs uppercase font-bold"
                  >
                    Localizar Ahora
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="mb-5 gap-3">
              <View className="rounded-xl bg-ya-surface-high p-4">
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-ya-text-muted text-[10px] uppercase tracking-widest">
                    Temperatura Corporal
                  </Text>
                  <StatusBadge severity="success" label="Estable" />
                </View>
                <View className="flex-row items-end gap-2">
                  <Thermometer size={16} color={Colors.primary} />
                  <Text
                    style={{ fontFamily: 'Space Grotesk', color: Colors.textPrimary }}
                    className="text-5xl font-bold"
                  >
                    {animal.temp}
                  </Text>
                  <Text className="text-ya-text-muted text-xl">°C</Text>
                </View>
              </View>

              <View className="rounded-xl bg-ya-surface-high p-4">
                <Text className="text-ya-text-muted text-[10px] uppercase tracking-widest">
                  Puntaje de Actividad
                </Text>
                <View className="mt-3 flex-row items-end gap-2">
                  <Activity size={16} color={Colors.primary} />
                  <Text
                    style={{ fontFamily: 'Space Grotesk', color: Colors.textPrimary }}
                    className="text-5xl font-bold"
                  >
                    {animal.activity}
                  </Text>
                  <Text className="text-ya-text-muted text-xl">/100</Text>
                </View>
              </View>

              <View className="rounded-xl border-l-2 border-l-ya-primary bg-ya-surface-high p-4">
                <Text className="text-ya-text-muted text-[10px] uppercase tracking-widest">
                  Batería del Tag
                </Text>
                <View className="mt-3 flex-row items-center gap-3">
                  <View className="h-2 flex-1 overflow-hidden rounded-full bg-ya-surface-low">
                    <View
                      className="h-2 rounded-full bg-ya-primary"
                      style={{ width: `${animal.battery}%` as DimensionValue }}
                    />
                  </View>
                  <Text
                    style={{ fontFamily: 'Space Grotesk', color: Colors.primary }}
                    className="text-2xl font-bold"
                  >
                    {animal.battery}%
                  </Text>
                </View>
                <Text className="mt-2 text-[10px] uppercase text-ya-text-muted">
                  Última carga: hace 12d
                </Text>
              </View>
            </View>

            <View className="mb-5">
              <View className="mb-3 flex-row items-end justify-between">
                <View>
                  <Text
                    style={{ fontFamily: 'Space Grotesk' }}
                    className="text-white text-2xl font-bold"
                  >
                    Historial GPS (24h)
                  </Text>
                  <Text className="text-ya-text-muted text-sm">
                    Chequeá la última ubicación y recorrido.
                  </Text>
                </View>
                <Pressable onPress={() => router.push('/map')}>
                  <Text
                    style={{ fontFamily: 'Space Grotesk' }}
                    className="text-ya-primary text-xs uppercase font-bold"
                  >
                    Ver mapa completo
                  </Text>
                </Pressable>
              </View>

              <View className="h-64 overflow-hidden rounded-xl border border-ya-surface-high">
                <MapView
                  style={{ flex: 1 }}
                  customMapStyle={darkMapStyle}
                  initialRegion={{
                    latitude: -36.62,
                    longitude: -64.29,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.07,
                  }}
                >
                  <Marker coordinate={{ latitude: -36.62, longitude: -64.29 }}>
                    <View className="h-4 w-4 rounded-full border-2 border-ya-surface bg-ya-primary" />
                  </Marker>
                </MapView>
                <View className="absolute bottom-3 left-3 right-3 rounded-lg border border-ya-surface-high bg-ya-surface/90 p-3">
                  <View className="flex-row items-start gap-2">
                    <MapPin size={14} color={Colors.primary} />
                    <View className="flex-1">
                      <Text
                        style={{ fontFamily: 'Space Grotesk' }}
                        className="text-white text-xs uppercase font-bold"
                      >
                        Ubicación Actual
                      </Text>
                      <Text className="mt-1 text-ya-text-muted text-[11px]">
                        Coordenadas: 36.6200 S, 64.2900 W. Descansando cerca del bebedero sur.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className="mb-3 rounded-xl border border-ya-surface-high bg-ya-surface-low p-4">
              <Text
                style={{ fontFamily: 'Space Grotesk' }}
                className="text-white text-2xl font-bold"
              >
                Registro de Alertas
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const severity = item.type === 'error' ? 'critical' : item.type === 'warning' ? 'warning' : 'info';
          const styles = getAlertSeverityStyle(severity);
          const Icon = styles.icon;
          return (
            <Pressable
              className={`mb-2 flex-row items-center justify-between rounded-lg border border-ya-surface-high bg-ya-surface-low px-3 py-3 border-l-2 ${styles.borderClass}`}
            >
              <View className="flex-row items-center gap-3">
                <View className={`h-10 w-10 items-center justify-center rounded-full ${styles.bgClass}`}>
                  <Icon size={16} color={styles.color} />
                </View>
                <View>
                  <Text className="text-white text-sm font-bold">{item.title}</Text>
                  <Text className="text-ya-text-muted text-xs">{item.subtitle}</Text>
                </View>
              </View>
              <ChevronRight size={16} color={Colors.textSecondary} />
            </Pressable>
          );
        }}
        ListFooterComponent={
          <Pressable className="mt-3 items-center rounded-lg border border-ya-surface-high bg-ya-surface-low py-3">
            <View className="flex-row items-center gap-2">
              <LocateFixed size={14} color={Colors.textSecondary} />
              <Text
                style={{ fontFamily: 'Space Grotesk' }}
                className="text-ya-text-muted text-xs uppercase font-bold"
              >
                Ver todo el historial
              </Text>
            </View>
          </Pressable>
        }
      />
    </SafeAreaView>
  );
}