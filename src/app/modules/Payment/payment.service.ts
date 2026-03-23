import Stripe from 'stripe';

const createPaymentIntent = async (amount: number) => {
    // Force casting string manually avoiding unknown TS types. Stripe wants amount natively inside the TS constructor.
    const secret = process.env.STRIPE_SECRET_KEY || "";

    const stripe = new Stripe(secret);

    // Stripe processes entirely in cents natively (minimum $0.50 USD required mathematically)
    let amountInCents = Math.round(amount * 100);
    if (amountInCents < 50) {
        amountInCents = 50; // Force $0.50 mathematically if the cart total is less.
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        payment_method_types: ['card'],
    });

    return {
        clientSecret: paymentIntent.client_secret,
    };
};

export const PaymentService = {
    createPaymentIntent,
};
