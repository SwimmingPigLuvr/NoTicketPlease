import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Order } from '$lib/types';

// TODO: Replace with actual database query
const mockOrders: Order[] = [
    {
        id: '1',
        createdAt: '2024-01-15T12:00:00Z',
        status: 'completed',
        location: 'Los Angeles County',
        amount: 4900,
        letterUrl: '/letters/sample.pdf',
        refundRequested: false
    }
];

export const GET: RequestHandler = async () => {
    return json(mockOrders);
};
