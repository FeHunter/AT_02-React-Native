import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

export function EventDetailTab({route}) {
  const {item} = route.params;
  const [orientation, setOrientation] = useState(false);

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
  });

  const style = orientation ? styleHorizontal : styleVertical;

  return (
    <View style={style.container}>
      <Text style={style.titulo}>{item.titulo}</Text>
      <Image source={{ uri: item.imagem }} style={style.imagem} />
      <Text style={style.descricao}>{item.descricao}</Text>
      <View>
        <Text style={style.addressTitle}>Local do Evento:</Text>
        <Text style={style.address}>{item.endereco}</Text>
      </View>
      <Text style={style.preco}>R$ {item.preco}</Text>
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
    width: '90%',
    height: 200,
    resizeMode: 'contain',
  },
  descricao: {
    fontSize: 20,
    marginHorizontal: 10,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 18,
    fontStyle: 'italic',
  },
});
