<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	const { children, data } = $props();
</script>

<header>
	<nav>
		<a class={{current: page.url.pathname === '/'}} href={resolve('/')}>home</a>
		<a class={{current: page.url.pathname === '/faq'}} href={resolve('/faq')}>faq</a>
		<a class={{current: page.url.pathname.startsWith('/pokedex')}} href={resolve('/pokedex')}
			>pokedex({data.nombrePokemonDecouvert}/{data.nombrePokemonTotal})</a
		>
		<a class={{current: page.url.pathname === '/team'}} href={resolve('/team')}
			>team({data.nombrePokemonEquipe})</a
		>
		<a class={{current: page.url.pathname === '/trainer'}} href={resolve('/trainer')}
			>trainer</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Mon footer</footer>

