import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const INITIAL_REGION = {
  latitude: -27.46056,
  longitude: -58.98389,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const CATTLE_MARKERS = [
  {
    id: 'cattle-1',
    title: 'Vaca 01',
    description: 'OK',
    pinColor: '#22C55E',
    coordinate: {
      latitude: -27.4569,
      longitude: -58.9892,
    },
  },
  {
    id: 'cattle-2',
    title: 'Vaca 02',
    description: 'OK',
    pinColor: '#22C55E',
    coordinate: {
      latitude: -27.4638,
      longitude: -58.9806,
    },
  },
  {
    id: 'cattle-3',
    title: 'Vaca 03',
    description: 'Fuera de Perímetro',
    pinColor: '#EF4444',
    coordinate: {
      latitude: -27.4682,
      longitude: -58.9759,
    },
  },
  {
    id: 'cattle-4',
    title: 'Vaca 04',
    description: 'Fuera de Perímetro',
    pinColor: '#EF4444',
    coordinate: {
      latitude: -27.4528,
      longitude: -58.9948,
    },
  },
];

export default function MapRoute() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {CATTLE_MARKERS.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
          />
        ))}
      </MapView>

      <View style={styles.topBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06110B',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    position: 'absolute',
    top: 52,
    right: 16,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: 'rgba(6, 17, 11, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
