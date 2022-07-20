import React, { useContext, useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components';
import { Search } from '../components/search.component';
import { RestaurantsContext } from '../../../services/restaurants/mock/restaurants.context';
import { LocationContext } from '../../../services/location/location.context';
import { MapCallout } from '../components/map-callout.component';

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
const Map = styled(MapView)`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

export const MapScreen = ({ navigation }) => {
  const { restaurants = [] } = useContext(RestaurantsContext);
  const { location } = useContext(LocationContext);
  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <Container>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02, // default
        }}
      >
        {restaurants.map((restaurant, i) => {
          return (
            <MapView.Marker
              key={`restaurant-${restaurant.place_id}-${i}`}
              coordinate={{
                longitude: restaurant.geometry.location.lng,
                latitude: restaurant.geometry.location.lat,
              }}
            >
              <MapView.Callout
                onPress={() =>
                  navigation.navigate('RestaurantDetail', { restaurant })
                }
              >
                <View>
                  <MapCallout restaurant={restaurant} />
                </View>
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </Container>
  );
};
