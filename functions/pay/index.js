module.exports.payRequest = (request, response, stripeClient) => {
  const body = JSON.parse(request.body);
  console.log(token, amount);

  const { token, amount } = body;
  stripeClient.paymentIntents
    .create({
      amount,
      currency: "USD",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntent) => {
      console.log(paymentIntent);

      response.json(paymentIntent);
    })
    .catch((e) => {
      console.log(e);
      response.status(400);
      response.send(e);
    });
};
