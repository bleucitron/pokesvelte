<script lang="ts">
	const { children, data } = $props();
	import { page } from '$app/state';
</script>

<header>
	<nav>

		<a class={page.url.pathname === '/' ? 'current' : ''} href="/">home</a>
		<a class={page.url.pathname === '/faq' ? 'current' : ''} href="/faq">faq</a>
		<a class={page.url.pathname.startsWith('/pokedex') ? 'current' : ''} href="/pokedex">pokedex({data.nombrePokemonDecouvert}/{data.nombrePokemonTotal})</a>
		<a class={page.url.pathname === '/team' ? 'current' : ''} href="/team">team({data.nombrePokemonEquipe})</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Mon footer</footer>