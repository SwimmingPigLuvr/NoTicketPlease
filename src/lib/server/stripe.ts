import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2023-10-16'
});

export async function createPaymentIntent(amount: number) {
	return await stripe.paymentIntents.create({
		amount,
		currency: 'usd',
		payment_method_types: ['card'],
		metadata: {
			service: 'traffic_ticket_letter'
		}
	});
}
