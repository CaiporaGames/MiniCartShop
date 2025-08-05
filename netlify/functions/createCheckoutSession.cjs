const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const siteURL = 'https://minicartshoptimoteo.netlify.app'; 
exports.handler = async (event) => {
  const items = JSON.parse(event.body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${siteURL}/success`,
    cancel_url: `${siteURL}/cancel`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url: session.url }),
  };
};
