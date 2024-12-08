<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Order } from '$lib/types';

	export let orders: Order[];

	const dispatch = createEventDispatcher();

	let selectedOrderId = '';
	let proofFile: File | null = null;
	let explanation = '';
	let submitting = false;

	const eligibleOrders = orders.filter(
		(order) => order.status === 'completed' && !order.refundRequested
	);

	async function handleSubmit() {
		if (!selectedOrderId || !proofFile || !explanation) return;

		submitting = true;

		try {
			const formData = new FormData();
			formData.append('orderId', selectedOrderId);
			formData.append('proof', proofFile);
			formData.append('explanation', explanation);

			const response = await fetch('/api/refund-request', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) throw new Error('Failed to submit refund request');

			dispatch('success');
			selectedOrderId = '';
			proofFile = null;
			explanation = '';
		} catch (error) {
			dispatch('error', error);
		} finally {
			submitting = false;
		}
	}
</script>

<div class="max-w-2xl mx-auto">
	<h2 class="text-xl font-semibold mb-6">Submit a Refund Request</h2>

	{#if eligibleOrders.length === 0}
		<p class="text-gray-500 text-center py-8">No eligible orders found for refund requests.</p>
	{:else}
		<form on:submit|preventDefault={handleSubmit} class="space-y-6">
			<div>
				<label for="order" class="block text-sm font-medium text-gray-700"> Select Order </label>
				<select
					id="order"
					bind:value={selectedOrderId}
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					required
				>
					<option value="">Select an order</option>
					{#each eligibleOrders as order}
						<option value={order.id}>
							Order #{order.id} - {order.location}
						</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="proof" class="block text-sm font-medium text-gray-700"> Upload Proof </label>
				<input
					type="file"
					id="proof"
					accept=".pdf,.jpg,.jpeg,.png"
					on:change={(e) => (proofFile = e.target.files?.[0] || null)}
					class="mt-1 block w-full"
					required
				/>
				<p class="mt-1 text-sm text-gray-500">
					Upload court decision or relevant documentation (PDF, JPG, PNG)
				</p>
			</div>

			<div>
				<label for="explanation" class="block text-sm font-medium text-gray-700">
					Explanation
				</label>
				<textarea
					id="explanation"
					bind:value={explanation}
					rows="4"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					required
					placeholder="Please explain why you're requesting a refund..."
				></textarea>
			</div>

			<div class="flex justify-end">
				<button type="submit" class="btn-primary" disabled={submitting}>
					{submitting ? 'Submitting...' : 'Submit Refund Request'}
				</button>
			</div>
		</form>
	{/if}
</div>
