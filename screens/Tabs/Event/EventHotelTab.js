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
        <View style={style.infoCard}>
          <Text style={style.infoTextTitle}>Endereco do Hotel:</Text>
          <Text style={style.infoText}>{item.hospedagem.endereco}</Text>
        </View>
        <View style={style.infoCard}>
          <Text style={style.infoTextTitle}>Diaria do Hotel:</Text>
          <Text style={style.infoText}>R${item.hospedagem.diaria}</Text>
        </View>
        <View style={style.infoCard}>
          <Text style={style.infoTextTitle}>Detalhes:</Text>
          <Text style={style.infoText}>{item.hospedagem.informacoes}</Text>
        </View>
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
  infoCard: {
    width: '80%',
    marginVertical: 10,
  },
  infoTextTitle: {
    fontSize: 16,
    color: 'gray',
  },
  infoText: {
    fontSize: 18,
    fontStyle: 'italic',
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
