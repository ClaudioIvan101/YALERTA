import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Y-Alerta: Estado del Rodeo</Text>

          <View style={styles.cardsRow}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Total Animales</Text>
              <Text style={styles.cardValue}>0</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Alertas Activas</Text>
              <Text style={styles.cardValue}>0</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomAction}>
          <Pressable style={styles.mapButton}>
            <Text style={styles.mapButtonText}>Ver Mapa en Vivo</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7F2',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: 'space-between',
  },
  header: {
    color: '#163020',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: 22,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D7E6D8',
    shadowColor: '#0A1A10',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardLabel: {
    color: '#3C5B4B',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardValue: {
    color: '#0E2217',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  bottomAction: {
    alignItems: 'flex-start',
  },
  mapButton: {
    backgroundColor: '#1F6B45',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 210,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});