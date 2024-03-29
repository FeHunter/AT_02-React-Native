import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function SearchBar({ getSearchTerm, clearTerm, getPickerFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectFilter, setSelectFilter] = useState('Sem Filtro');
  function setTerm(term) {
    getSearchTerm(term);
    setPickerFilter(selectFilter);
  }

  function setPickerFilter(term) {
    getPickerFilter(term);
  }

  function clearTermFunc() {
    clearTerm();
    setSearchTerm('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="digite..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Picker
        style={styles.selecter}
        selectedValue={selectFilter}
        onValueChange={(value) => setSelectFilter(value)}>
        <Picker.Item label="Sem Filtro" value="Sem Filtro" />
        <Picker.Item label="A - Z" value="Ordem Crescente" />
        <Picker.Item label="Z - A" value="Ordem Decrescente" />
        <Picker.Item label="Maior Preço" value="Maior Preço" />
        <Picker.Item label="Menor Preço" value="Menor Preço" />
      </Picker>
      {searchTerm.length > 0 ? (
        <Pressable
          onPress={() => {
            clearTermFunc();
          }}>
          <Icon name="eraser" size={30} color={'black'} />
        </Pressable>
      ) : null}
      <Pressable
        onPress={() => {
          setTerm(searchTerm);
        }}>
        <Icon name="search" size={30} color={'black'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    padding: 2,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    fontSize: 18,
  },
  selecter: {
    width: 100,
    height: '100%',
  },
});
