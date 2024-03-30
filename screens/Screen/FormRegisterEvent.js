import {
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  Picker,
} from 'react-native';
import { useEffect, useState } from 'react';

export function FormRegisterEvent() {
  const [orientation, setOrientation] = useState(false);
  const [selectFilter, setSelectFilter] = useState('Sem Filtro');
  const [status, setStatus] = useState('Enviado com sucesso!');

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

  // Data
  const [dateDay, setDateDay] = useState('1');
  const days = [];
  const months = [];
  const years = [];

  for (let i = 1; i <= 31; i++) {
    days.push({ value: i, label: i });
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Cadastro de Evento</Text>
      <View style={style.form}>
        <Text style={style.formTitle}>Informações do Evento</Text>
        <View style={style.textCard}>
          <Text style={style.text}>Nome:</Text>
          <TextInput placeholder="digite..." style={style.input} />
        </View>
        <View style={style.textCard}>
          <Text style={style.text}>Descrição:</Text>
          <TextInput
            placeholder="digite..."
            multiline
            numberOfLines={3}
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
          <Text style={style.text}>Local Endereço:</Text>
          <TextInput
            placeholder="digite..."
            multiline
            numberOfLines={2}
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
          <Text style={style.text} keyboardType="decimal-pad">Preço:</Text>
          <TextInput placeholder="R$" style={style.input} />
        </View>
        <View style={style.textCard}>
          <View style={style.dataSelectCard}>
            <Text style={style.text}>Data:</Text>
            <Picker
              style={{ width: 50 }}
              selectedValue={dateDay}
              onValueChange={setDateDay}>
              {days.map((item, index) => {
                <Picker.Item key={'picker_day_' + index} {...item} />;
              })}
            </Picker>
          </View>
          <View style={style.dataSelectCard}>
            <Text style={style.text}>Mês:</Text>
            <Picker
              style={{ width: 50 }}
              selectedValue={dateDay}
              onValueChange={setDateDay}>
              {days.map((item, index) => {
                <Picker.Item key={'picker_day_' + index} {...item} />;
              })}
            </Picker>
          </View>
          <View style={style.dataSelectCard}>
            <Text style={style.text}>Ano:</Text>
            <Picker
              style={{ width: 50 }}
              selectedValue={dateDay}
              onValueChange={setDateDay}>
              {days.map((item, index) => {
                <Picker.Item key={'picker_day_' + index} {...item} />;
              })}
            </Picker>
          </View>
        </View>
      </View>
      <View style={style.form}>
        <Text style={style.formTitle}>Informações Sobre hospedagem</Text>
        <View style={style.textCard}>
          <Text style={style.text}>Nome:</Text>
          <TextInput placeholder="digite..." style={style.input} />
        </View>
        <View style={style.textCard}>
          <Text style={style.text}>Endereço Hotel:</Text>
          <TextInput
            placeholder="digite..."
            multiline
            numberOfLines={2}
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
          <Text style={style.text} keyboardType="decimal-pad">Preço da Diaria:</Text>
          <TextInput placeholder="R$" style={style.input} />
        </View>
      </View>
      <Text style={style.statusMessage}>{status}</Text>
      <Pressable><Text style={style.registerButton}>Cadastra Evento</Text></Pressable>
    </View>
  );
}

const styleVertical = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
  },
  title: {
    fontSize: 20,
  },
  form: {
    width: '95%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  formTitle: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  textCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: 'auto',
    padding: 2,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    padding: 1,
  },
  registerButton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 10,
    fontSize: 18,
  },
  dataSelectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90,
  },
  statusMessage: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
  }
});

const styleHorizontal = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
