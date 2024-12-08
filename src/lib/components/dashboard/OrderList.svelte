<script lang="ts">
	import type { Order } from '$lib/types';

	export let orders: Order[];

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString();
	}

	function getStatusColor(status: string) {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'refunded':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}
</script>

<div class="space-y-6">
	{#if orders.length === 0}
		<p class="text-gray-500 text-center py-8">
			No orders found. Generate your first letter to get started!
		</p>
	{:else}
		{#each orders as order}
			<div class="border rounded-lg p-4">
				<div class="flex items-center justify-between mb-4">
					<div>
						<h3 class="text-lg font-medium text-gray-900">
							Order #{order.id}
						</h3>
						<p class="text-sm text-gray-500">
							{formatDate(order.createdAt)}
						</p>
					</div>

					<span class="px-3 py-1 rounded-full text-sm font-medium {getStatusColor(order.status)}">
						{order.status}
					</span>
				</div>

				<div class="border-t pt-4">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<p class="text-sm font-medium text-gray-500">Location</p>
							<p class="mt-1">{order.location}</p>
						</div>
						<div>
							<p class="text-sm font-medium text-gray-500">Amount</p>
							<p class="mt-1">${(order.amount / 100).toFixed(2)}</p>
						</div>
					</div>

					<div class="mt-4">
						<button
							class="text-blue-600 hover:text-blue-800 text-sm font-medium"
							on:click={() => window.open(order.letterUrl, '_blank')}
						>
							View Letter
						</button>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
