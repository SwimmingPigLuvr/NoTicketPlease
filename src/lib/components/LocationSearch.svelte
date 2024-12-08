<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Location } from '$lib/types';

	let locations: Location[] = [];
	let searchQuery = '';
	let filteredLocations: Location[] = [];

	onMount(async () => {
		const response = await fetch('/api/locations');
		locations = await response.json();
	});

	$: {
		if (searchQuery) {
			filteredLocations = locations.filter(
				(location) =>
					location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					location.state.toLowerCase().includes(searchQuery.toLowerCase())
			);
		} else {
			filteredLocations = [];
		}
	}

	function handleLocationSelect(location: Location) {
		goto(`/${location.state.toLowerCase()}/${location.city.toLowerCase()}`);
	}
</script>

<div class="relative max-w-xl mx-auto">
	<input
		type="text"
		bind:value={searchQuery}
		placeholder="Enter your city or state..."
		class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
	/>

	{#if filteredLocations.length > 0}
		<div
			class="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto"
		>
			{#each filteredLocations as location}
				<button
					class="w-full text-left px-4 py-2 hover:bg-gray-100"
					on:click={() => handleLocationSelect(location)}
				>
					{location.name}, {location.state}
				</button>
			{/each}
		</div>
	{/if}
</div>
