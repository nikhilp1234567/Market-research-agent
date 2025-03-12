import { Stripe } from "stripe";

const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Product Market Idea',
            description: 'Product Market Idea',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      }
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
};

export async function GET(request: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-02-24.acacia'
    });
    
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return Response.json({ sessionId: checkoutSession.id });
}

