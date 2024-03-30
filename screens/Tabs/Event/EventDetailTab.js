import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

export function EventDetailTab({route}) {
  const {item} = route.params;

  // Imagem padrão caso não seja fornicida alguma outra
  const imagem = item.imagem !== "" ?
    item.imagem: 'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg';

  return (
    <ScrollView style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Image source={{ uri: imagem }} style={styles.imagem} />
      <Text style={styles.descricao}>{item.descricao}</Text>
      <View style={styles.infoCard}>
        <Text style={styles.addressTitle}>Data do Evento:</Text>
        <Text style={styles.address}>{item.data}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.addressTitle}>Local do Evento:</Text>
        <Text style={styles.address}>{item.endereco}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.addressTitle}>Preço do ingresso:</Text>
        <Text style={styles.preco}>R$ {item.preco}</Text>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  titulo: {
    textAlign: 'center',
    fontSize: '3em',
    marginVertical: 10,
  },
  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 5,
  },
  infoCard: {
    width: '80%',
    maxWidth: 400,
    marginVertical: 10,
  },
  descricao: {
    width: "70",
    fontSize: '1.2em',
    textAlign: 'justify',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  addressTitle: {
    fontSize: '1.2em',
    color: 'gray',
  },
  address: {
    fontSize: '1.2em',
    fontStyle: 'italic',
  },
  preco: {
    fontSize: '1.2em',
    fontStyle: 'italic',
  },
});

