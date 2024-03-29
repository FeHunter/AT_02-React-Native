import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../../assets/Routes';

// Screens
import { GallaryScreen } from '../Screen/GallaryScreen';
import { Authentication } from '../Screen/Authentication';

export function Gallary({ navigation }) {
  const Stack = createStackNavigator();

  const [orientation, setOrientation] = useState(false);
  const [auth, setAuth] = useState(true);

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
  
  // Verificar autenticação
  const rotaInicial = auth ? Routes.gallary : Routes.authentication;

  return (
    <View style={style.container}>
      <Stack.Navigator
        initialRouteName={rotaInicial}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Routes.gallary} component={GallaryScreen} />
        <Stack.Screen name={Routes.authentication} component={Authentication} />
      </Stack.Navigator>
    </View>
  );
}

const styleVertical = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

const styleHorizontal = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
