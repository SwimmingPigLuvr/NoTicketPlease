import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('/api/orders');
    const orders = await response.json();

    return {
        orders
    };
};
