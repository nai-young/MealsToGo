import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RestaurantsNavigator } from './restaurants.navigator';
import { MapScreen } from '../../features/map/screens/map.screen';
import { FavouritesContextProvider } from '../../services/favourites/favourites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurants/mock/restaurants.context';
import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import { SettingsNavigator } from './settings.navigator';

export const AppNavigator = () => {
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
      headerShown: false
    };
  };

  return (
    // load specific context on app navigator
    // on logout is cleared
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
            <Tab.Screen name='Map' component={MapScreen}/>
            <Tab.Screen name='Settings' component={SettingsNavigator} />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};
