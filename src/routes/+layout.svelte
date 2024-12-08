<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

{@render children()}

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-grow">
	</main>
	<Footer />
</div>
