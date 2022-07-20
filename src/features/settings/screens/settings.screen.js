import React, { useContext, useEffect, useState } from 'react';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { List, Avatar } from 'react-native-paper';
import styled from 'styled-components';
import { View } from 'react-native';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SettingsItem = styled(List.Item)`
  padding: ${({ theme: { space } }) => space[3]};
`;

const AvatarContainer = styled(View)`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const { onLogout, user } = useContext(AuthenticationContext);

  const getProfilePicture = async (currentUser) => {
    const photoUri = await AsyncStorage.getItem(`@photo-${currentUser.uid}`);
    setPhoto(photoUri);
  };

  useFocusEffect(() => {
    getProfilePicture(user);
  }, [user]);

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          {!photo && (
            <Avatar.Icon size={150} icon='human' backgroundColor='#2182BD' />
          )}
          {photo && (
            <Avatar.Image
              size={150}
              source={{ uri: photo }}
              backgroundColor='#2182BD'
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
          left={(props) => <List.Icon {...props} color='black' icon='heart' />}
          onPress={() => navigation.navigate('Favourites')}
          description='View your favourites'
        />
        <SettingsItem
          title='Logout'
          left={(props) => <List.Icon {...props} color='black' icon='door' />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};
