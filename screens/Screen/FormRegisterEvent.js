import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Dimensions,
  StyleSheet,
  Picker,
  ActivityIndicator
} from 'react-native';
import { useEffect, useState } from 'react';

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
  const [eventImage, setEventImage] = useState('');
  // Form Hotel
  const [hotelName, setHotelName] = useState('');
  const [hotelPrice, setHotelPrice] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [hotelDetails, setHotelDetails] = useState('');
  const [hotelImage, setHotelImage] = useState('');

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
    .catch(error => { console.log(error.message) });
  }

  function submitEvent (){
    // Validação
    if (
      title.length < 3 ||
      description.length < 3 ||
      address.length < 3 ||
      hotelAddress.length < 3 ||
      hotelName.length < 3 ||
      hotelDetails.length < 3
    ) {
      setStatus("Preencher campos corretamente");
      setTimeout(() => {
        setStatus("-");
      }, 2000);
      return;
    }
    const event = {
      data: `${dateDay}/${dateMonth}/${dateYear}`,
      titulo: title,
      descricao: description,
      endereco: address,
      preco: price,
      imagem: eventImage,
      hospedagem: {
        diaria: hotelPrice,
        endereco: hotelAddress,
        hotel: hotelName,
        informacoes: hotelDetails,
        imagem: hotelImage,
      }
    }
    console.log(event);
    // Salva na API
    saveEvent(event);
  }

  async function saveEvent (eventData) {
    setStatus("Cadastrando evento");
    setIsLoading(true);
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
      setIsLoading(false);
      setTimeout(() => {
        setStatus("-");
      }, 2000);
    })
    .catch(error => {
      setStatus(`Error: ${error.message}`);
      console.log(error.message);
    })
  }

  // Data
  const [dateDay, setDateDay] = useState(1);
  const [dateMonth, setDateMonth] = useState(1);
  const [dateYear, setDateYear] = useState(2024);
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
    <ScrollView style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Evento</Text>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Informações do Evento</Text>
          <View style={styles.textCard}>
            <Text style={styles.text}>Nome:</Text>
            <TextInput onChangeText={setTitle} placeholder="digite..." style={styles.input} />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.text}>Descrição:</Text>
            <TextInput
              onChangeText={setDescription}
              placeholder="digite..."
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.text}>Local Endereço:</Text>
            <TextInput
              onChangeText={setAddress}
              placeholder="digite..."
              multiline
              numberOfLines={2}
              style={styles.input}
            />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.text} keyboardType="decimal-pad">Preço:</Text>
            <TextInput
              onChangeText={setPrice}
              placeholder="R$"
              style={styles.input}
            />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.text}>Imagem URL:</Text>
            <TextInput
              onChangeText={setEventImage}
              placeholder="digite..."
              style={styles.input}
            />
          </View>
          <View style={styles.textCard}>
          <View style={styles.dataSelectCard}>
            <Text style={styles.text}>Dia:</Text>
              <Picker
                style={{ width: 50 }}
                selectedValue={dateDay}
                onValueChange={setDateDay}>
                {days.map((item, index) => (
                  <Picker.Item key={'picker_day_' + index} {...item} />
                ))}
              </Picker>
            </View>
            <View style={styles.dataSelectCard}>
              <Text style={styles.text}>Mês:</Text>
              <Picker
                style={{ width: 50 }}
                selectedValue={dateMonth}
                onValueChange={setDateMonth}>
                {months.map((item, index) => (
                  <Picker.Item key={'picker_month_' + index} {...item} />
                ))}
              </Picker>
            </View>
            <View style={styles.dataSelectCard}>
              <Text style={styles.text}>Ano:</Text>
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
        <View style={styles.form}>
          <Text style={styles.formTitle}>Informações Sobre hospedagem</Text>
          <View style={styles.textCard}>
            <Text style={styles.text}>Nome:</Text>
            <TextInput
              onChangeText={setHotelName}
              placeholder="digite..."
              style={styles.input}
            />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.text}>Endereço Hotel:</Text>
            <TextInput
              onChangeText={setHotelAddress}
              placeholder="digite..."
              multiline
              numberOfLines={2}
              style={styles.input}
            />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.text}>Detalhes Hotel:</Text>
            <TextInput
              onChangeText={setHotelDetails}
              placeholder="digite..."
              multiline
              numberOfLines={2}
              style={styles.input}
            />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.text}>Imagem URL:</Text>
            <TextInput
              onChangeText={setHotelImage}
              placeholder="digite..."
              style={styles.input}
            />
          </View>
          <View style={styles.textCard}>
            <Text style={styles.text} keyboardType="decimal-pad">Preço da Diaria:</Text>
            <TextInput
              onChangeText={setHotelPrice}
              placeholder="R$"
              style={styles.input}
            />
          </View>
        </View>
        <Text style={styles.statusMessage}>{status}</Text>
        {isLoading ? <ActivityIndicator size={30} color="blue" /> : <Text></Text> }
        <Pressable onPress={submitEvent}><Text style={styles.registerButton}>Cadastra Evento</Text></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: '2em', 
  },
  form: {
    width: '95%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  formTitle: {
    fontSize: '1.2m', 
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  textCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 2,
    marginVertical: 10,
  },
  text: {
    fontSize: '1.2m',
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
    fontSize: '1.3m',
  },
  dataSelectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  statusMessage: {
    fontSize: '1m',
    fontStyle: 'italic',
    color: 'gray',
  }
});


