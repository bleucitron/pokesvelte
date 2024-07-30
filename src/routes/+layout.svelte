<script lang="ts">
	const { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-flow: column;
		padding: 1rem 1.5rem;
		margin: auto;
	}

	@media (min-width: 1024px) {
		main {
			width: 80ch;
		}
	}
</style>
