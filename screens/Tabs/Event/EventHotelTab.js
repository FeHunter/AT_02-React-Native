import { View, StyleSheet } from 'react-native';

import { HotelCard } from '../../../components/Hotel/HotelCard';

export function EventHotelTab({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <HotelCard item={item.hospedagem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
