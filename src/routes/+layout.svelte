<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	// import { pokedex } from '$lib/states/pokedex.svelte.js';
	const { children, data } = $props();
	import { team } from '$lib/states/team.svelte.js';
	const { pathname } = $derived(page.url);
	const { nombrePokemonTotal, teamSize, found, user} = $derived(data);

	// const nombrePokemonEquipe = $derived(team.members.length)
</script>

<header>
	<nav>
		<a class={{current: pathname === '/'}} href={resolve('/')}>home</a>
		<a class={{current: pathname === '/faq'}} href={resolve('/faq')}>faq</a>
		<a class={{current: pathname.startsWith('/pokedex')}} href={resolve('/pokedex')}
			>pokedex({found}/{nombrePokemonTotal})</a
		>
		<a class={{current: pathname === '/team'}} href={resolve('/team')}
			>team({teamSize})</a
		>
		<a class={{current: pathname === '/trainer'}} href={resolve('/trainer')}
			>{user? user.name: "Trainer"}</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Mon footer</footer>

