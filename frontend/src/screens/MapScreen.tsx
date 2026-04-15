import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type MapScreenProps = {
  onBackPress?: () => void;
};

const INITIAL_REGION = {
  latitude: -27.46056,
  longitude: -58.98389,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen({ onBackPress }: MapScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        <Marker coordinate={INITIAL_REGION} title="Centro de prueba" />
      </MapView>

      {onBackPress ? (
        <Pressable style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 54,
    left: 16,
    backgroundColor: 'rgba(22, 48, 32, 0.92)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});