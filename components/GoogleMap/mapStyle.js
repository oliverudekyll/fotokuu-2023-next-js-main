export const mapStyle = [
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ hue: '#000000' }, { lightness: -100 }, { visibility: 'off' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'on' }, { color: '#ffffff' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'on' }, { color: '#ffffff' }],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      { hue: '#ededed' },
      { saturation: -100 },
      { lightness: 36 },
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'all',
    stylers: [
      { hue: '#e0e0e0' },
      { saturation: -100 },
      { lightness: -8 },
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      { hue: '#000000' },
      { saturation: -100 },
      { lightness: -100 },
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      { hue: '#ff0000' },
      { saturation: -100 },
      { lightness: -100 },
      { visibility: 'simplified' },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      { hue: '#ff0000' },
      { saturation: -100 },
      { lightness: -100 },
      { visibility: 'off' },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ visibility: 'on' }, { color: '#beb7b7' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.stroke',
    stylers: [{ visibility: 'on' }, { color: '#2e2e2e' }, { weight: '1.00' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ hue: '#000000' }, { lightness: -100 }, { visibility: 'on' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ hue: '#000000' }, { lightness: -100 }, { visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      { hue: '#ff0000' },
      { saturation: -100 },
      { lightness: 100 },
      { visibility: 'on' },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ visibility: 'on' }, { color: '#ffffff' }],
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      { hue: '#ff0000' },
      { saturation: -100 },
      { lightness: -100 },
      { visibility: 'off' },
    ],
  },
]
