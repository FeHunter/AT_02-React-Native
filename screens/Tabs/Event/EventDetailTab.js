import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

export function EventDetailTab({route}) {
  const {item} = route.params;
  const [orientation, setOrientation] = useState(false);

  const data = new Date(item.data * 1000).toLocaleDateString();

  useEffect(() => {
    // Orientação
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? true : false);
    };
    Dimensions.addEventListener('change', updateOrientation);
    return () => {
      Dimensions.removeEventListener('change', updateOrientation);
    };
  }, []);

  const style = orientation ? styleHorizontal : styleVertical;

  return (
    <View style={style.container}>
      <Text style={style.titulo}>{item.titulo}</Text>
      <Image source={{ uri: item.imagem }} style={style.imagem} />
      <Text style={style.descricao}>{item.descricao}</Text>
      <View style={style.infoCard}>
        <Text style={style.addressTitle}>Data do Evento:</Text>
        <Text style={style.address}>{data}</Text>
      </View>
      <View style={style.infoCard}>
        <Text style={style.addressTitle}>Local do Evento:</Text>
        <Text style={style.address}>{item.endereco}</Text>
      </View>
      <View style={style.infoCard}>
        <Text style={style.addressTitle}>Preço do ingresso:</Text>
        <Text style={style.preco}>R$ {item.preco}</Text>
      </View>
    </View>
  );
}

const styleVertical = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
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
