import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Bell,
  BellOff,
  ChevronRight,
  Fence,
  Info,
  MapPin,
  Radio,
  Smartphone,
  Volume2,
  Wifi,
  WifiOff,
  Zap,
} from 'lucide-react-native';
import { Colors } from '@/src/constants';
import { ScreenHeader } from '@/src/components/layout';
import { SectionTitle } from '@/src/components/ui';
import { SettingRow, DeviceCard } from '@/src/components/cards';
import { MOCK_GATEWAYS } from '@/src/data';

export default function ConfiguracionScreen() {
  const [perimeterAlerts, setPerimeterAlerts] = useState(true);
  const [batteryAlerts, setBatteryAlerts] = useState(true);
  const [signalAlerts, setSignalAlerts] = useState(false);
  const [alertSound, setAlertSound] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-ya-surface" edges={['top']}>
      <ScreenHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{ fontFamily: 'Space Grotesk' }}
          className="text-white text-3xl font-bold mb-1"
        >
          Configuración
        </Text>
        <Text className="text-ya-text-muted mb-8">
          Preferencias de app, alertas y dispositivos.
        </Text>

        {/* ── Profile Section ── */}
        <View className="rounded-xl bg-ya-surface-low border border-ya-surface-high p-5 mb-6">
          <View className="flex-row items-center gap-4">
            <View className="h-14 w-14 rounded-2xl bg-ya-primary/15 items-center justify-center border border-ya-primary/40">
              <MapPin size={24} color={Colors.primary} />
            </View>
            <View className="flex-1">
              <Text
                style={{ fontFamily: 'Space Grotesk' }}
                className="text-white text-lg font-bold"
              >
                Estancia La Vaquita
              </Text>
              <Text className="text-ya-text-muted text-sm">
                Mendoza, Argentina · 340 HA
              </Text>
            </View>
            <ChevronRight size={18} color={Colors.textSecondary} />
          </View>
        </View>

        {/* ── Notifications Section ── */}
        <SectionTitle title="Notificaciones" />
        <View className="rounded-xl bg-ya-surface-low border border-ya-surface-high px-4 mb-6">
          <SettingRow
            icon={Fence}
            label="Alertas de Perímetro"
            description="Notificar cuando un animal salga del potrero"
            value={perimeterAlerts}
            onValueChange={setPerimeterAlerts}
          />
          <SettingRow
            icon={Zap}
            label="Batería Baja"
            description="Notificar cuando un tag baje del 20%"
            value={batteryAlerts}
            onValueChange={setBatteryAlerts}
          />
          <SettingRow
            icon={WifiOff}
            label="Pérdida de Señal"
            description="Notificar cuando un dispositivo se desconecte"
            value={signalAlerts}
            onValueChange={setSignalAlerts}
          />
          <SettingRow
            icon={Volume2}
            label="Sonido de Alerta"
            description="Reproducir sonido en alertas críticas"
            value={alertSound}
            onValueChange={setAlertSound}
          />
        </View>

        {/* ── Devices Section ── */}
        <SectionTitle title="Dispositivos" subtitle="Gateways LoRaWAN conectados" />
        {MOCK_GATEWAYS.map((gw) => (
          <DeviceCard key={gw.id} device={gw} />
        ))}

        {/* ── Geofences Section ── */}
        <SectionTitle title="Geocercas" subtitle="Potreros configurados" />
        <View className="rounded-xl bg-ya-surface-low border border-ya-surface-high overflow-hidden mb-6">
          {['Paddock Norte', 'Paddock Sur', 'Alambrado Este'].map((name, index) => (
            <Pressable
              key={name}
              className={`flex-row items-center justify-between px-4 py-4 ${
                index < 2 ? 'border-b border-ya-surface-high' : ''
              }`}
              onPress={() => router.push('/geofence-editor')}
            >
              <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 rounded-lg bg-ya-primary/15 items-center justify-center">
                  <Fence size={16} color={Colors.primary} />
                </View>
                <View>
                  <Text className="text-white font-medium">{name}</Text>
                  <Text className="text-ya-text-muted text-xs">
                    {index === 0 ? '14.2 HA · 5 vértices' : index === 1 ? '8.7 HA · 4 vértices' : '22.1 HA · 6 vértices'}
                  </Text>
                </View>
              </View>
              <ChevronRight size={16} color={Colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* ── About Section ── */}
        <SectionTitle title="Acerca de" />
        <View className="rounded-xl bg-ya-surface-low border border-ya-surface-high px-4 mb-6">
          <View className="flex-row items-center justify-between py-4 border-b border-ya-surface-high">
            <View className="flex-row items-center gap-3">
              <Info size={16} color={Colors.textSecondary} />
              <Text className="text-white text-sm">Versión</Text>
            </View>
            <Text className="text-ya-text-muted text-sm">1.0.0 (build 1)</Text>
          </View>
          <View className="flex-row items-center justify-between py-4 border-b border-ya-surface-high">
            <View className="flex-row items-center gap-3">
              <Smartphone size={16} color={Colors.textSecondary} />
              <Text className="text-white text-sm">Dispositivo</Text>
            </View>
            <Text className="text-ya-text-muted text-sm">React Native</Text>
          </View>
          <Pressable className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center gap-3">
              <Radio size={16} color={Colors.textSecondary} />
              <Text className="text-white text-sm">Soporte Técnico</Text>
            </View>
            <ChevronRight size={16} color={Colors.textSecondary} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}