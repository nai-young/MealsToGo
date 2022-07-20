import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { LocationContext } from '../../../services/location/location.context';

const SearchContainer = styled(View)`
  padding: ${({ theme: { space } }) => space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder='Search for a location'
        icon='map'
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={setSearchKeyword}
      />
    </SearchContainer>
  );
};
