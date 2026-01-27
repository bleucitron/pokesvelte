<script lang="ts">
	const { children } = $props();
	import { page } from '$app/state';
</script>

<header>
	<nav>

		<a class={page.url.pathname == '/' ? 'current' : ''} href="/">home</a>
		<a class={page.url.pathname == '/faq' ? 'current' : ''} href="/faq">faq</a>
		<a class={page.url.pathname == '/pokedex' ? 'current' : ''} href="/pokedex">pokedex</a>
		<a class={page.url.pathname == '/team' ? 'current' : ''} href="/team">team</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Mon footer</footer>