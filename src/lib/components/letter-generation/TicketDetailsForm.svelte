<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TicketDetails } from '$lib/types';

	export let loading = false;

	const dispatch = createEventDispatcher<{
		submit: TicketDetails;
	}>();

	let ticketDetails: TicketDetails = {
		ticketNumber: '',
		date: '',
		violation: '',
		location: '',
		circumstances: '',
		personalNarrative: ''
	};

	function handleSubmit() {
		dispatch('submit', ticketDetails);
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	<div>
		<label for="ticketNumber" class="block text-sm font-medium text-gray-700">
			Ticket Number
		</label>
		<input
			type="text"
			id="ticketNumber"
			bind:value={ticketDetails.ticketNumber}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
			required
		/>
	</div>

	<div>
		<label for="date" class="block text-sm font-medium text-gray-700"> Date of Violation </label>
		<input
			type="date"
			id="date"
			bind:value={ticketDetails.date}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
			required
		/>
	</div>

	<div>
		<label for="violation" class="block text-sm font-medium text-gray-700">
			Type of Violation
		</label>
		<input
			type="text"
			id="violation"
			bind:value={ticketDetails.violation}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
			placeholder="e.g., Speeding, Red Light, Stop Sign"
			required
		/>
	</div>

	<div>
		<label for="circumstances" class="block text-sm font-medium text-gray-700">
			Circumstances
		</label>
		<textarea
			id="circumstances"
			bind:value={ticketDetails.circumstances}
			rows="4"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
			placeholder="Describe the specific circumstances of your ticket..."
			required
		></textarea>
	</div>

	<div>
		<label for="personalNarrative" class="block text-sm font-medium text-gray-700">
			Your Side of the Story
		</label>
		<textarea
			id="personalNarrative"
			bind:value={ticketDetails.personalNarrative}
			rows="4"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
			placeholder="Tell us your version of events..."
			required
		></textarea>
	</div>

	<div class="flex justify-end">
		<button type="submit" class="btn-primary" disabled={loading}>
			{loading ? 'Generating...' : 'Generate Letter'}
		</button>
	</div>
</form>
