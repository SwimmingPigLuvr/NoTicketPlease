import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import locationsData from '$lib/data/locations.json';

export const GET: RequestHandler = async () => {
    return json(locationsData.locations);
};
