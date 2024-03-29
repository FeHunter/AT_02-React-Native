import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from '../../assets/Routes';
import { useEffect, useState } from 'react';

// Screens
import { FormRegisterEvent } from '../Screen/FormRegisterEvent';
import { Authentication } from '../Screen/Authentication';

export function RegisterEvent() {
  const Stack = createStackNavigator();
  const [auth, setAuth] = useState(true);

  // Verificar autenticação
  const rotaInicial = auth ? Routes.registerEventForm : Routes.authentication;

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <Stack.Navigator
        initialRouteName={rotaInicial}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Routes.registerEventForm} component={FormRegisterEvent} />
        <Stack.Screen name={Routes.authentication} component={Authentication} />
      </Stack.Navigator>
    </View>
  );
}
