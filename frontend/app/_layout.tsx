import { Stack } from "expo-router";
import { View } from "react-native";
// Importamos el CSS global para que Tailwind (NativeWind) funcione en toda la app
import "../global.css";

export default function RootLayout() {
  return (
    // El Slot o Stack es el contenedor de tus pantallas (index, map, etc.)
    <Stack
      screenOptions={{
        // Escondemos el header gris feo que trae Android por defecto
        headerShown: false,
        // Fondo por defecto para evitar destellos blancos al navegar
        contentStyle: { backgroundColor: "#f8fafc" }, 
        animation: "fade_from_bottom", // Animación suave nivel Senior
      }}
    >
      {/* Definimos las rutas principales si queremos configurar algo específico */}
      <Stack.Screen name="index" />
      <Stack.Screen name="map" />
    </Stack>
  );
}