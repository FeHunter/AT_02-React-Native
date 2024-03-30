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
import { getAssetByID } from 'react-native-web/dist/cjs/modules/AssetRegistry';

export function FormRegisterEvent() {

  const urlAPi = "https://eventos-at02-react-native-default-rtdb.firebaseio.com/";
  const sourceEvents = "Events";

  const [orientation, setOrientation] = useState(false);
  const [status, setStatus] = useState('-');
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Form Event
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  // Form Hotel
  const [hotelName, setHotelName] = useState('');
  const [hotelPrice, setHotelPrice] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [hotelDetails, setHotelDetails] = useState('');

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
  });

  async function loadEvents (){
    await fetch(`${urlAPi}${sourceEvents}.json`)
    .then(res => res.json())
    .then(res => {
      setEvents(res);
    })
    .catch(error => { console.log(error.message) })
    .finally(res => setIsLoading(false));
  }

  function submitEvent (){
    // Validação
    // if(title.length < 3 || description.length < 3 || address.length < 3 || hotelAddress.length < 3 || hotelName.length < 3 || hotelDetails.length < 3){
    //   setStatus("Preencher campos corretamente");
    //   setTimeout(() => {
    //     setStatus("-");
    //   }, 2000);
    //   return;
    // }
    const convertedDate = convertDateToTimestamp(`${dateDay}/${dateMonth}/${dateYear}`);
    const event = {
      data: parseInt(convertedDate),
      titulo: title,
      descricao: description,
      endereco: address,
      preco: price,
      hospedagem: {
        diaria: hotelPrice,
        endereco: hotelAddress,
        hotel: hotelName,
        informacoes: hotelDetails,
      }
    }
    console.log(event);
    // Salva na API
    saveEvent(event);
  }

  async function saveEvent (eventData) {
    let upt = [...events];
    upt.push(eventData);
    upt = JSON.stringify(upt);
    await fetch(`${urlAPi}${sourceEvents}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: upt
    })
    .then(res => {
      setStatus("Enviado com sucesso!");
      setTimeout(() => {
        setStatus("-");
      }, 2000);
    })
    .catch(error => {
      setStatus("Algo deu errado, tente novamente");
      console.log(error.message);
    })
  }

  function convertDateToTimestamp(dateString) {
    const reversedDateString = dateString.split('/').reverse().join('/');
    const timestamp = Date.parse(reversedDateString);
    return timestamp;
  }

  const style = orientation ? styleHorizontal : styleVertical;

  // Data
  const [dateDay, setDateDay] = useState();
  const [dateMonth, setDateMonth] = useState();
  const [dateYear, setDateYear] = useState();
  const days = [];
  const months = [];
  const years = [];

  for (let i = 1; i <= 31; i++) {
    days.push({ value: i, label: i });
  }
  for (let i = 1; i <= 12; i++) {
    months.push({ value: i, label: i });
  }
  for (let i = 2024; i <= 2030; i++) {
    years.push({ value: i, label: i });
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Cadastro de Evento</Text>
      <View style={style.form}>
        <Text style={style.formTitle}>Informações do Evento</Text>
        <View style={style.textCard}>
          <Text style={style.text}>Nome:</Text>
          <TextInput onChangeText={setTitle} placeholder="digite..." style={style.input} />
        </View>
        <View style={style.textCard}>
          <Text style={style.text}>Descrição:</Text>
          <TextInput
            onChangeText={setDescription}
            placeholder="digite..."
            multiline
            numberOfLines={3}
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
          <Text style={style.text}>Local Endereço:</Text>
          <TextInput
            onChangeText={setAddress}
            placeholder="digite..."
            multiline
            numberOfLines={2}
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
          <Text style={style.text} keyboardType="decimal-pad">Preço:</Text>
          <TextInput
            onChangeText={setPrice}
            placeholder="R$"
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
        <View style={style.dataSelectCard}>
          <Text style={style.text}>Dia:</Text>
            <Picker
              style={{ width: 50 }}
              selectedValue={dateDay}
              onValueChange={setDateDay}>
              {days.map((item, index) => (
                <Picker.Item key={'picker_day_' + index} {...item} />
              ))}
            </Picker>
          </View>
          <View style={style.dataSelectCard}>
            <Text style={style.text}>Mês:</Text>
            <Picker
              style={{ width: 50 }}
              selectedValue={dateMonth}
              onValueChange={setDateMonth}>
              {months.map((item, index) => (
                <Picker.Item key={'picker_month_' + index} {...item} />
              ))}
            </Picker>
          </View>
          <View style={style.dataSelectCard}>
            <Text style={style.text}>Ano:</Text>
            <Picker
              style={{ width: 80 }}
              selectedValue={dateYear}
              onValueChange={setDateYear}>
              {years.map((item, index) => (
                <Picker.Item key={'picker_year_' + index} {...item} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <View style={style.form}>
        <Text style={style.formTitle}>Informações Sobre hospedagem</Text>
        <View style={style.textCard}>
          <Text style={style.text}>Nome:</Text>
          <TextInput
            onChangeText={setHotelName}
            placeholder="digite..."
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
          <Text style={style.text}>Endereço Hotel:</Text>
          <TextInput
            onChangeText={setHotelAddress}
            placeholder="digite..."
            multiline
            numberOfLines={2}
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
          <Text style={style.text}>Detalhes Hotel:</Text>
          <TextInput
            onChangeText={setHotelDetails}
            placeholder="digite..."
            multiline
            numberOfLines={2}
            style={style.input}
          />
        </View>
        <View style={style.textCard}>
          <Text style={style.text} keyboardType="decimal-pad">Preço da Diaria:</Text>
          <TextInput
            onChangeText={setHotelPrice}
            placeholder="R$"
            style={style.input}
          />
        </View>
      </View>
      <Text style={style.statusMessage}>{status}</Text>
      <Pressable onPress={submitEvent}><Text style={style.registerButton}>Cadastra Evento</Text></Pressable>
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
    width: 100,
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
