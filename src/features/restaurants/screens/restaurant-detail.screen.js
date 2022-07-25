import React, { useState, useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { RestaurantCard } from '../components/restaurant-card.component';
import { List } from 'react-native-paper';
import { Spacer } from '../../../components/spacer/spacer.component';
import { OrderButton } from '../components/restaurant-card.styles';
import { CartContext } from '../../../services/cart/cart.context';

const { AccordionGroup, Accordion, Item, Icon } = List;

export const RestaurantDetailScreen = ({ route, navigation }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  const { addToCart } = useContext(CartContext);

  const { restaurant } = route.params;

  return (
    <SafeArea>
      <RestaurantCard restaurant={restaurant} />
      <ScrollView>
        <Accordion
          title='Breakfast'
          left={(props) => <Icon {...props} icon='bread-slice' />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <Item title='Eggs Benedict' />
          <Item title='Classic Breakfast' />
        </Accordion>
        <Accordion
          title='Lunch'
          left={(props) => <Icon {...props} icon='hamburger' />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <Item title='Burger w/ Fries' />
          <Item title='Steak Sandwich' />
          <Item title='Mushroom Soup' />
        </Accordion>

        <Accordion
          title='Dinner'
          left={(props) => <Icon {...props} icon='food-variant' />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <Item title='Spaghetti Bolognese' />
          <Item title='Veal Cutlet with Chicken Mushroom Rotini' />
          <Item title='Steak Frites' />
        </Accordion>
        <Accordion
          title='Drinks'
          left={(props) => <Icon {...props} icon='cup' />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <Item title='Coffee' />
          <Item title='Tea' />
          <Item title='Modelo' />
          <Item title='Coke' />
          <Item title='Fanta' />
        </Accordion>
      </ScrollView>
      <Spacer position='bottom' size='large'>
        <OrderButton
          mode='contained'
          icon='cash'
          onPress={() => {
            addToCart({ item: 'special', price: 1299 }, restaurant);
            navigation.navigate('Checkout');
          }}
        >
          Order Special Only £12.99
        </OrderButton>
      </Spacer>
    </SafeArea>
  );
};
