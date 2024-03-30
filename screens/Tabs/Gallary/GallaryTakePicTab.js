import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, FlatList, StyleSheet, Platform } from 'react-native';
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
  const [status, setStatus] = useState('');

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
    }
  };

  if (hasPermission === false) {
    return <Text>Acesso a camera negado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera</Text>
      <Camera 
        style={styles.cameraView}
        type={type}
        ref={ref => setCamera(ref)}
      />
      <Pressable style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Tirar foto</Text>
        <Icon name='camera-retro' size={20} color={'white'} />
      </Pressable>
      <View style={styles.gallary}>
        <Text style={styles.title}>Fotos {status}</Text>
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imageGallery} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  cameraView: {
    flex: 1,
    width: '100%',
    height: 100,
    borderWidth: 2,
    borderColor: '#556b2f',
    resizeMode: 'contain',
  },
  lastPic: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  gallary: {
    width: '100%',
    height: 450,
  },
  imageGallery: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  ...Platform.select({
    android: {
      button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#556b2f',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
    ios: {
      button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#191970',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    },
    web: {
      button: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#800020',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    }
  })
});