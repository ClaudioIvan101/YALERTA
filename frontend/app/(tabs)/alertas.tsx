import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Wifi, AlertTriangle, Battery, CheckCircle2 } from 'lucide-react-native';

export default function AlertasScreen() {
  return (
    <SafeAreaView className="flex-1 bg-ya-surface">
      <View className="flex-row justify-between items-center px-6 h-16 border-b border-[#0d1323]">
        <View className="flex-row items-center gap-3">
          <Bell color="#4dfd9d" size={24} />
          <Text className="font-headline text-2xl font-bold text-ya-primary">YAlerta</Text>
        </View>
        <TouchableOpacity className="active:scale-95 p-2 rounded-lg bg-ya-surface-high">
          <Wifi color="#4dfd9d" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <View className="mb-8">
          <Text className="font-headline text-4xl font-bold text-white mb-2">Centro de Alertas</Text>
          <Text className="font-body text-ya-text-muted">Gestión de perímetros y estado del rodeo en tiempo real.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8" contentContainerStyle={{ gap: 8 }}>
          <TouchableOpacity className="px-6 py-2 rounded-full bg-[#12dd81]">
            <Text className="font-headline font-semibold text-xs text-[#004625]">Todas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-2 rounded-full bg-ya-surface-high border border-ya-surface-low">
            <Text className="font-headline font-semibold text-xs text-ya-text-muted">Fuera de Límite</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-2 rounded-full bg-ya-surface-high border border-ya-surface-low">
            <Text className="font-headline font-semibold text-xs text-ya-text-muted">Batería Baja</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-2 rounded-full bg-ya-surface-high border border-ya-surface-low">
            <Text className="font-headline font-semibold text-xs text-ya-text-muted">Sin Señal</Text>
          </TouchableOpacity>
        </ScrollView>

        <View className="gap-6 pb-32">
          <View className="bg-ya-surface-low rounded-xl border-l-4 border-ya-error p-5 shadow-lg">
            <View className="flex-row justify-between items-start mb-3">
              <View className="bg-ya-error/20 px-2 py-1 rounded">
                <Text className="text-ya-error text-[10px] font-headline font-bold uppercase">CRÍTICO</Text>
              </View>
              <Text className="font-headline text-[10px] text-ya-text-muted uppercase">Hace 4 min</Text>
            </View>
            <Text className="font-headline text-2xl font-bold text-white mb-4">Fuera de Límite</Text>
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 rounded-lg bg-ya-surface-high items-center justify-center border border-[#181f33]">
                <AlertTriangle color="#4dfd9d" size={20} />
              </View>
              <View>
                <Text className="font-headline font-bold text-ya-primary">Blanca</Text>
                <Text className="font-body text-xs text-ya-text-muted">DEV-012</Text>
              </View>
            </View>
            <Text className="font-body text-sm text-ya-text-muted leading-relaxed mb-6">
              El ejemplar ha traspasado el perímetro virtual del <Text className="text-white font-semibold">Alambrado Norte</Text>. Posible rotura de cerco o portón abierto.
            </Text>
            <View className="flex-row justify-end gap-3 pt-4 border-t border-ya-surface-high">
              <TouchableOpacity className="px-4 py-2 rounded bg-ya-surface-high">
                <Text className="text-white font-headline font-bold text-[10px]">IGNORAR</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 rounded bg-ya-primary">
                <Text className="text-[#090e1c] font-headline font-bold text-[10px]">INTERVENIR</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-ya-surface-low rounded-xl border-l-4 border-ya-tertiary p-5">
            <View className="flex-row justify-between items-start mb-3">
              <View className="bg-ya-tertiary/20 px-2 py-1 rounded">
                <Text className="text-ya-tertiary text-[10px] font-headline font-bold uppercase">ADVERTENCIA</Text>
              </View>
              <Text className="font-headline text-[10px] text-ya-text-muted uppercase">Hace 2 horas</Text>
            </View>
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-lg bg-ya-surface-high items-center justify-center">
                  <Battery color="#feb700" size={20} />
                </View>
                <View>
                  <Text className="font-headline text-lg font-bold text-white">Batería Baja</Text>
                  <Text className="font-body text-xs text-ya-text-muted">Pampero (DEV-005)</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="font-headline text-2xl font-bold text-ya-tertiary">12%</Text>
              </View>
            </View>
            <View className="p-3 rounded bg-ya-surface-high/50 border border-ya-surface-high">
              <Text className="font-body text-xs text-ya-text-muted">
                El dispositivo entrará en modo ahorro en breve. Recambio sugerido.
              </Text>
            </View>
          </View>

          <View className="bg-ya-surface-low rounded-xl border-l-4 border-ya-primary p-5 mb-8">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-ya-primary/10 items-center justify-center">
                  <CheckCircle2 color="#4dfd9d" size={20} />
                </View>
                <View>
                  <Text className="font-headline text-base font-bold text-white">Gateway OK</Text>
                  <Text className="font-body text-xs text-ya-text-muted">Sector 4</Text>
                </View>
              </View>
              <Text className="font-headline text-[10px] text-ya-text-muted uppercase">ONLINE</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}