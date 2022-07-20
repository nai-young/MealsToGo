import React, { useContext } from 'react';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from '../components/account.styles';
import { ActivityIndicator, Colors } from 'react-native-paper';

export const LoginScreen = ({ navigation }) => {
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  //const handleOnLogin = () => onLogin(...form);

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthInput
          label='Email'
          value={form['email']}
          onChangeText={(text) => setForm({ ...form, email: text })}
          textContentType='emailAddress'
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <Spacer size='large'>
          <AuthInput
            label='Password'
            value={form['password']}
            onChangeText={(text) => setForm({ ...form, password: text })}
            textContentType='password'
            secureTextEntry
            autoCapitalize='none'
          />
        </Spacer>
        {error && (
          <ErrorContainer size='large'>
            <Text variant='error'>{`Error: ${error}`}</Text>
          </ErrorContainer>
        )}
        <Spacer size='large'>
          {!isLoading ? (
            <AuthButton
              icon='lock-open-outline'
              mode='contained'
              onPress={() => onLogin(form.email, form.password)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size='large'>
        <AuthButton mode='contained' onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
