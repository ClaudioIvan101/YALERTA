/**
 * YAlerta Dark Map Style
 * Consistent dark theme for all MapView instances.
 */
export const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0a1120' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6b728a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a1120' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#1f293e' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#121a2c' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#162038' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0e1628' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#030712' }],
  },
];

/** Default region for the app (Mendoza, Argentina) */
export const DEFAULT_REGION = {
  latitude: -32.8895,
  longitude: -68.8458,
  latitudeDelta: 0.07,
  longitudeDelta: 0.06,
};
