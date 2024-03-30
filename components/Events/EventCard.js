import { Pressable, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Routes from '../../assets/Routes';

export function EventCard({ item, navigation }) {

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate(Routes.eventDetails, {item: item});
      }}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} />
      <View style={styles.infosContent}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.preco}>R${item.preco}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 250,
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    padding: 15,
    marginVertical: 40,
    marginHorizontal: 20,
    elevation: 10, 
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  imagem: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  infosContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  preco: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  }
});
