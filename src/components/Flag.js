import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function FlagCard({ name, region, flag }) {
  return (
    <View style={s.card}>
      <Image source={{ uri: flag }} style={s.flag} />
      <View style={{ flex: 1 }}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.region}>{region || '—'}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  flag: { width: 64, height: 42, borderRadius: 6, backgroundColor: '#eee' },
  name: { fontSize: 16, fontWeight: '600' },
  region: { color: '#666' },
});
