import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebaseRoutes from '../../../assets/FirebaseRoutes';
import app from '../../../assets/Firebase';
import { getStorage, ref, uploadString } from 'firebase/storage';

export function GallaryTakePicTab() {

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('---');

  useEffect(() => {
    getPhotos();

    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  };

  // Enviar foto para storage do firebase
  async function savePhoto (photo){
    try {
      const firebaseStorage = getStorage(app);
      const photoRef = ref(firebaseStorage, `Gallary Pictures ${new Date().getTime()}.png`);
      await uploadString(photoRef, photo, "data_url");
      setStatus("Foto salva");
      setTimeout(() => {
        setStatus("---");
      }, 1000);
    }catch (error){
      console.log(error.message);
    }
  }

  async function getPhotos (){
    try {
      const firebaseStorage = getStorage(firebase);
      const photsRef = ref(firebaseStorage);
      const list = await listAll(photsRef);
      setPhotos(list);
      console.log(list);
    }catch(error){
      console.log(error.message);
    }
  }

  const takePicture = async () => {
    if (camera) {
      const picture = await camera.takePictureAsync();
      setPhotoUri(picture.uri);
      setPhotos(prevPhotos => [...prevPhotos, picture.uri]);
      savePhoto(picture.uri);
      setStatus("Salvando foto...");
    }
  };

  if (hasPermission === false) {
    return <Text>Acesso a camera negado</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.cameraView}
        type={type}
        ref={ref => setCamera(ref)}
      />
      <Pressable style={styles.button} onPress={takePicture}>
        <Icon name='camera-retro' size={50} color={'white'} />
      </Pressable>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: "100%",
    alignItems: 'center',
  },
  cameraView: {
    width: windowWidth * 1,
    height: windowWidth * 0.3 * (8 / 16), // Mantém a proporção 16:8
    resizeMode: 'contain',
  },
  status: {
    fontSize: 18,
    padding: 5,
    color: 'gray',
  },
  button: {
    width: '100%',
    height: "10%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }
});