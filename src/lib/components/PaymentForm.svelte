<script lang="ts">
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';

	export let clientSecret: string;
	export let onSuccess: () => void;
	export let onError: (error: Error) => void;

	let stripe: any;
	let elements: any;
	let cardElement: any;
	let processing = false;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		elements = stripe.elements();

		cardElement = elements.create('card');
		cardElement.mount('#card-element');
	});

	async function handleSubmit() {
		if (!stripe || !elements || processing) return;

		processing = true;

		try {
			const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: cardElement
				}
			});

			if (error) {
				onError(error);
			} else if (paymentIntent.status === 'succeeded') {
				onSuccess();
			}
		} catch (e) {
			onError(e);
		} finally {
			processing = false;
		}
	}
</script>

<div class="bg-white rounded-lg shadow-md p-6 mt-8">
	<h2 class="text-2xl font-semibold mb-4">Payment Details</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-6">
			<label for="card-element" class="block text-sm font-medium text-gray-700 mb-2">
				Credit or Debit Card
			</label>
			<div id="card-element" class="p-3 border rounded-md"></div>
		</div>

		<button type="submit" class="btn-primary w-full" disabled={processing}>
			{processing ? 'Processing...' : 'Pay $49.00'}
		</button>

		<p class="text-sm text-gray-500 mt-4 text-center">Your payment is secure and encrypted</p>
	</form>
</div>
