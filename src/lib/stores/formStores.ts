import { writable } from 'svelte/store';

export interface PersonalDetails {
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
}

export interface TicketDetails {
	citationNumber: string;
	date: string;
	violationType: string;
	licenseNumber: string;
}

export interface DeliveryInfo {
	deliveryMethod: 'Email' | 'Download';
	paymentStatus: 'Pending' | 'Completed';
}

const emptyPersonalDetails: PersonalDetails = {
	firstName: '',
	lastName: '',
	phone: '',
	address: '',
}

export const personalDetails = writable<PersonalDetails>(emptyPersonalDetails);

export const deliveryInfo = writable<DeliveryInfo>({
	deliveryMethod: 'Email',
	paymentStatus: 'Pending'
})
