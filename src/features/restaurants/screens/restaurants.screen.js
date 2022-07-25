import React, { useContext, useState } from 'react';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantCard } from '../components/restaurant-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import styled from 'styled-components';
import { Platform, FlatList, TouchableOpacity } from 'react-native';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { LocationContext } from '../../../services/location/location.context';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Search } from '../../../components/search/search.component';
import { FavouritesBar } from '../../../components/favourites/favourites-bar.component';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { FadeInView } from '../../../components/animations/fade.animation';
import { Text } from '../../../components/typography/text.component';

const isAndroid = Platform.OS === 'android';

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  ${isAndroid
    ? `margin-bottom: ${({ theme: { space } }) => space[4]};`
    : `margin-bottom: ${({ theme: { space } }) => space[2]};`};
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { error: locationError } = useContext(LocationContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  const onPressRestaurantCard = (item) => {
    navigation.navigate('RestaurantDetail', { restaurant: item });
  };

  return (
    <SafeArea>
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <>
          <Search
            isFavouritesToggled={isToggled}
            onFavouritesToggle={() => setIsToggled(!isToggled)}
          />
          {isToggled && (
            <FavouritesBar
              favourites={favourites}
              onNavigate={navigation.navigate}
            />
          )}
          {!!error || !!locationError ? (
            <Spacer position='left' size='xl'>
              <Text variant='error'>
                Something went wrong retrieving the data
              </Text>
            </Spacer>
          ) : (
            <FadeInView>
              <RestaurantList
                data={restaurants}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => onPressRestaurantCard(item)}
                    >
                      <Spacer position='bottom' size='large'>
                        <RestaurantCard restaurant={item} />
                      </Spacer>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.name}
              />
            </FadeInView>
          )}
        </>
      )}
    </SafeArea>
  );
};
