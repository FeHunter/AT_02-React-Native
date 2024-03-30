import { View, Text, Image, StyleSheet } from 'react-native';

export function EventDetailTab({route}) {
  const {item} = route.params;

  // Imagem padrão caso não seja fornicida alguma outra
  const imagem = item.imagem !== "" ?
    item.imagem: 'https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg';

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10, // Adicionando padding horizontal para melhor visualização
  },
  titulo: {
    textAlign: 'center',
    fontSize: 26,
  },
  imagem: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  infoCard: {
    width: '80%',
    maxWidth: 400,
  },
  descricao: {
    width: '80%',
    fontSize: 18,
    marginHorizontal: 5,
  },
  addressTitle: {
    fontSize: 16,
    color: 'gray',
  },
  address: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  preco: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

