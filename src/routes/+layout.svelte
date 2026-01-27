<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { pokedex } from '$lib/states/pokedex.svelte.js';
	const { children, data } = $props();
	const { pathname } = $derived(page.url);
	const { nombrePokemonTotal, nombrePokemonEquipe } = $derived(data);
</script>

<header>
	<nav>
		<a class={{current: pathname === '/'}} href={resolve('/')}>home</a>
		<a class={{current: pathname === '/faq'}} href={resolve('/faq')}>faq</a>
		<a class={{current: pathname.startsWith('/pokedex')}} href={resolve('/pokedex')}
			>pokedex({pokedex.found.length}/{nombrePokemonTotal})</a
		>
		<a class={{current: pathname === '/team'}} href={resolve('/team')}
			>team({nombrePokemonEquipe})</a
		>
		<a class={{current: pathname === '/trainer'}} href={resolve('/trainer')}
			>trainer</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Mon footer</footer>

