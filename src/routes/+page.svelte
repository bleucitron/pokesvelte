<script>
	import Menu from '$lib/components/Menu.svelte';
</script>

<Menu />
<main>
	<h1>PokéSvelte</h1>
	<p>
		PokéSvelte est un un tutoriel centré sur le développement d'applications web avec <a
			class="svelte"
			href="https://svelte.dev/"
			target="_blank">Svelte</a
		>
		<a class="svelte" href="https://svelte-5-preview.vercel.app/docs/introduction" target="_blank"
			>5</a
		>
		et
		<a class="kit" href="https://kit.svelte.dev/" target="_blank">SvelteKit</a>.
	</p>
	<section>
		<a class="start button-link" href="/00_introduction">Commencer</a>
		<a class="button-link" href="/contents/">Programme</a>
	</section>
</main>

<style>
	h1 {
		margin: 0;
	}
	main {
		height: 100svh;
		display: flex;
		padding: 2rem;
		padding-bottom: 15rem;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	p {
		color: var(--dark-grey);
		margin-inline: auto;
		width: min(60ch, 100%);
		text-align: center;
	}
	section {
		padding-block: 2rem;
		a {
			display: block;
			text-align: center;
		}
	}

	.start {
		font-size: 1.5rem;
	}

	@media (max-width: 600px) {
		main {
			padding-bottom: unset;
		}
	}
</style>
