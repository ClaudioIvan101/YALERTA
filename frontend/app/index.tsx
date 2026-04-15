import { Link } from 'expo-router';
import { Activity, Bell, Map } from 'lucide-react-native';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

export default function DashboardRoute() {
  return (
    <SafeAreaView className="flex-1 bg-[#07150F]">
      <View className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-emerald-500/15" />
      <View className="absolute bottom-32 -left-20 h-56 w-56 rounded-full bg-lime-400/10" />

      <View className="flex-1 px-5 pt-4">
        <View className="mb-6">
          <View className="mb-3 flex-row items-center gap-2">
            <View className="rounded-full bg-emerald-400/15 px-3 py-1">
              <Text className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Monitoreo activo
              </Text>
            </View>
            <Bell size={16} color="#A7F3D0" strokeWidth={2.25} />
          </View>

          <Text className="text-4xl font-black tracking-tight text-white">
            Y-Alerta
          </Text>
          <Text className="mt-1 text-base font-medium text-slate-300">
            Resistencia, Chaco
          </Text>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 rounded-3xl border border-emerald-400/15 bg-white/6 p-4">
            <View className="mb-4 flex-row items-center justify-between">
              <View className="rounded-2xl bg-emerald-400/15 p-2.5">
                <Activity size={18} color="#86EFAC" strokeWidth={2.25} />
              </View>
              <Text className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/80">
                En verde
              </Text>
            </View>

            <Text className="text-sm font-medium text-emerald-100/80">
              Animales en Predio
            </Text>
            <Text className="mt-1 text-4xl font-black tracking-tight text-white">
              0
            </Text>
          </View>

          <View className="flex-1 rounded-3xl border border-rose-400/15 bg-white/6 p-4">
            <View className="mb-4 flex-row items-center justify-between">
              <View className="rounded-2xl bg-rose-400/15 p-2.5">
                <Bell size={18} color="#FDA4AF" strokeWidth={2.25} />
              </View>
              <Text className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-200/80">
                Atención
              </Text>
            </View>

            <Text className="text-sm font-medium text-rose-100/80">
              Alertas de Movimiento
            </Text>
            <Text className="mt-1 text-4xl font-black tracking-tight text-white">
              0
            </Text>
          </View>
        </View>

        <View className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
          <View className="flex-row items-center gap-3">
            <View className="rounded-2xl bg-sky-400/15 p-3">
              <Map size={20} color="#7DD3FC" strokeWidth={2.25} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-white">
                Capa de monitoreo en tiempo real
              </Text>
              <Text className="mt-1 text-sm leading-5 text-slate-300">
                Visualizá el estado del rodeo y los eventos de movimiento en un mapa vivo.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="absolute bottom-6 left-5">
        <Link href="/map" asChild>
          <Pressable className="flex-row items-center gap-2 rounded-2xl bg-emerald-400 px-5 py-4 shadow-2xl shadow-emerald-400/30 active:opacity-90">
            <Map size={18} color="#052E16" strokeWidth={2.4} />
            <Text className="text-base font-extrabold text-emerald-950">
              Ver Mapa en Vivo
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
