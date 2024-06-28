<script>
	import { page } from '$app/stores';
	import { recent } from '$lib/stores/index.svelte';

	const { children, data } = $props();

	const { total, teamSize, found } = $derived(data);
	const {
		url: { pathname }
	} = $derived($page);
</script>

<header>
	<nav>
		<ul>
			<li><a href="/" class:current={pathname === '/'}>Accueil</a></li>
			<li>
				<a href="/pokedex" class:current={pathname.startsWith('/pokedex')}
					>Pokédex({found}/{total})</a
				>
				{#if recent.species.length > 0}
					<div class="new"></div>
				{/if}
			</li>
			<li>
				<a href="/team" class:current={pathname === '/team'}>Équipe({teamSize})</a>
				{#if recent.members.length > 0}
					<div class="new"></div>
				{/if}
			</li>
			<li>
				<a href="/trainer" class:current={pathname === '/trainer'}>Dresseur</a>
			</li>
			<li><a href="/faq" class:current={pathname === '/faq'}>À propos</a></li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Pokésvelte©</footer>

<style>
	li {
		position: relative;
	}

	li .new {
		width: 0.5rem;
		height: 0.5rem;
		background: orange;
		position: absolute;
		top: 0;
		right: 0;
		margin-left: -0.25rem;
		margin-top: -0.25rem;
		outline: 1px solid grey;
		border-radius: 50%;
	}
</style>
