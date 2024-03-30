import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Routes from '../../assets/Routes';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator();
// Tabs
import { EventDetailTab } from '../Tabs/Event/EventDetailTab';
import { EventHotelTab } from '../Tabs/Event/EventHotelTab';
import { EventImagesTab } from '../Tabs/Event/EventImagesTab';

export function EventDetail({ route }) {
  const { item } = route.params;

  const [orientation, setOrientation] = useState(false);

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

  return (
    <View style={style.container}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={Routes.eventInformations}
          component={EventDetailTab}
          initialParams={{ item: item }}
        />
        <Tab.Screen
          name={Routes.eventImages}
          component={EventImagesTab}
          initialParams={{ item: item }}
        />
        <Tab.Screen
          name={Routes.eventHotel}
          component={EventHotelTab}
          initialParams={{ item: item }}
        />
      </Tab.Navigator>
      
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
