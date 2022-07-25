import React, { useContext } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { RestaurantCard } from '../../restaurants/components/restaurant-card.component';

const isAndroid = Platform.OS === 'android';

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const FavouritesList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  ${isAndroid
    ? `margin-bottom: ${({ theme: { space } }) => space[4]};`
    : `margin-bottom: ${({ theme: { space } }) => space[2]};`};
`;

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
  const { isLoading, error } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);

  if (!favourites.length) {
    return (
      <NoFavouritesArea>
        <Text>No favourites</Text>
      </NoFavouritesArea>
    );
  }

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
        <FavouritesList
          data={favourites}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => onPressRestaurantCard(item)}>
                <Spacer position='bottom' size='large'>
                  <RestaurantCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};
