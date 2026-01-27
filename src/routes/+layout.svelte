<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	const { children, data } = $props();
</script>

<header>
	<nav>
		<a class={page.url.pathname === '/' ? 'current' : ''} href={resolve('/')}>home</a>
		<a class={page.url.pathname === '/faq' ? 'current' : ''} href={resolve('/faq')}>faq</a>
		<a class={page.url.pathname.startsWith('/pokedex') ? 'current' : ''} href={resolve('/pokedex')}
			>pokedex({data.nombrePokemonDecouvert}/{data.nombrePokemonTotal})</a
		>
		<a class={page.url.pathname === '/team' ? 'current' : ''} href={resolve('/team')}
			>team({data.nombrePokemonEquipe})</a
		>
		<a class={page.url.pathname === '/trainer' ? 'current' : ''} href={resolve('/trainer')}
			>trainer</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Mon footer</footer>

