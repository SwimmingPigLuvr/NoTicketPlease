<script lang="ts">
	import { page } from '$app/stores';
	import { PageData } from './$types';
	import TicketDetailsForm from '$lib/components/letter-generation/TicketDetailsForm.svelte';
	import LetterPreview from '$lib/components/letter-generation/LetterPreview.svelte';
	import PaymentForm from '$lib/components/PaymentForm.svelte';
	import SEO from '$lib/components/SEO.svelte';

	export let data: PageData;
	const { location } = data;

	let loading = false;
	let previewLetter: string | null = null;
	let clientSecret: string | null = null;
	let showPayment = false;
	let error: string | null = null;
	let success = false;

	async function handleTicketSubmit(event: CustomEvent<any>) {
		loading = true;
		error = null;

		try {
			const response = await fetch('/api/generate-letter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					ticketDetails: event.detail,
					courtFormatting: location.courtFormatting
				})
			});

			if (!response.ok) throw new Error('Failed to generate letter');

			const data = await response.json();
			previewLetter = data.previewLetter;
			clientSecret = data.paymentIntent.clientSecret;
		} catch (e) {
			error = 'Failed to generate letter. Please try again.';
		} finally {
			loading = false;
		}
	}

	function handlePurchaseClick() {
		showPayment = true;
	}

	function handlePaymentSuccess() {
		success = true;
	}

	function handlePaymentError(e: Error) {
		error = e.message;
	}
</script>

<SEO
	title={location.seoMetadata.title}
	description={location.seoMetadata.description}
	keywords={location.seoMetadata.keywords}
/>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
	<div class="container-wrapper">
		<div class="max-w-3xl mx-auto">
			<h1 class="text-4xl font-bold text-gray-900 mb-4">
				Fight Your {location.name} Traffic Ticket
			</h1>

			<p class="text-xl text-gray-600 mb-8">
				Get a professionally crafted declaration letter tailored to {location.name}'s court
				requirements. Money-back guarantee if unsuccessful.
			</p>

			{#if error}
				<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
					<p class="text-red-700">{error}</p>
				</div>
			{/if}

			{#if success}
				<div class="bg-green-50 border border-green-200 rounded-lg p-6">
					<h2 class="text-2xl font-semibold text-green-800 mb-4">Thank you for your purchase!</h2>
					<p class="text-green-700 mb-4">
						Your letter has been generated and is ready for download.
					</p>
					<a href="/dashboard" class="inline-block btn-primary"> View Your Letter </a>
				</div>
			{:else if showPayment && clientSecret}
				<PaymentForm {clientSecret} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
			{:else if previewLetter}
				<LetterPreview previewContent={previewLetter} onPurchase={handlePurchaseClick} {loading} />
			{:else}
				<TicketDetailsForm on:submit={handleTicketSubmit} {loading} />
			{/if}
		</div>
	</div>
</div>
