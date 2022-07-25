import React, { useContext, useCallback, useState } from 'react';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { List, Avatar } from 'react-native-paper';
import styled from 'styled-components';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../../../infrastructure/theme/colors';

const SettingsBackground = styled(ImageBackground).attrs({
  source: require('../../../../assets/home_bg.jpg'),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const SettingsItem = styled(List.Item)`
  padding: ${({ theme: { space } }) => space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;

const AvatarContainer = styled(View)`
  align-items: center;
`;

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;

export const SettingsScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const { onLogout, user } = useContext(AuthenticationContext);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`@photo-${currentUser.uid}`);
    setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  return (
    <SettingsBackground>
      <TransparentSafeArea>
        <ScrollView>
          <AvatarContainer>
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
              {!photo && (
                <Avatar.Icon
                  size={150}
                  icon='human'
                  backgroundColor={colors.brand.primary}
                />
              )}
              {photo && (
                <Avatar.Image
                  size={150}
                  source={{ uri: photo }}
                  backgroundColor={colors.brand.primary}
                />
              )}
            </TouchableOpacity>
            <Spacer position='top' size='large'>
              <Text variant='label'>{user?.email}</Text>
            </Spacer>
          </AvatarContainer>
          <List.Section>
            <SettingsItem
              title='Favourites'
              left={(props) => (
                <List.Icon {...props} color={colors.ui.error} icon='heart' />
              )}
              onPress={() => navigation.navigate('Favourites')}
              description='View your favourites'
            />
            <Spacer size='medium' />
            <SettingsItem
              title='Past Orders'
              left={(props) => (
                <List.Icon {...props} color={colors.ui.primary} icon='history' />
              )}
              onPress={() => null}
            />
            <Spacer size='medium' />
            <SettingsItem
              title='Payment'
              left={(props) => (
                <List.Icon {...props} color={colors.ui.primary} icon='cart' />
              )}
              onPress={() => null}
            />
            <Spacer size='medium' />
            <SettingsItem
              title='Logout'
              left={(props) => (
                <List.Icon {...props} color={colors.ui.primary} icon='door' />
              )}
              onPress={onLogout}
            />
          </List.Section>
        </ScrollView>
      </TransparentSafeArea>
    </SettingsBackground>
  );
};
