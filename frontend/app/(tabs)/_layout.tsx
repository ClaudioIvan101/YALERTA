import { Tabs } from 'expo-router';
import { FloatingTabBar } from '@/src/components/layout';
import { Colors } from '@/src/constants';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: Colors.surface },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="rodeo" options={{ title: 'Rodeo' }} />
      <Tabs.Screen name="alertas" options={{ title: 'Alertas' }} />
      <Tabs.Screen name="estadisticas" options={{ title: 'Estadisticas' }} />
      <Tabs.Screen name="configuracion" options={{ title: 'Configuracion' }} />
    </Tabs>
  );
}