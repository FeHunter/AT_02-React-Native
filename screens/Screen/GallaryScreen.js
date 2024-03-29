import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import Routes from '../../assets/Routes';
const Tab = createBottomTabNavigator();

// Tabs
import { GallaryPhotosTab } from '../Tabs/Gallary/GallaryPhotosTab';
import { GallaryTakePicTab } from '../Tabs/Gallary/GallaryTakePicTab';

export function GallaryScreen({ navigation }) {
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
        <Tab.Screen name={Routes.gallaryPhotos} component={GallaryPhotosTab} />
        <Tab.Screen
          name={Routes.gallaryTakePicture}
          component={GallaryTakePicTab}
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
