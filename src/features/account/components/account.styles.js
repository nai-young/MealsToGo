import { Text, View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../../infrastructure/theme/colors';
import { Button, TextInput } from 'react-native-paper';

export const AccountBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/home_bg.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

// opacity layer
export const AccountCover = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${({ theme: { space } }) => space[4]};
  margin-top: ${({ theme: { space } }) => space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${({ theme: { space } }) => space[2]};
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title = styled(Text)`
  font-size: 30px;
  font-family: ${({ theme: { fonts } }) => fonts.body};
`;

export const ErrorContainer = styled(View)`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${({ theme: { space } }) => space[2]};
  margin-bottom: ${({ theme: { space } }) => space[2]};
`;

export const AnimationWrapper = styled(View)`
  width: 100%;
  height: 30%;
  position: absolute;
  top: 30px;
  padding: ${({ theme: { space } }) => space[1]};
`;
