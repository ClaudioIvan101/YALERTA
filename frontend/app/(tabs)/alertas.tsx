import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/src/constants';
import { ScreenHeader } from '@/src/components/layout';
import { AlertCard } from '@/src/components/cards';
import { FilterChip, SectionTitle, GlowingDot } from '@/src/components/ui';
import { MOCK_ALERTS } from '@/src/data';
import type { AlertCategory } from '@/src/types';

type FilterOption = 'all' | AlertCategory;

const FILTERS: { key: FilterOption; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'perimeter', label: 'Fuera de Límite' },
  { key: 'battery', label: 'Batería Baja' },
  { key: 'signal', label: 'Sin Señal' },
];

function getFilterCount(filter: FilterOption): number {
  if (filter === 'all') return MOCK_ALERTS.length;
  return MOCK_ALERTS.filter((a) => a.category === filter).length;
}

export default function AlertasScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filteredAlerts =
    activeFilter === 'all'
      ? MOCK_ALERTS
      : MOCK_ALERTS.filter((a) => a.category === activeFilter);

  return (
    <SafeAreaView className="flex-1 bg-ya-surface" edges={['top']}>
      <ScreenHeader />

      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View className="flex-row items-center gap-3 mb-2">
          <Text
            style={{ fontFamily: 'Space Grotesk' }}
            className="text-white text-3xl font-bold"
          >
            Centro de Alertas
          </Text>
          <GlowingDot color={Colors.error} size={6} active label="" />
        </View>
        <Text className="text-ya-text-muted mb-6">
          Gestión de perímetros y estado del rodeo en tiempo real.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingBottom: 4 }}
          className="mb-6"
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

        {filteredAlerts.map((alert, index) => (
          <AlertCard
            key={alert.id}
            item={alert}
            compact={alert.severity === 'success' || alert.severity === 'info'}
            onIgnore={alert.severity === 'critical' ? () => {} : undefined}
            onIntervene={alert.severity === 'critical' ? () => {} : undefined}
          />
        ))}

        {filteredAlerts.length === 0 && (
          <View className="mt-10 items-center justify-center rounded-2xl border border-ya-surface-high bg-ya-surface-low px-6 py-10">
            <Text className="text-white text-lg font-semibold">Sin alertas</Text>
            <Text className="mt-2 text-center text-ya-text-muted">
              No hay alertas con este filtro activo.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}