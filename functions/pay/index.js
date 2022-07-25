module.exports.payRequest = (request, response, stripeClient) => {
  const body = JSON.parse(request.body); // body.token, body.name, body.amount
  const { token, amount } = body;

  stripeClient.paymentIntents
    .create({
      amount,
      currency: 'GBP',
      payment_method_types: ['card'],
      payment_method_data: {
        type: 'card',
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntent) => {
      response.json(paymentIntent);
    })
    .catch((e) => {
      console.log(e);
      response.status(400).send('Something went wrong with your payment');
    });
};
