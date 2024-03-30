import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useEffect, useState } from 'react';

import { EventCard } from '../../components/Events/EventCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';

export function Events({ navigation }) {

  const urlAPi = "https://eventos-at02-react-native-default-rtdb.firebaseio.com/";
  const sourceEvents = "Events";

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pickerFilter, setpickerFilter] = useState('');
  const [orientation, setOrientation] = useState(false);

  useEffect(() => {

    loadEvents();

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

  async function loadEvents (){
    setIsLoading(true);
    await fetch(`${urlAPi}${sourceEvents}.json`)
    .then(res => res.json())
    .then(res => {
      setEvents(res);
    })
    .catch(error => { console.log(error.message) })
    .finally(res => setIsLoading(false));
  }

  function getSearchTerm(term) {
    setSearchTerm(term);
  }

  function clearSearchTerm() {
    setSearchTerm('');
  }

  function getPickerFilter(term) {
    setpickerFilter(term);
  }

  function filter() {
    let updateList = [...events];
    // Pesquisa por nome ou descrição
    updateList = updateList.filter((events) => {
      return (
        events.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        events.descricao
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
    // Ordem conforme o picker selection
    if (pickerFilter === 'Ordem Crescente') {
      updateList.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (pickerFilter === 'Ordem Decrescente') {
      updateList.sort((a, b) => b.titulo.localeCompare(a.titulo));
    } else if (pickerFilter === 'Maior Preço') {
      updateList.sort((a, b) => b.preco - a.preco);
    } else if (pickerFilter === 'Menor Preço') {
      updateList.sort((a, b) => a.preco - b.preco);
    }
    return (
      <FlatList
        contentContainerStyle={style.list}
        data={updateList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <EventCard item={item} navigation={navigation} />;
        }}
        horizontal={orientation}
      />
    );
  }

  const style = orientation ? styleHorizontal : styleVertical;

  const ViewList =
    events.length > 0 &&
    searchTerm.length === 0 &&
    pickerFilter === 'Sem Filtro' ? (
      <FlatList
        contentContainerStyle={style.list}
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <EventCard item={item} navigation={navigation} />;
        }}
      />
    ) : (
      filter()
    );
  return (
    <View style={style.container}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <>
          <SearchBar
            getSearchTerm={getSearchTerm}
            getPickerFilter={getPickerFilter}
            clearTerm={clearSearchTerm}
          />
          {ViewList}
        </>
      )}
    </View>
  );
}

const styleVertical = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  list: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});

const styleHorizontal = StyleSheet.create({});
