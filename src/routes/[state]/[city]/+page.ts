import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import locationsData from '$lib/data/locations.json';

export const load: PageLoad = ({ params }) => {
    const location = locationsData.locations.find(
        loc => loc.state.toLowerCase() === params.state &&
            loc.city.toLowerCase() === params.city
    );

    if (!location) {
        throw error(404, 'Location not found');
    }

    return {
        location
    };
};
