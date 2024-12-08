export interface Location {
	id: string;
	name: string;
	city: string;
	state: string;
	courtFormatting: CourtFormatting;
	seoMetadata: SeoMetadata;
}

export interface CourtFormatting {
	salutation: string;
	spacing: string;
	specialStatements: string[];
	requiredSections: string[];
}

export interface SeoMetadata {
	title: string;
	description: string;
	keywords: string[];
}

export interface TicketDetails {
	ticketNumber: string;
	date: string;
	location: string;
	violation: string;
	circumstances: string;
	personalNarrative: string;
}

export interface PaymentIntent {
	clientSecret: string;
}

export interface Order {
	id: string;
	createdAt: string;
	status: 'pending' | 'completed' | 'refunded';
	location: string;
	amount: number;
	letterUrl: string;
	refundRequested: boolean;
}

export interface RefundRequest {
	orderId: string;
	explanation: string;
	proofUrl: string;
	status: 'pending' | 'approved' | 'rejected';
	createdAt: string;
}
