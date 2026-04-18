import React, { useMemo, useState } from 'react';
import {
  ListRenderItemInfo,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import MapView, { Marker, Polygon } from 'react-native-maps';
import {
  ArrowLeft,
  Eraser,
  PlusCircle,
  Radio,
  Save,
  Trash2,
  VectorSquare,
  Wifi,
} from 'lucide-react-native';

type ToolItem = {
  id: string;
  icon: 'polyline' | 'add' | 'erase' | 'delete';
  active?: boolean;
};

const TOOLS: ToolItem[] = [
  { id: 'polyline', icon: 'polyline', active: true },
  { id: 'add', icon: 'add' },
  { id: 'erase', icon: 'erase' },
  { id: 'delete', icon: 'delete' },
];

const VERTICES = [
  { latitude: -34.6035, longitude: -58.3816 },
  { latitude: -34.6032, longitude: -58.3797 },
  { latitude: -34.6045, longitude: -58.3788 },
  { latitude: -34.6052, longitude: -58.3804 },
  { latitude: -34.6044, longitude: -58.3822 },
];

function iconForTool(tool: ToolItem['icon'], active: boolean) {
  const color = active ? '#4dfd9d' : '#a6aabf';

  if (tool === 'polyline') {
    return <VectorSquare size={18} color={color} />;
  }
  if (tool === 'add') {
    return <PlusCircle size={18} color={color} />;
  }
  if (tool === 'erase') {
    return <Eraser size={18} color={color} />;
  }
  return <Trash2 size={18} color={active ? '#ff716c' : color} />;
}

export default function GeofenceEditorScreen() {
  const [paddockName, setPaddockName] = useState('Paddock Norte');
  const [alertOnExit, setAlertOnExit] = useState(true);
  const [alertOnEntry, setAlertOnEntry] = useState(false);

  const statsData = useMemo(
    () => [
      { id: 'area', label: 'Area Total', value: '14.2', suffix: 'HA' },
      { id: 'vertices', label: 'Vertices', value: '05', suffix: '' },
    ],
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-ya-surface" edges={['top']}>
      <View className="flex-1">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -34.6042,
            longitude: -58.3806,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Polygon
            coordinates={VERTICES}
            strokeColor="#4dfd9d"
            fillColor="rgba(77,253,157,0.2)"
            strokeWidth={2}
          />

          {VERTICES.map((vertex, index) => (
            <Marker key={`vertex-${index}`} coordinate={vertex}>
              <View className="h-3 w-3 rounded-full border-2 border-ya-surface bg-ya-primary" />
            </Marker>
          ))}
        </MapView>

        <View className="absolute inset-0 px-4 pb-36 pt-2">
          <View className="mb-3 flex-row items-center justify-between border-b border-ya-surface-low bg-ya-surface/85 px-2 pb-3">
            <View className="flex-row items-center gap-2">
              <Pressable
                className="h-9 w-9 items-center justify-center rounded-full border border-ya-surface-high bg-ya-surface-low"
                onPress={() => router.back()}
              >
                <ArrowLeft size={16} color="#4dfd9d" />
              </Pressable>
              <Text className="text-ya-primary text-2xl font-headline font-bold">YAlerta</Text>
            </View>
            <View className="flex-row gap-2">
              <View className="h-9 w-9 items-center justify-center rounded-full border border-ya-surface-high bg-ya-surface-low">
                <Wifi size={15} color="#4dfd9d" />
              </View>
              <View className="h-9 w-9 items-center justify-center rounded-full border border-ya-surface-high bg-ya-surface-low">
                <Radio size={15} color="#4dfd9d" />
              </View>
            </View>
          </View>

          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 rounded-xl border border-ya-surface-high bg-ya-surface/90 p-4">
              <Text className="mb-2 text-[10px] uppercase tracking-widest text-ya-text-muted">Identidad del Potrero</Text>
              <TextInput
                value={paddockName}
                onChangeText={setPaddockName}
                className="rounded-md border border-ya-surface-high bg-ya-surface-low px-3 py-3 text-white font-headline"
                placeholderTextColor="#a6aabf"
              />

              <View className="mt-4 gap-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-ya-text-muted">Alertar al Salir</Text>
                  <Switch
                    trackColor={{ false: '#181f33', true: '#12dd81' }}
                    thumbColor="#090e1c"
                    value={alertOnExit}
                    onValueChange={setAlertOnExit}
                  />
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-ya-text-muted">Alertar al Entrar</Text>
                  <Switch
                    trackColor={{ false: '#181f33', true: '#12dd81' }}
                    thumbColor="#090e1c"
                    value={alertOnEntry}
                    onValueChange={setAlertOnEntry}
                  />
                </View>
              </View>
            </View>

            <View className="gap-2">
              {TOOLS.map((item) => {
                const active = !!item.active;
                return (
                  <Pressable
                    key={item.id}
                    className={`h-12 w-12 items-center justify-center rounded-lg border border-ya-surface-high ${active ? 'bg-ya-primary/15' : 'bg-ya-surface/90'}`}
                  >
                    {iconForTool(item.icon, active)}
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="flex-1" />

          <View className="gap-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
            >
              {statsData.map((item) => (
                <View key={item.id} className="rounded-xl border border-ya-surface-high bg-ya-surface/90 px-4 py-3">
                  <Text className="text-[10px] uppercase tracking-widest text-ya-text-muted">{item.label}</Text>
                  <View className="mt-1 flex-row items-end gap-1">
                    <Text className="text-3xl font-headline font-bold text-ya-primary">{item.value}</Text>
                    {item.suffix ? <Text className="text-xs text-ya-text-muted">{item.suffix}</Text> : null}
                  </View>
                </View>
              ))}
            </ScrollView>

            <Pressable className="flex-row items-center justify-center gap-2 rounded-md bg-ya-primary py-4" onPress={() => router.back()}>
              <Save size={16} color="#090e1c" />
              <Text className="text-ya-surface text-xs uppercase font-headline font-bold">Guardar Potrero</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}