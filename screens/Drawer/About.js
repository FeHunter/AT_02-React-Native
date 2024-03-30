import { Text, View, StyleSheet, ScrollView } from 'react-native';

export function About (){
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Event Finder</Text>
      <Text style={styles.description}>
        Nosso aplicativo de eventos oferece a você acesso direto aos melhores eventos da região. Explore uma variedade de eventos culturais, esportivos e de entretenimento com apenas alguns toques. Além disso, fornecemos informações detalhadas sobre hotéis próximos para facilitar a sua hospedagem durante o evento. Com nossa interface intuitiva e recursos abrangentes, encontrar e planejar sua experiência em eventos nunca foi tão fácil.
      </Text>
      <Text style={styles.footerText}>AT_02 - Events. Felipe Rodrigues</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
  },
  footerText: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 10,
  },
});
