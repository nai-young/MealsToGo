import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { LocationContext } from '../../services/location/location.context';

const SearchContainer = styled(View)`
  padding: ${({ theme: { space } }) => space[3]};
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    // set local keyword when restaurant/map upadates
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder='Search for a location'
        icon={isFavouritesToggled ? 'heart' : 'heart-outline'}
        onIconPress={onFavouritesToggle}
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={setSearchKeyword}
      />
    </SearchContainer>
  );
};
