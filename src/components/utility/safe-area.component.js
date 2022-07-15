import { SafeAreaView, Platform, StatusBar } from 'react-native';
import styled from 'styled-components';

const isAndroid = Platform.OS === 'android';

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
