import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Sensors, Wifi, Pets, GridView, Notifications, Leaderboard, Settings, BatteryLow, Thermometer } from 'lucide-react-native';

export default function DashboardSat() {
  return (
    <View className="flex-1 bg-ya-surface">
      
      {/* Header Premium */}
      <View className="h-16 border-b border-ya-surface-low px-6 flex-row justify-between items-center mt-8">
        <View className="flex-row items-center gap-2">
          <Text className="text-ya-primary font-bold text-2xl tracking-tighter">YAlerta</Text>
        </View>
        <Wifi size={20} color="#a6aabf" />
      </View>

      {/* Main Content: Simulación de Mapa con Imagen */}
      <View className="flex-1 relative">
        <View className="absolute inset-0 opacity-40 bg-slate-900">
          {/* Acá después va el componente <MapView /> que hicimos */}
        </View>

        {/* Metrics Status Bar (Flotante arriba) */}
        <View className="absolute top-4 self-center w-[92%] bg-ya-surface-high/60 p-1 rounded-xl flex-row gap-1 border border-white/5">
          <MetricCard label="TOTAL" value="20" color="text-ya-primary" />
          <MetricCard label="POTRERO" value="18" color="text-white" />
          <MetricCard label="FUERA" value="2" color="text-ya-error" />
          <MetricCard label="BATERÍA" value="1" color="text-ya-tertiary" />
        </View>

        {/* Info Card: Toro Negro (Diseño Stitch) */}
        <View className="absolute top-1/3 left-10 bg-ya-surface-low/95 p-4 rounded-2xl w-64 border border-ya-primary/20 shadow-2xl">
          <View className="flex-row justify-between items-start mb-3">
            <View>
              <Text className="text-white font-bold text-lg">Toro Negro</Text>
              <Text className="text-ya-text-muted text-[10px]">ID: #TN-9842</Text>
            </View>
            <View className="bg-ya-error/20 px-2 py-1 rounded">
              <Text className="text-ya-error text-[10px] font-bold">ALERTA</Text>
            </View>
          </View>
          
          <View className="flex-row gap-2 mb-4">
             <View className="flex-1 bg-ya-surface-high p-2 rounded-lg">
                <Text className="text-[8px] text-ya-text-muted uppercase">Batería</Text>
                <Text className="text-white font-bold text-sm">87%</Text>
             </View>
             <View className="flex-1 bg-ya-surface-high p-2 rounded-lg">
                <Text className="text-[8px] text-ya-text-muted uppercase">Temp</Text>
                <Text className="text-ya-tertiary font-bold text-sm">38.6°C</Text>
             </View>
          </View>

          <TouchableOpacity 
            className="bg-ya-primary py-2 rounded-lg items-center"
            onPress={() => router.push('/map')}
          >
            <Text className="text-ya-surface font-bold text-xs uppercase tracking-widest">Localizar Ahora</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation (Optimización ZURDO) */}
      <View className="h-24 bg-ya-surface/80 border-t border-ya-surface-low flex-row justify-around items-center pb-6">
        <NavIcon icon={<GridView size={22} color="#4dfd9d" />} label="Dashboard" active />
        <NavIcon icon={<Pets size={22} color="#a6aabf" />} label="Rodeo" />
        <NavIcon icon={<Notifications size={22} color="#a6aabf" />} label="Alertas" />
        <NavIcon icon={<Settings size={22} color="#a6aabf" />} label="Ajustes" />
      </View>
    </View>
  );
}

// Sub-componentes para limpiar el código
const MetricCard = ({ label, value, color }: any) => (
  <View className="flex-1 items-center py-2 bg-ya-surface-low/40 rounded-lg">
    <Text className="text-[8px] text-ya-text-muted font-bold">{label}</Text>
    <Text className={`${color} text-lg font-bold`}>{value}</Text>
  </View>
);

const NavIcon = ({ icon, label, active = false }: any) => (
  <TouchableOpacity className={`items-center p-2 rounded-xl ${active ? 'bg-ya-primary/10' : ''}`}>
    {icon}
    <Text className={`text-[10px] mt-1 ${active ? 'text-ya-primary' : 'text-ya-text-muted'}`}>{label}</Text>
  </TouchableOpacity>
);