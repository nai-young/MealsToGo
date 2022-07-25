import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RestaurantsNavigator } from './restaurants.navigator';
import { MapScreen } from '../../features/map/screens/map.screen';
import { SettingsNavigator } from './settings.navigator';

import { FavouritesContextProvider } from '../../services/favourites/favourites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
import { CartContextProvider } from '../../services/cart/cart.context';
import { CheckoutNavigator } from './checkout.navigator';
import { colors } from '../theme/colors';

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  const TAB_ICON = {
    Restaurants: 'md-restaurant',
    Checkout: 'md-cart',
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
      tabBarActiveTintColor: colors.brand.primary,
      tabBarInactiveTintColor: colors.brand.muted,
      headerShown: false,
    };
  };

  return (
    // load specific context on app navigator
    // on logout is cleared
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <CartContextProvider>
            <Tab.Navigator screenOptions={screenOptions}>
              <Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
              <Tab.Screen name='Checkout' component={CheckoutNavigator} />
              <Tab.Screen name='Map' component={MapScreen} />
              <Tab.Screen name='Settings' component={SettingsNavigator} />
            </Tab.Navigator>
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};
