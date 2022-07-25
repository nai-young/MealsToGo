import React from 'react';
import { LiteCreditCardInput } from 'react-native-credit-card-input';
import { CardTokenRequest } from '../../../services/checkout/checkout.service';

export const CreditCardInput = ({ name = 'Test Name', onSuccess, onError }) => {
  const onChange = async (form) => {
    const { values, status } = form;
    const isIncomplete = Object.values(status).includes('incomplete');
    const expiry = values.expiry.split('/');

    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name,
    };

    if (!isIncomplete) {
      try {
        const info = await CardTokenRequest(card);
        onSuccess(info);
      } catch (e) {
        onError();
      }
    }
  };

  return <LiteCreditCardInput onChange={onChange} />;
};
