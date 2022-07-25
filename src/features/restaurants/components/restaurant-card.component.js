import React from 'react';
import { SvgXml } from 'react-native-svg';
import star from '../../../../assets/star';
import open from '../../../../assets/open';
import close from '../../../../assets/close';
import * as S from './restaurant-card.styles';
import { Favourite } from '../../../components/favourites/favourite.component';

export const RestaurantCard = ({ restaurant = {} }) => {
  const {
    name = 'Some restaurant',
    icon,
    photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ],
    address = '100 Some Address',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = false,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.ceil(rating)));

  return (
    <S.StyledRestaurantCard elevation={2}>
      <Favourite restaurant={restaurant}/>
      <S.RestaurantCover key={name} source={{ uri: photos[0] }} />
      <S.Info>
        <S.Title>{name}</S.Title>
        <S.Section>
          <S.Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </S.Rating>
          <S.SectionEnd>
            {isOpenNow && !isClosedTemporarily ? (
              <SvgXml xml={open} width={30} height={30} />
            ) : (
              !isOpenNow &&
              !isClosedTemporarily && (
                <SvgXml xml={close} width={30} height={30} />
              )
            )}
            {isClosedTemporarily && (
              <S.ClosedTemporarily>CLOSED TEMPORARILY</S.ClosedTemporarily>
            )}
          </S.SectionEnd>
        </S.Section>
        <S.Address>{address}</S.Address>
      </S.Info>
    </S.StyledRestaurantCard>
  );
};
