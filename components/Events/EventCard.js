import { Pressable, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import Routes from '../../assets/Routes';

export function EventCard({ item, navigation }) {
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
    <Pressable
      style={style.card}
      onPress={() => {
        navigation.navigate(Routes.eventDetails, {item: item});
      }}>
      <Text style={style.titulo}>{item.titulo}</Text>
      <Image source={{ uri: item.imagem }} style={style.imagem} />
      <Text style={style.preco}>R${item.preco}</Text>
    </Pressable>
  );
}

const styleVertical = StyleSheet.create({
  card: {
    width: 250,
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 5,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 20,
  },
  imagem: {
    width: '90%',
    height: 100,
    marginVertical: 5,
  },
  preco: {
    flexDirection: 'row',
    flexWrap: 'wrrap',
    fontSize: 16,
    marginVertical: 10,
  },
});

const styleHorizontal = StyleSheet.create({
  card: {
    width: '100%',
    borderWidth: 1,
  },
});
