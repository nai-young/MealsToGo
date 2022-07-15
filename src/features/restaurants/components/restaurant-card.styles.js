import styled from 'styled-components';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';

export const Title = styled(Text)`
  color: ${({ theme: { colors } }) => colors.ui.primary};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.body};
`;

export const StyledRestaurantCard = styled(Card)`
  background-color: ${({ theme: { colors } }) => colors.bg.primary};
`;

export const RestaurantCover = styled(Card.Cover)`
  padding: ${({ theme: { space } }) => space[3]};
  background-color: ${({ theme: { colors } }) => colors.bg.primary};
`;

export const Info = styled(View)`
  padding: ${({ theme: { space } }) => space[2]}
    ${({ theme: { space } }) => space[3]};
`;

export const Address = styled(Text)`
  font-family: ${({ theme: { fonts } }) => fonts.body};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.caption};
`;

export const Rating = styled(View)`
  flex-direction: row;
  padding: ${({ theme: { space } }) => space[2]} 0;
`;

export const Section = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SectionEnd = styled(View)`
`;

export const ClosedTemporarily = styled(Text)`
  color: ${({ theme: { colors } }) => colors.text.error};
`;