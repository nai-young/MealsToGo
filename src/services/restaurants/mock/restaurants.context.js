import React, { useState, useEffect, useMemo, createContext } from 'react';
import {
  restaurantsRequest,
  restaurantsTransform,
} from './restaurants.service';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveRestaurants = () => {
    setIsLoading(true);
    setTimeout(() => {
      restaurantsRequest()
        .then(restaurantsTransform)
        .then((response) => {
          setIsLoading(false);
          setRestaurants(response);
        })
        .catch((e) => {
          setIsLoading(false)
          setError(e)
        });
    }, 1500);
  };

  useEffect(() => {
    retrieveRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
