import createStripe from 'stripe-client';
import { host } from '../../utils/env';

const stripe = createStripe(
  'pk_test_51LNwbrEGxbHljwDdn0N3IASR5bHFTrHDgYoKLCfEGm0PrNHvFfWYvP6zdhf0KpxLSuEdzs7ezfWAh2SUyOFOwGqw00au809L73'
);

export const CardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      amount,
      name,
    }),
    method: 'POST',
  })
    .then((res) => {
      if (res.status > 200) {
        return Promise.reject('something went wrong processing your payment');
      }
      return res.json();
    })
    .catch((e) => {
      console.log('Error: ', e);
    });
};
