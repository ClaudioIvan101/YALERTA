import React, { useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import {
  Activity,
  ArrowLeft,
  BellOff,
  ChevronRight,
  Fence,
  LocateFixed,
  MapPin,
  Radio,
  Thermometer,
  TrendingDown,
  Wifi,
} from 'lucide-react-native';

type AlertItem = {
  id: string;
  title: string;
  subtitle: string;
  type: 'error' | 'warning' | 'info';
};

const ALERTS_DATA: AlertItem[] = [
  {
    id: 'a1',
    title: 'Salio del Potrero A',
    subtitle: 'Detectado hace 45 minutos',
    type: 'error',
  },
  {
    id: 'a2',
    title: 'Actividad Baja Detectada',
    subtitle: 'Detectado ayer a las 22:15',
    type: 'warning',
  },
  {
    id: 'a3',
    title: 'Sincronizacion de Datos Completa',
    subtitle: 'Detectado hace 2 dias',
    type: 'info',
  },
];

function alertStyles(type: AlertItem['type']) {
  if (type === 'error') {
    return {
      borderClass: 'border-l-ya-error',
      iconBgClass: 'bg-ya-error/15',
      iconColor: '#ff716c',
      icon: Fence,
    };
  }

  if (type === 'warning') {
    return {
      borderClass: 'border-l-ya-tertiary',
      iconBgClass: 'bg-ya-tertiary/15',
      iconColor: '#feb700',
      icon: TrendingDown,
    };
  }

  return {
    borderClass: 'border-l-ya-surface-high',
    iconBgClass: 'bg-ya-surface-high',
    iconColor: '#a6aabf',
    icon: BellOff,
  };
}

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
        data={ALERTS_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 140 }}
        ListHeaderComponent={
          <View>
            <View className="mb-4 flex-row items-center justify-between border-b border-ya-surface-low pb-4">
              <View className="flex-row items-center gap-3">
                <Pressable
                  className="h-9 w-9 items-center justify-center rounded-full bg-ya-surface-low border border-ya-surface-high"
                  onPress={() => router.back()}
                >
                  <ArrowLeft size={16} color="#4dfd9d" />
                </Pressable>
                <Text className="text-ya-primary text-2xl font-headline font-bold">YAlerta</Text>
              </View>
              <View className="flex-row gap-2">
                <View className="h-9 w-9 rounded-full bg-ya-surface-low border border-ya-surface-high items-center justify-center">
                  <Wifi size={15} color="#4dfd9d" />
                </View>
                <View className="h-9 w-9 rounded-full bg-ya-surface-low border border-ya-surface-high items-center justify-center">
                  <Radio size={15} color="#4dfd9d" />
                </View>
              </View>
            </View>

            <View className="mb-5">
              <View className="mb-2 flex-row items-center gap-2">
                <View className="rounded bg-ya-error/15 px-2 py-1">
                  <Text className="text-ya-error text-[10px] uppercase font-headline font-bold">Alerta</Text>
                </View>
                <Text className="text-ya-text-muted text-xs uppercase">ID: #{animal.id}</Text>
              </View>

              <Text className="text-white text-4xl font-headline font-bold">{animal.name}</Text>
              <Text className="mt-1 text-ya-text-muted">Raza: {animal.breed}</Text>

              <View className="mt-4 flex-row gap-2">
                <Pressable className="rounded-md border border-ya-surface-high bg-ya-surface-low px-4 py-3">
                  <Text className="text-ya-primary text-xs uppercase font-headline font-bold">Editar Perfil</Text>
                </Pressable>
                <Pressable
                  className="rounded-md bg-ya-primary px-4 py-3"
                  onPress={() => router.push('/map')}
                >
                  <Text className="text-ya-surface text-xs uppercase font-headline font-bold">Localizar Ahora</Text>
                </Pressable>
              </View>
            </View>

            <View className="mb-5 gap-3">
              <View className="rounded-xl bg-ya-surface-high p-4">
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-ya-text-muted text-[10px] uppercase tracking-widest">Temperatura Corporal</Text>
                  <View className="rounded bg-ya-primary/15 px-2 py-1">
                    <Text className="text-ya-primary text-[10px] uppercase font-bold">Estable</Text>
                  </View>
                </View>
                <View className="flex-row items-end gap-2">
                  <Thermometer size={16} color="#4dfd9d" />
                  <Text className="text-white text-5xl font-headline font-bold">{animal.temp}</Text>
                  <Text className="text-ya-text-muted text-xl">C</Text>
                </View>
              </View>

              <View className="rounded-xl bg-ya-surface-high p-4">
                <Text className="text-ya-text-muted text-[10px] uppercase tracking-widest">Puntaje de Actividad</Text>
                <View className="mt-3 flex-row items-end gap-2">
                  <Activity size={16} color="#4dfd9d" />
                  <Text className="text-white text-5xl font-headline font-bold">{animal.activity}</Text>
                  <Text className="text-ya-text-muted text-xl">/100</Text>
                </View>
              </View>

              <View className="rounded-xl border-l-2 border-l-ya-primary bg-ya-surface-high p-4">
                <Text className="text-ya-text-muted text-[10px] uppercase tracking-widest">Bateria del Tag</Text>
                <View className="mt-3 flex-row items-center gap-3">
                  <View className="h-2 flex-1 overflow-hidden rounded-full bg-ya-surface-low">
                    <View className="h-2 rounded-full bg-ya-primary" style={{ width: `${animal.battery}%` }} />
                  </View>
                  <Text className="text-ya-primary text-2xl font-headline font-bold">{animal.battery}%</Text>
                </View>
                <Text className="mt-2 text-[10px] uppercase text-ya-text-muted">Ultima carga: hace 12d</Text>
              </View>
            </View>

            <View className="mb-5">
              <View className="mb-3 flex-row items-end justify-between">
                <View>
                  <Text className="text-white text-2xl font-headline font-bold">Historial GPS (24h)</Text>
                  <Text className="text-ya-text-muted text-sm">Chequea la ultima ubicacion y recorrido.</Text>
                </View>
                <Pressable onPress={() => router.push('/map')}>
                  <Text className="text-ya-primary text-xs uppercase font-headline font-bold">Ver mapa completo</Text>
                </Pressable>
              </View>

              <View className="h-64 overflow-hidden rounded-xl border border-ya-surface-high">
                <MapView
                  style={{ flex: 1 }}
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
                    <MapPin size={14} color="#4dfd9d" />
                    <View className="flex-1">
                      <Text className="text-white text-xs uppercase font-headline font-bold">Ubicacion Actual</Text>
                      <Text className="mt-1 text-ya-text-muted text-[11px]">
                        Coordenadas: 36.6200 S, 64.2900 W. Descansando cerca del bebedero sur.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className="mb-3 rounded-xl border border-ya-surface-high bg-ya-surface-low p-4">
              <Text className="text-white text-2xl font-headline font-bold">Registro de Alertas</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const styles = alertStyles(item.type);
          const Icon = styles.icon;
          return (
            <Pressable
              className={`mb-2 flex-row items-center justify-between rounded-md border border-ya-surface-high bg-ya-surface-low px-3 py-3 border-l-2 ${styles.borderClass}`}
            >
              <View className="flex-row items-center gap-3">
                <View className={`h-10 w-10 items-center justify-center rounded-full ${styles.iconBgClass}`}>
                  <Icon size={16} color={styles.iconColor} />
                </View>
                <View>
                  <Text className="text-white text-sm font-bold">{item.title}</Text>
                  <Text className="text-ya-text-muted text-xs">{item.subtitle}</Text>
                </View>
              </View>
              <ChevronRight size={16} color="#a6aabf" />
            </Pressable>
          );
        }}
        ListFooterComponent={
          <Pressable className="mt-3 items-center rounded-md border border-ya-surface-high bg-ya-surface-low py-3">
            <View className="flex-row items-center gap-2">
              <LocateFixed size={14} color="#a6aabf" />
              <Text className="text-ya-text-muted text-xs uppercase font-headline font-bold">Ver todo el historial</Text>
            </View>
          </Pressable>
        }
      />
    </SafeAreaView>
  );
}