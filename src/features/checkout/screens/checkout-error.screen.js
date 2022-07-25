import React from 'react';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { colors } from '../../../infrastructure/theme/colors';
import { CartIcon, CartIconContainer } from '../components/checkout.styles';

export const CheckoutErrorScreen = ({ route }) => {
  const { error = '' } = route.params;

  return (
    <SafeArea>
      <CartIconContainer>
        <Spacer position='bottom' size='large'>
          <CartIcon icon='close' bg={colors.ui.error} />
        </Spacer>
        <Text variant='label'>{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
