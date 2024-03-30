import {View, Text, Image, StyleSheet} from 'react-native';

export function HotelCard ({item}){
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{item.hotel}</Text>
            <Image source={{uri: item.imagem}} style={styles.imagem} />
            <View style={styles.card}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoTextTitle}>Endereco do Hotel:</Text>
                    <Text style={styles.infoText}>{item.endereco}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoTextTitle}>Diaria do Hotel:</Text>
                    <Text style={styles.infoText}>R${item.diaria}</Text>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoTextTitle}>Detalhes:</Text>
                    <Text style={styles.infoText}>{item.informacoes}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      aspectRatio: 7/2,
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
  