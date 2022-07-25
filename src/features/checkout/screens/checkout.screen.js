import React, { useContext, useState, useEffect } from 'react';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { CreditCardInput } from './../components/credit-card.component';
import { CartContext } from '../../../services/cart/cart.context';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessing,
} from '../components/checkout.styles';
import { RestaurantCard } from '../../restaurants/components/restaurant-card.component';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { payRequest } from '../../../services/checkout/checkout.service';

export const CheckoutScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = async () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      return navigation.navigate('CheckoutError', {
        error: 'Please fill in a valid credit card',
      });
    }

    payRequest(card.id, sum, name)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate('CheckoutSuccess');
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate('CheckoutError', {
          error: err,
        });
      });
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon='cart-off' />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <RestaurantCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position='left' size='large'>
          <Spacer position='top' size='large'>
            <Text>Your order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }, i) => {
              return <List.Item key={i} title={`${item} - £${price / 100}`} />;
            })}
          </List.Section>
          <Text>Total: £{sum / 100}</Text>
        </Spacer>
        <NameInput
          label='Full Name'
          value={name}
          onChangeText={(e) => {
            if (e.length) {
              setName(e);
            } else {
              setName('');
            }
          }}
        />
        <Spacer position='top' size='large'>
          {name.length > 0 && (
            <CreditCardInput
              name={name}
              onSuccess={setCard}
              onError={() =>
                navigation.navigate('CheckoutError', {
                  error: 'Something went wrong processing your card',
                })
              }
            />
          )}
        </Spacer>
        <Spacer position='top' size='large' />
        <PayButton
          disabled={isLoading}
          mode='contained'
          icon='cash'
          onPress={onPay}
        >
          Pay
        </PayButton>
        <Spacer position='top' size='large' />
        <ClearButton
          disabled={isLoading}
          mode='contained'
          onPress={clearCart}
          icon='cart-off'
        >
          Clear Cart
        </ClearButton>
        <Spacer position='top' size='xl' />
      </ScrollView>
    </SafeArea>
  );
};
