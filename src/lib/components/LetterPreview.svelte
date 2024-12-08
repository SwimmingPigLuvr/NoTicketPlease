<script lang="ts">
	export let previewLetter: string;
	export let onPurchase: () => void;
</script>

<div class="bg-white rounded-lg shadow-md p-6 mt-8">
	<h2 class="text-2xl font-semibold mb-4">Your Letter Preview</h2>

	<div class="prose max-w-none mb-6">
		<div class="bg-gray-50 p-4 rounded-md">
			<p class="text-gray-600">{previewLetter}</p>
		</div>
	</div>

	<div class="border-t pt-4">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-lg font-semibold">Price: $49.00</p>
				<p class="text-sm text-gray-500">Money-back guarantee if unsuccessful</p>
			</div>

			<button class="btn-primary" on:click={onPurchase}> Purchase Full Letter </button>
		</div>
	</div>
</div>
