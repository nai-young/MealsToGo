import React from 'react';
import { Image, Platform, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import styled from 'styled-components';

const CompactImage = styled(Image)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled(View)`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const isAndroid = Platform.OS === 'android';
  const Image = isAndroid && isMap ? CompactWebview : CompactImage; // first render won't resolve images correctly

  const {
    name = 'Some restaurant',
    photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ],
  } = restaurant;

  return (
    <Item>
      <Image source={{ uri: photos[0] }} />
      <Text>{name}</Text>
    </Item>
  );
};
