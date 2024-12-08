<script lang="ts">
	import LocationSearch from '$lib/components/LocationSearch.svelte';
</script>

<svelte:head>
	<title>Traffic Ticket Helper - Fight Your Traffic Ticket or Your Money Back</title>
	<meta
		name="description"
		content="Get help fighting your traffic ticket with our Lawyer designed letter generation service. Money-back guarantee if unsuccessful."
	/>
</svelte:head>

<div class="bg-gradient-to-b from-blue-50 to-white">
	<div class="container-wrapper py-16 md:py-24">
		<div class="max-w-3xl mx-auto text-center">
			<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
				Fight Your Traffic Ticket with Confidence
			</h1>

			<p class="text-xl text-gray-600 mb-8">
				Generate a professional declaration letter tailored to your local court's requirements.
				Money-back guarantee if unsuccessful.
			</p>

			<LocationSearch />

			<div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="bg-white p-6 rounded-lg shadow-md">
					<h3 class="font-semibold text-lg mb-2">Personalized Strategy</h3>
					<p class="text-gray-600">
						Customized to your specific situation and local court requirements
					</p>
				</div>

				<div class="bg-white p-6 rounded-lg shadow-md">
					<h3 class="font-semibold text-lg mb-2">Money-Back Guarantee</h3>
					<p class="text-gray-600">If your ticket isn't dismissed or reduced, you pay nothing</p>
				</div>

				<div class="bg-white p-6 rounded-lg shadow-md">
					<h3 class="font-semibold text-lg mb-2">Instant Generation</h3>
					<p class="text-gray-600">Get your customized letter in minutes, not days</p>
				</div>
			</div>
		</div>
	</div>
</div>
