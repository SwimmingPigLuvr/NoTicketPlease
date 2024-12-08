import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        const orderId = formData.get('orderId');
        const proof = formData.get('proof');
        const explanation = formData.get('explanation');

        // TODO: Implement file upload and database storage

        return json({ success: true });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to submit refund request' }), {
            status: 500
        });
    }
};
