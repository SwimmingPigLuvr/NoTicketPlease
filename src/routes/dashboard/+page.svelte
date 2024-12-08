<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import OrderList from '$lib/components/dashboard/OrderList.svelte';
	import RefundRequest from '$lib/components/dashboard/RefundRequest.svelte';

	export let data: PageData;

	let activeTab: 'orders' | 'refunds' = 'orders';
</script>

<div class="bg-gray-50 min-h-screen py-12">
	<div class="container-wrapper">
		<div class="max-w-4xl mx-auto">
			<h1 class="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>

			<div class="bg-white rounded-lg shadow-md">
				<div class="border-b border-gray-200">
					<nav class="flex -mb-px">
						<button
							class="px-6 py-4 text-sm font-medium {activeTab === 'orders'
								? 'border-b-2 border-blue-500 text-blue-600'
								: 'text-gray-500 hover:text-gray-700'}"
							on:click={() => (activeTab = 'orders')}
						>
							Orders
						</button>
						<button
							class="px-6 py-4 text-sm font-medium {activeTab === 'refunds'
								? 'border-b-2 border-blue-500 text-blue-600'
								: 'text-gray-500 hover:text-gray-700'}"
							on:click={() => (activeTab = 'refunds')}
						>
							Refund Requests
						</button>
					</nav>
				</div>

				<div class="p-6">
					{#if activeTab === 'orders'}
						<OrderList orders={data.orders} />
					{:else}
						<RefundRequest orders={data.orders} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
