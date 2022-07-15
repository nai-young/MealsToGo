import React, { useContext } from 'react';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantCard } from '../components/restaurant-card.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components';
import { View, Platform, FlatList } from 'react-native';
import { RestaurantsContext } from '../../../services/restaurants/mock/restaurants.context';
import { ActivityIndicator, Colors } from 'react-native-paper';

const isAndroid = Platform.OS === 'android';

const SearchContainer = styled(View)`
  padding: 10px;
`;

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

export const RestaurantsScreen = () => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  return (
    <SafeArea>
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <>
          <SearchContainer>
            <Searchbar />
          </SearchContainer>
          <RestaurantList
            data={restaurants}
            renderItem={({ item }) => {
              return (
                <Spacer position='bottom' size='large'>
                  <RestaurantCard restaurant={item} />
                </Spacer>
              );
            }}
            keyExtractor={(item) => item.name}
          />
        </>
      )}
    </SafeArea>
  );
};
