import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  AlertTriangle,
  BatteryWarning,
  ChevronRight,
  Fence,
  Radio,
  ShieldCheck,
  Wifi,
} from 'lucide-react-native';

type AnimalStatus = 'In Perimeter' | 'Alert' | 'Low Battery';

type Animal = {
  id: string;
  name: string;
  tagID: string;
  type: string;
  breed: 'Brangus' | 'Braford';
  status: AnimalStatus;
  lastSeen: string;
  lorawanStatus: 'Online' | 'Intermittent' | 'Offline';
};

const ANIMALS_DATA: Animal[] = [
  {
    id: '1',
    name: 'Vaquillona #402',
    tagID: 'RFID-LW-0402',
    type: 'Heifer',
    breed: 'Brangus',
    status: 'Alert',
    lastSeen: '2 min ago',
    lorawanStatus: 'Intermittent',
  },
  {
    id: '2',
    name: 'Novillo Brangus',
    tagID: 'RFID-LW-0098',
    type: 'Steer',
    breed: 'Brangus',
    status: 'In Perimeter',
    lastSeen: '1 min ago',
    lorawanStatus: 'Online',
  },
  {
    id: '3',
    name: 'Toro Pampero',
    tagID: 'RFID-LW-0130',
    type: 'Bull',
    breed: 'Braford',
    status: 'Low Battery',
    lastSeen: '5 min ago',
    lorawanStatus: 'Online',
  },
  {
    id: '4',
    name: 'Vaca Mora #117',
    tagID: 'RFID-LW-0117',
    type: 'Cow',
    breed: 'Braford',
    status: 'In Perimeter',
    lastSeen: 'Just now',
    lorawanStatus: 'Online',
  },
  {
    id: '5',
    name: 'Ternero Sur #21',
    tagID: 'RFID-LW-0021',
    type: 'Calf',
    breed: 'Brangus',
    status: 'Low Battery',
    lastSeen: '9 min ago',
    lorawanStatus: 'Offline',
  },
  {
    id: '6',
    name: 'Vaca Blanca #009',
    tagID: 'RFID-LW-0009',
    type: 'Cow',
    breed: 'Braford',
    status: 'Alert',
    lastSeen: '7 min ago',
    lorawanStatus: 'Intermittent',
  },
];

const ITEM_HEIGHT = 126;

function getStatusClasses(status: AnimalStatus) {
  if (status === 'Alert') {
    return {
      borderClassName: 'border-l-ya-error',
      badgeClassName: 'bg-ya-error/15 border-ya-error/30',
      textClassName: 'text-ya-error',
      iconColor: '#ff716c',
    };
  }

  if (status === 'Low Battery') {
    return {
      borderClassName: 'border-l-ya-tertiary',
      badgeClassName: 'bg-ya-tertiary/15 border-ya-tertiary/30',
      textClassName: 'text-ya-tertiary',
      iconColor: '#feb700',
    };
  }

  return {
    borderClassName: 'border-l-ya-primary',
    badgeClassName: 'bg-ya-primary/15 border-ya-primary/30',
    textClassName: 'text-ya-primary',
    iconColor: '#4dfd9d',
  };
}

function StatusIcon({ status, color }: { status: AnimalStatus; color: string }) {
  if (status === 'Alert') {
    return <AlertTriangle size={16} color={color} />;
  }
  if (status === 'Low Battery') {
    return <BatteryWarning size={16} color={color} />;
  }
  return <ShieldCheck size={16} color={color} />;
}

const AnimalCard = memo(function AnimalCard({ item }: { item: Animal }) {
  const statusStyles = getStatusClasses(item.status);

  return (
    <Pressable
      className={`mb-3 rounded-2xl border border-ya-surface-high border-l-4 bg-ya-surface-low px-4 py-3 ${statusStyles.borderClassName}`}
      onPress={() => router.push({ pathname: '/animal-detail', params: { id: item.id } })}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-base font-semibold">{item.name}</Text>
            <View className={`rounded-full border px-2 py-1 ${statusStyles.badgeClassName}`}>
              <Text className={`text-[10px] font-semibold uppercase ${statusStyles.textClassName}`}>
                {item.status}
              </Text>
            </View>
          </View>
          <Text className="mt-1 text-ya-text-muted text-xs">
            {item.type} · {item.breed}
          </Text>
        </View>

        <ChevronRight size={18} color="#a6aabf" />
      </View>

      <View className="mt-3 rounded-xl border border-ya-surface-high bg-ya-surface px-3 py-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Radio size={14} color="#a6aabf" />
            <Text className="text-ya-text-muted text-xs">{item.tagID}</Text>
          </View>
          <Text className="text-ya-text-muted text-xs">{item.lastSeen}</Text>
        </View>

        <View className="mt-2 flex-row items-center gap-2">
          <StatusIcon status={item.status} color={statusStyles.iconColor} />
          <Text className={`text-xs ${statusStyles.textClassName}`}>LoRaWAN {item.lorawanStatus}</Text>
        </View>
      </View>
    </Pressable>
  );
});

export default function RodeoScreen() {
  const keyExtractor = useCallback((item: Animal) => item.id, []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Animal>) => {
    return <AnimalCard item={item} />;
  }, []);

  const getItemLayout = useCallback((_: ArrayLike<Animal> | null | undefined, index: number) => {
    return {
      index,
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-ya-surface" edges={['top']}>
      <FlatList
        data={ANIMALS_DATA}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={7}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 150 }}
        ListHeaderComponent={
          <View className="mb-5">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white text-3xl font-bold font-headline">Rodeo Activo</Text>
                <Text className="mt-1 text-ya-text-muted">Monitoreo RFID y telemetría LoRaWAN en tiempo real.</Text>
              </View>
              <View className="h-10 w-10 rounded-full border border-ya-surface-high bg-ya-surface-low items-center justify-center">
                <Wifi size={17} color="#4dfd9d" />
              </View>
            </View>

            <View className="mt-4 flex-row gap-3">
              <Pressable
                className="flex-1 rounded-xl border border-ya-surface-high bg-ya-surface-low px-3 py-3"
                onPress={() => router.push('/geofence-editor')}
              >
                <View className="flex-row items-center justify-center gap-2">
                  <Fence size={16} color="#4dfd9d" />
                  <Text className="text-ya-primary text-xs uppercase font-headline font-bold">Editar Geocerca</Text>
                </View>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="mt-10 items-center justify-center rounded-2xl border border-ya-surface-high bg-ya-surface-low px-6 py-10">
            <Text className="text-white text-lg font-semibold">Sin animales para mostrar</Text>
            <Text className="mt-2 text-center text-ya-text-muted">Verificá conexión LoRaWAN e ingestión de tags RFID.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}