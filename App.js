import React from 'react';
import { StatusBar, Text } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { RestaurantsScreen } from './src/features/restaurants/screens/restaurants.screen';
import { RestaurantsContextProvider } from './src/services/restaurants/mock/restaurants.context';
import { theme } from './src/infrastructure/theme';
import { useFonts, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { Lato_400Regular } from '@expo-google-fonts/lato';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeArea } from './src/components/utility/safe-area.component';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Settings: 'md-settings',
};

const tabBarIcon =
  (iconName) =>
  ({ size, color }) =>
    <Ionicons name={iconName} size={size} color={color} />;

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: tabBarIcon(iconName),
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  };
};

const Setting = () => (
  <SafeArea>
    <Text>Setting Tab</Text>
  </SafeArea>
);
const Map = () => (
  <SafeArea>
    <Text>Map Tab</Text>
  </SafeArea>
);

export default function App() {
  let [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Lato_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsContextProvider>
          <NavigationContainer>
            <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name='Restaurants' component={RestaurantsScreen} />
              <Tab.Screen name='Map' component={Setting} />
              <Tab.Screen name='Settings' component={Map} />
            </Tab.Navigator>
          </NavigationContainer>
        </RestaurantsContextProvider>
      </ThemeProvider>
    </>
  );
}
