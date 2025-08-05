// netlify/functions/createCheckoutSession.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const items = JSON.parse(event.body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'https://yoursite.netlify.app/success',
    cancel_url: 'https://yoursite.netlify.app/cancel',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};
