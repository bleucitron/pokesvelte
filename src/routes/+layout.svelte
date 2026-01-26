<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { recent } from '$lib/states/recent.svelte.js';
	import { scale } from 'svelte/transition';

	const { children, data } = $props();

	const { total, teamSize, found, trainer } = $derived(data);
	const {
		url: { pathname }
	} = $derived(page);
</script>

<header>
	<nav>
		<ul>
			<li><a href={resolve('/')} class={{ current: pathname === '/' }}>Accueil</a></li>
			<li>
				<a href={resolve('/pokedex')} class={{ current: pathname.startsWith('/pokedex') }}
					>Pokédex({found}/{total})</a
				>
				{#if recent.species.length}
					<div class="new" transition:scale={{ duration: 300 }}></div>
				{/if}
			</li>
			<li>
				<a href={resolve('/team')} class={{ current: pathname === '/team' }}>Équipe({teamSize})</a>
				{#if recent.members.length}
					<div class="new" transition:scale={{ duration: 300 }}></div>
				{/if}
			</li>
			<li>
				<a href={resolve('/trainer')} class={{ current: pathname === '/trainer' }}
					>{trainer?.name ?? 'Dresseur'}</a
				>
			</li>
			<li>
				<a href={resolve('/faq')} class={{ current: pathname === '/faq' }}>À propos</a>
			</li>
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
