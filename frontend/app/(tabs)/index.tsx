import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Region } from 'react-native-maps';
import { Bell, ChevronRight, Wifi, Navigation, MapPin } from 'lucide-react-native';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { Colors } from '@/src/constants';
import { darkMapStyle, DEFAULT_REGION } from '@/src/constants';
import { GlowingDot } from '@/src/components/ui';
import { MOCK_CATTLE_MAP } from '@/src/data';
import { AnimalMarker } from '@/src/components/map/AnimalMarker';

export default function IndexScreen() {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation for the user marker
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      
      // Center map on cattle initially instead of user, so the user sees the points
      if (mapRef.current && MOCK_CATTLE_MAP.length > 0) {
        mapRef.current.animateToRegion({
          latitude: MOCK_CATTLE_MAP[0].latitude,
          longitude: MOCK_CATTLE_MAP[0].longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }, 1000);
      }

      // Track location updates
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
          timeInterval: 5000,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    })();
  }, []);

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const centerOnCattle = () => {
    if (mapRef.current && MOCK_CATTLE_MAP.length > 0) {
      mapRef.current.animateToRegion({
        latitude: MOCK_CATTLE_MAP[0].latitude,
        longitude: MOCK_CATTLE_MAP[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  };
  const CowIcon = ({ size, color }: { size: number; color: string }) => (
    <Image 
      source={require('@/assets/images/cow_icon.png')} 
      style={{ width: size, height: size, tintColor: color }} 
      contentFit="contain"
    />
  );

  return (
    <View className="flex-1 bg-ya-surface">
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={darkMapStyle}
        initialRegion={DEFAULT_REGION}
        showsCompass={false}
        onPress={() => setSelectedAnimalId(null)}
      >
        {MOCK_CATTLE_MAP.map((cow) => (
          <Marker
            key={cow.id}
            coordinate={{
              latitude: cow.latitude,
              longitude: cow.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={(e) => {
              e.stopPropagation();
              setSelectedAnimalId(cow.id);
            }}
          >
            <AnimalMarker status={cow.status} selected={selectedAnimalId === cow.id} />
          </Marker>
        ))}

        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            title="Mi Ubicación"
          >
            <View className="items-center justify-center">
              <Animated.View
                style={{
                  position: 'absolute',
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: 'rgba(56, 189, 248, 0.25)',
                  transform: [{ scale: pulseAnim }],
                }}
              />
              <View className="w-6 h-6 rounded-full bg-sky-400/40 items-center justify-center">
                <View className="w-3.5 h-3.5 rounded-full bg-sky-400 border-[1.5px] border-white shadow-sm" />
              </View>
            </View>
          </Marker>
        )}
      </MapView>

      <SafeAreaView className="absolute inset-x-0 top-0 px-4 pt-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center">
              <CowIcon size={20} color={Colors.primary} />
            </View>
            <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-2xl font-bold tracking-tighter">
              YAlerta
            </Text>
          </View>
          <View className="flex-row items-center gap-4">
            <Wifi size={24} color={Colors.textSecondary} />
          </View>
        </View>
      </SafeAreaView>

      {(() => {
        const selectedAnimal = MOCK_CATTLE_MAP.find(c => c.id === selectedAnimalId);
        if (!selectedAnimal) return null;
        
        return (
          <View className="absolute top-[40%] left-[5%] right-[5%] z-50">
            <View className="rounded-xl bg-[#242b43]/95 overflow-hidden border border-ya-primary/30 p-5 shadow-2xl backdrop-blur-xl">
              <View className="flex-row items-start justify-between mb-4">
                <View>
                  <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-xl font-bold">{selectedAnimal.name}</Text>
                  <Text className="text-ya-text-muted text-xs font-medium mt-1">ID: #{selectedAnimal.id.toUpperCase()}</Text>
                </View>
                {selectedAnimal.status === 'warning' ? (
                  <View className="rounded bg-ya-error/20 px-2 py-1 border border-ya-error/30">
                    <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-error text-[10px] font-bold uppercase">ALERTA</Text>
                  </View>
                ) : (
                  <View className="rounded bg-ya-primary/20 px-2 py-1 border border-ya-primary/30">
                    <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-primary text-[10px] font-bold uppercase">NORMAL</Text>
                  </View>
                )}
              </View>
              <View className="flex-row gap-3 mb-2">
                <View className="flex-1 bg-ya-surface-high rounded-xl p-3 border border-ya-outline-variant/30">
                  <Text style={{ fontFamily: 'Space Grotesk' }} className="text-[10px] uppercase text-ya-text-muted tracking-wider">Batería</Text>
                  <Text style={{ fontFamily: 'Space Grotesk' }} className={selectedAnimal.battery < 40 ? "text-lg font-bold text-ya-error mt-1" : "text-lg font-bold text-white mt-1"}>
                    {selectedAnimal.battery}%
                  </Text>
                </View>
                <View className="flex-1 bg-ya-surface-high rounded-xl p-3 border border-ya-outline-variant/30">
                  <Text style={{ fontFamily: 'Space Grotesk' }} className="text-[10px] uppercase text-ya-text-muted tracking-wider">Último Dato</Text>
                  <Text style={{ fontFamily: 'Space Grotesk' }} className="text-lg font-bold text-ya-tertiary mt-1">
                    {selectedAnimal.lastUpdate}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity className="mt-3 bg-ya-primary/10 border border-ya-primary/30 rounded-lg py-3 items-center justify-center">
                <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-primary font-bold text-sm">Ver Historial</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })()}

      <View className="absolute inset-x-0 bottom-20 rounded-t-[24px] bg-ya-surface-low/95 overflow-hidden border-t border-ya-outline-variant/30 px-6 pt-3 pb-8 shadow-2xl">
        <View className="items-center mb-5">
          <View className="h-1 w-12 rounded-full bg-ya-outline-variant/50" />
        </View>
        <View className="flex-row items-center justify-between mb-4">
          <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white text-xl font-bold tracking-tight">Rodeo Activo</Text>
          <View className="rounded-full bg-ya-primary/10 px-3 py-1">
            <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-primary text-xs font-medium">20 Animales</Text>
          </View>
        </View>

        <View className="rounded-xl bg-ya-surface-high/40 overflow-hidden border border-ya-outline-variant/30 p-1 flex-row items-center justify-between gap-1 mb-5">
          <StatItem label="Total" value="20" color={Colors.primary} bg="bg-ya-surface-high/80" />
          <StatItem label="En Potrero" value="18" color="#cfd7f2" bg="bg-transparent" />
          <StatItem label="Fuera" value="2" color={Colors.error} bg="bg-transparent" />
          <StatItem label="Batería Baja" value="1" color={Colors.tertiary} bg="bg-transparent" />
        </View>

        <View className="rounded-xl border-l-4 border-l-ya-error bg-ya-surface-high/50 p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#1e253b]">
              <CowIcon size={20} color={Colors.textSecondary} />
            </View>
            <View>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white font-bold">Vaquillona #402</Text>
              <Text className="text-ya-error text-xs font-medium mt-0.5">Fuera de Potrero</Text>
            </View>
          </View>
          <ChevronRight size={20} color={Colors.textSecondary} />
        </View>

        <View className="rounded-xl border-l-4 border-l-ya-primary bg-ya-surface-high/50 p-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#1e253b]">
              <CowIcon size={20} color={Colors.textSecondary} />
            </View>
            <View>
              <Text style={{ fontFamily: 'Space Grotesk' }} className="text-white font-bold">Novillo Brangus</Text>
              <Text className="text-ya-text-muted text-xs font-medium mt-0.5">En Potrero</Text>
            </View>
          </View>
          <ChevronRight size={20} color={Colors.textSecondary} />
        </View>
      </View>

      {/* Recenter Buttons */}
      <View className="absolute right-4 bottom-[350px] gap-4">
        <TouchableOpacity 
          onPress={centerOnCattle}
          className="w-12 h-12 rounded-full bg-ya-surface-high/90 overflow-hidden border border-ya-primary/30 items-center justify-center shadow-2xl backdrop-blur-md"
        >
          <MapPin size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={centerOnUser}
          className="w-12 h-12 rounded-full bg-ya-surface-high/90 overflow-hidden border border-ya-outline-variant/30 items-center justify-center shadow-2xl backdrop-blur-md"
        >
          <Navigation size={22} color={location ? Colors.textSecondary : Colors.textSecondary} style={location ? { transform: [{ rotate: '45deg' }, { translateX: -2 }, { translateY: 2 }] } : undefined} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

type StatItemProps = {
  label: string;
  value: string;
  color: string;
  bg?: string;
};

function StatItem({ label, value, color, bg = 'bg-transparent' }: StatItemProps) {
  return (
    <View className={`flex-1 items-center px-2 py-3 rounded-lg ${bg}`}>
      <Text style={{ fontFamily: 'Space Grotesk' }} className="text-ya-text-muted text-[10px] uppercase tracking-widest font-medium mb-1">
        {label}
      </Text>
      <Text style={{ fontFamily: 'Space Grotesk', color }} className="font-bold text-xl">
        {value}
      </Text>
    </View>
  );
}