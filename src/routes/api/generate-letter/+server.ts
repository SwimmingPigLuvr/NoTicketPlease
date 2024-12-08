import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateLetter } from '$lib/server/openai';
import { createPaymentIntent } from '$lib/server/stripe';

const LETTER_PRICE = 4900; // $49.00 in cents

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { ticketDetails, courtFormatting } = await request.json();

        // Generate the complete letter
        const letter = await generateLetter(ticketDetails, courtFormatting);

        // Create a payment intent for Stripe
        const paymentIntent = await createPaymentIntent(LETTER_PRICE);

        // Return preview and payment info
        return json({
            previewLetter: letter.substring(0, 300) + '...',
            paymentIntent: {
                clientSecret: paymentIntent.client_secret
            }
        });
    } catch (error) {
        console.error('Error generating letter:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate letter' }), {
            status: 500
        });
    }
};
