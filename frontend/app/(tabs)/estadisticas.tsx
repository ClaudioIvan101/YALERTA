import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Activity,
  AlertTriangle,
  Battery,
  ChartNoAxesColumn,
  Fence,
  ShieldCheck,
  Wifi,
} from 'lucide-react-native';
import { Colors } from '@/src/constants';
import { ScreenHeader } from '@/src/components/layout';
import { StatCard } from '@/src/components/cards';
import { SectionTitle, GlowingDot } from '@/src/components/ui';
import { DeviceCard } from '@/src/components/cards';
import { MOCK_GATEWAYS, WEEKLY_ACTIVITY, RODEO_STATS } from '@/src/data';
import Svg, { Circle } from 'react-native-svg';
import { Image } from 'expo-image';

const CowIcon = ({ size, color }: { size: number; color: string }) => (
  <Image 
    source={require('@/assets/images/cow_icon.png')} 
    style={{ width: size, height: size, tintColor: color }} 
    contentFit="contain"
  />
);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function HealthGauge({ score }: { score: number }) {
  const animValue = useRef(new Animated.Value(0)).current;
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: score / 100,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [score, animValue]);

  const strokeDashoffset = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, circumference * (1 - score / 100)],
  });

  return (
    <View className="items-center justify-center py-6">
      <View style={{ width: 180, height: 180 }}>
        <Svg width={180} height={180} viewBox="0 0 180 180">
          <Circle
            cx="90"
            cy="90"
            r={radius}
            stroke={Colors.surfaceHigh}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx="90"
            cy="90"
            r={radius}
            stroke={Colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 90 90)"
          />
        </Svg>
        <View className="absolute inset-0 items-center justify-center">
          <Text
            style={{ fontFamily: 'Space Grotesk', color: Colors.primary }}
            className="text-5xl font-bold"
          >
            {score}
          </Text>
          <Text className="text-ya-text-muted text-xs uppercase tracking-widest mt-1">
            Salud
          </Text>
        </View>
      </View>
    </View>
  );
}

function ActivityChart() {
  const maxValue = Math.max(...WEEKLY_ACTIVITY.map((d) => d.value));

  return (
    <View className="rounded-xl bg-ya-surface-high p-4 border border-ya-surface-high">
      <Text
        style={{ fontFamily: 'Space Grotesk' }}
        className="text-ya-text-muted text-[10px] uppercase tracking-widest mb-4"
      >
        Actividad Semanal
      </Text>
      <View className="flex-row items-end justify-between h-32 gap-2">
        {WEEKLY_ACTIVITY.map((day, index) => {
          const heightPercent = (day.value / maxValue) * 100;
          const hasAlert = day.alerts > 0;
          return (
            <View key={day.day} className="flex-1 items-center gap-2">
              <View
                className="w-full rounded-t-md"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: hasAlert ? Colors.tertiary : Colors.primary,
                  opacity: hasAlert ? 0.8 : 0.6,
                  minHeight: 8,
                }}
              />
              <Text className="text-ya-text-muted text-[10px]">{day.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function EventTimeline() {
  const events = [
    { icon: Fence, color: Colors.error, title: 'Fuera de perímetro', time: 'Hace 4 min', animal: 'Blanca' },
    { icon: Battery, color: Colors.tertiary, title: 'Batería baja', time: 'Hace 2h', animal: 'Pampero' },
    { icon: ShieldCheck, color: Colors.primary, title: 'Regresó al potrero', time: 'Hace 5h', animal: 'Novillo #098' },
    { icon: Wifi, color: Colors.primary, title: 'Gateway reconectado', time: 'Ayer', animal: 'Sector 2' },
  ];

  return (
    <View className="rounded-xl bg-ya-surface-low border border-ya-surface-high p-4">
      {events.map((event, index) => {
        const Icon = event.icon;
        return (
          <View
            key={index}
            className={`flex-row items-start gap-3 py-3 ${
              index < events.length - 1 ? 'border-b border-ya-surface-high' : ''
            }`}
          >
            <View
              style={{ backgroundColor: `${event.color}15` }}
              className="h-9 w-9 rounded-lg items-center justify-center mt-0.5"
            >
              <Icon size={16} color={event.color} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold">{event.title}</Text>
              <Text className="text-ya-text-muted text-xs">{event.animal}</Text>
            </View>
            <Text className="text-ya-text-muted text-[10px] uppercase mt-1">{event.time}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default function EstadisticasScreen() {
  return (
    <SafeAreaView className="flex-1 bg-ya-surface" edges={['top']}>
      <ScreenHeader />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center gap-3 mb-2">
          <Text
            style={{ fontFamily: 'Space Grotesk' }}
            className="text-white text-3xl font-bold"
          >
            Estadísticas
          </Text>
          <GlowingDot color={Colors.primary} size={6} active label="Live" />
        </View>
        <Text className="text-ya-text-muted mb-6">
          Resumen productivo y tendencias del rodeo en tiempo real.
        </Text>

        <View className="rounded-2xl bg-ya-surface-low border border-ya-surface-high mb-6 overflow-hidden">
          <View className="px-4 pt-4">
            <Text
              style={{ fontFamily: 'Space Grotesk' }}
              className="text-ya-text-muted text-[10px] uppercase tracking-widest"
            >
              Salud del Rodeo
            </Text>
          </View>
          <HealthGauge score={RODEO_STATS.healthScore} />
        </View>

        <View className="flex-row gap-3 mb-6">
          <StatCard icon={CowIcon} label="Total" value={RODEO_STATS.totalAnimals} color={Colors.primary} />
          <StatCard icon={ShieldCheck} label="En Potrero" value={RODEO_STATS.inPerimeter} color={Colors.primary} />
        </View>
        <View className="flex-row gap-3 mb-6">
          <StatCard icon={AlertTriangle} label="Alertas" value={RODEO_STATS.activeAlerts} color={Colors.error} trend="stable" />
          <StatCard icon={Battery} label="Batería Prom." value={`${RODEO_STATS.avgBattery}%`} color={Colors.tertiary} trend="down" />
        </View>

        <SectionTitle title="Actividad" subtitle="Índice de movimiento por día" />
        <View className="mb-6">
          <ActivityChart />
        </View>

        <SectionTitle title="Eventos Recientes" />
        <View className="mb-6">
          <EventTimeline />
        </View>

        <SectionTitle title="Dispositivos LoRaWAN" subtitle="Estado de gateways" />
        {MOCK_GATEWAYS.map((gw) => (
          <DeviceCard key={gw.id} device={gw} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}