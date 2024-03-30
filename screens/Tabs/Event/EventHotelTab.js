import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

export function EventHotelTab({ route }) {
  const { item } = route.params;
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
      <Text style={style.titulo}>{item.hospedagem.hotel}</Text>
      <Image source={{uri: item.hospedagem.imagem}} style={style.imagem} />
      <View style={style.card}>
        <Text style={style.paragraph}>Endereco: {item.hospedagem.endereco}</Text>
        <Text style={style.paragraph}>Diaria: R${item.hospedagem.diaria}</Text>
        <Text style={style.paragraph}>Detalhes: {item.hospedagem.informacoes}</Text>
      </View>
    </View>
  );
}

const styleVertical = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  imagem: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  card: {
    width: '70%',
    height: 200,
  },
  paragraph: {
    fontSize: 18,
    marginVertical: 10,
  }
});

const styleHorizontal = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  }
});
