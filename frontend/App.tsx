import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// Si esta línea tira error de rojo, avisame y la comentamos por ahora
import { Activity, MapPin, ShieldAlert } from 'lucide-react-native';

export default function App() {
  return (
    <View className="flex-1 bg-slate-50 px-6 pt-16">
      
      {/* Header Premium */}
      <View className="mb-8">
        <Text className="text-4xl font-extrabold text-slate-800 tracking-tight">Y-Alerta</Text>
        <Text className="text-lg text-slate-500 font-medium mt-1">Monitoreo de Rodeo en Vivo</Text>
      </View>

      {/* Contenedor de Tarjetas */}
      <View className="flex-row justify-between mb-6">
        
        {/* Tarjeta de Animales Activos */}
        <View className="bg-white p-5 rounded-3xl shadow-sm flex-1 mr-3 border border-slate-200">
          <View className="flex-row items-center mb-3">
            <View className="bg-emerald-100 p-2 rounded-full">
              <Activity size={20} color="#10b981" />
            </View>
            <Text className="text-sm text-slate-500 ml-2 font-bold">ACTIVOS</Text>
          </View>
          <Text className="text-4xl font-black text-slate-800">248</Text>
        </View>

        {/* Tarjeta de Alertas */}
        <View className="bg-white p-5 rounded-3xl shadow-sm flex-1 ml-3 border border-red-100">
          <View className="flex-row items-center mb-3">
            <View className="bg-red-100 p-2 rounded-full">
              <ShieldAlert size={20} color="#ef4444" />
            </View>
            <Text className="text-sm text-red-500 ml-2 font-bold">ALERTAS</Text>
          </View>
          <Text className="text-4xl font-black text-red-600">2</Text>
        </View>

      </View>

      {/* Botón Flotante (Ideal para pulgar izquierdo) */}
      <TouchableOpacity 
        className="absolute bottom-12 left-6 bg-blue-600 px-7 py-4 rounded-full flex-row items-center shadow-lg"
        activeOpacity={0.8}
      >
        <MapPin size={24} color="white" />
        <Text className="text-white font-bold text-lg ml-3">Ver Mapa</Text>
      </TouchableOpacity>

    </View>
  );
}