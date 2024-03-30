import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirebaseRoutes from '../../../assets/FirebaseRoutes';
import { ImageCard } from '../../../components/gallary/ImageCard';
import app from '../../../assets/Firebase';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';

export function GallaryPhotosTab ({navigation}){

  const [gallary, setGallary] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(()=>{
    getPhotos();
  }, []);

  // Orientation
  const [horizontal, setHorizontal] = useState(false);
  useEffect(()=>{
    const onChange = ({window: {width, height}}) => {
      setHorizontal(width > height ? true : false);
    }
  
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    }
  }, []);

  async function getPhotos (){
    try {
      const firebaseStorage = getStorage(app);
      const photosRef = ref(firebaseStorage);
      const listResult = await listAll(photosRef);
      const photoUrls = await Promise.all(listResult.items.map((item) => getDownloadURL(item)));
      setGallary(photoUrls);
    } catch (error) {
      console.log(error.message);
    }
  }

  function removeFoto (photo){
      let update = [];
      update = [... gallary];
      if (update.indexOf(photo) > 0){
        update.splice(update.indexOf(photo), 1)
      }else {
        update.shift();
      }
      setGallary(update);
      setStatus('removendo...');

      fetch(`${FirebaseRoutes.mainURL}${FirebaseRoutes.gallary}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
        })
        .then(res => {
          setStatus("Foto removida");
          setTimeout(() => {
            setStatus('');
          }, 1000);
        })
        .catch(error => console.log(error.message));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha galeria</Text>
      {status !== '' && <Text>{status}</Text>}
      { gallary === null ?
          <Text>Galeria Vazia</Text>
          :
          <FlatList
            contentContainerStyle={styles.list}
            data={gallary}
            keyExtractor={(item, index) => index.toString()}
            horizontal={horizontal}
            renderItem={ ({item}) => {
              return <ImageCard image={item} removeFoto={removeFoto} />
            } }
          />
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  title: {
    fontSize: '2em',
    textAlign: 'center',
    marginVertical: 5,
  },
  list: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});