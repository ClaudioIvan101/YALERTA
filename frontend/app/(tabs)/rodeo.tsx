import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { Colors } from '@/src/constants';
import { ScreenHeader } from '@/src/components/layout';
import { AnimalCard } from '@/src/components/cards';
import { FilterChip, EmptyState, SectionTitle } from '@/src/components/ui';
import { ANIMALS_DATA } from '@/src/data';
import type { Animal, AnimalStatus } from '@/src/types';
import { Fence } from 'lucide-react-native';
import { router } from 'expo-router';
import { Pressable } from 'react-native';

type FilterOption = 'all' | AnimalStatus;

const FILTERS: { key: FilterOption; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'Alert', label: 'Alerta' },
  { key: 'In Perimeter', label: 'En Potrero' },
  { key: 'Low Battery', label: 'Batería Baja' },
];

function getFilterCount(filter: FilterOption): number {
  if (filter === 'all') return ANIMALS_DATA.length;
  return ANIMALS_DATA.filter((a) => a.status === filter).length;
}

const ITEM_HEIGHT = 126;

export default function RodeoScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filteredData =
    activeFilter === 'all'
      ? ANIMALS_DATA
      : ANIMALS_DATA.filter((a) => a.status === activeFilter);

  const keyExtractor = useCallback((item: Animal) => item.id, []);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Animal>) => {
      return <AnimalCard item={item} index={index} />;
    },
    []
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<Animal> | null | undefined, index: number) => ({
      index,
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
    }),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-ya-surface" edges={['top']}>
      <FlatList
        data={filteredData}
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
            <ScreenHeader />

            <SectionTitle
              title="Rodeo Activo"
              subtitle="Monitoreo RFID y telemetría LoRaWAN en tiempo real."
            />

            {/* Filter chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
              className="mb-4"
            >
              {FILTERS.map((filter) => (
                <FilterChip
                  key={filter.key}
                  label={filter.label}
                  active={activeFilter === filter.key}
                  count={getFilterCount(filter.key)}
                  onPress={() => setActiveFilter(filter.key)}
                />
              ))}
            </ScrollView>

            {/* Geofence editor button */}
            <Pressable
              className="rounded-xl border border-ya-surface-high bg-ya-surface-low px-3 py-3 mb-4"
              onPress={() => router.push('/geofence-editor')}
            >
              <View className="flex-row items-center justify-center gap-2">
                <Fence size={16} color={Colors.primary} />
                <Text
                  style={{ fontFamily: 'Space Grotesk' }}
                  className="text-ya-primary text-xs uppercase font-bold"
                >
                  Editar Geocerca
                </Text>
              </View>
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon={Search}
            title="Sin animales para mostrar"
            description="No hay animales con este filtro. Verificá conexión LoRaWAN e ingestión de tags RFID."
          />
        }
      />
    </SafeAreaView>
  );
}