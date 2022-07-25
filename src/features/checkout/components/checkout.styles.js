import styled from 'styled-components';
import { View } from 'react-native';
import { Avatar, TextInput, Button } from 'react-native-paper';
import { colors } from '../../../infrastructure/theme/colors';
import { ActivityIndicator, Colors } from 'react-native-paper';

export const CartIconContainer = styled(View)`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
  margin: ${({ theme: { space } }) => space[3]};
`;

export const PayButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  width: 80%;
  align-self: center;
  padding: ${({ theme: { space } }) => space[2]};
`;

export const ClearButton = styled(Button).attrs({
  color: colors.ui.error,
})`
  width: 80%;
  align-self: center;
  padding: ${({ theme: { space } }) => space[1]};

`;

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: Colors.blue300
})`
  position: absolute;
  top: 50%;
  left: 35%;
  z-index: 999;

`