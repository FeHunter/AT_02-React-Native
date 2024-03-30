import { Pressable, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Routes from '../../assets/Routes';
import { useState } from 'react';

export function EventCard({ item, navigation }) {

  const [isLoading, setIsLoading] = useState(true);

  // Imagem padrão caso não seja fornicida alguma outra
  const imagem = item.imagem !== "" ?
    item.imagem: 'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg';

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigation.navigate(Routes.eventDetails, {item: item});
      }}>
      <Image source={{ uri: imagem }} style={styles.imagem} onLoad={()=>{setIsLoading(false)}} />
      {isLoading ? <ActivityIndicator size={20} color={"blue"} /> : <Text></Text>}
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
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  preco: {
    fontSize: '1.2em',
    fontStyle: 'italic',
    color: 'gray',
  }
});
