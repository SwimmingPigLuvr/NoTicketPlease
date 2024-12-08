<script lang="ts">
	export let previewContent: string;
	export let onPurchase: () => void;
	export let loading = false;
</script>

<div class="bg-white rounded-lg shadow-lg p-6">
	<h2 class="text-2xl font-semibold mb-6">Your Letter Preview</h2>

	<div class="prose max-w-none mb-8">
		<div class="bg-gray-50 p-6 rounded-lg">
			{#if loading}
				<div class="animate-pulse space-y-4">
					<div class="h-4 bg-gray-200 rounded w-3/4"></div>
					<div class="h-4 bg-gray-200 rounded"></div>
					<div class="h-4 bg-gray-200 rounded w-5/6"></div>
				</div>
			{:else}
				<p class="whitespace-pre-wrap text-gray-600">{previewContent}</p>
			{/if}
		</div>
	</div>

	<div class="border-t pt-6">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-2xl font-bold text-gray-900">$49.00</p>
				<p class="text-sm text-gray-500">Money-back guarantee if unsuccessful</p>
			</div>

			<button class="btn-primary" on:click={onPurchase} disabled={loading}>
				Purchase Full Letter
			</button>
		</div>
	</div>
</div>
