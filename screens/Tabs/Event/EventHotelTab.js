import { ScrollView, StyleSheet } from 'react-native';

import { HotelCard } from '../../../components/Hotel/HotelCard';

export function EventHotelTab({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <HotelCard item={item.hospedagem} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
});
