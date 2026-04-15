import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Settings2 } from 'lucide-react-native';

export default function ConfiguracionScreen() {
  return (
    <SafeAreaView className="flex-1 bg-ya-surface">
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-14 w-14 rounded-2xl bg-ya-primary/15 items-center justify-center border border-ya-primary/40">
          <Settings2 size={24} color="#4dfd9d" />
        </View>
        <Text className="mt-5 text-white text-2xl font-bold">Configuracion</Text>
        <Text className="mt-2 text-ya-text-muted text-center">Preferencias de app, alertas y dispositivos.</Text>
      </View>
    </SafeAreaView>
  );
}