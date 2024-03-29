import { Text, SafeAreaView, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './assets/Routes';

// Drawer
import { About } from './screens/Drawer/About';
import { Events } from './screens/Drawer/Events';
import { Gallary } from './screens/Drawer/Gallary';
import { RegisterEvent } from './screens/Drawer/RegisterEvent';

// Screens
import { EventDetail } from './screens/Screen/EventDetail';


export default function App() {

  const DrawerNav = () => {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator>
        <Drawer.Screen name={Routes.about} component={About} />
        <Drawer.Screen name={Routes.events} component={StackNav} />
        <Drawer.Screen name={Routes.registerEvent} component={RegisterEvent} />
        <Drawer.Screen name={Routes.gallaryAuth} component={Gallary} />
      </Drawer.Navigator>
    );
  }

  const StackNav = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator
        initialRouteName={Routes.eventsList}
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {height: 30}
          }}
        >
        <Stack.Screen name={Routes.eventsList} component={Events} />
        <Stack.Screen name={Routes.eventDetails} component={EventDetail} />
      </Stack.Navigator>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <DrawerNav/>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
