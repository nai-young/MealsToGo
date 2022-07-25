import camelize from 'camelize';
import { host, isMock } from '../../utils/env';

export const restaurantsRequest = (location = '37.7749295,-122.4194155') => {
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
    (res) => {
      return res.json();
    }
  );
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(mappedResults);
};

//restaurantsRequest().then(restaurantsTransform).catch(restaurantsTransform);
