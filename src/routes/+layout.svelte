<script lang="ts">
	import { page } from '$app/stores';

	const { data, children } = $props();
</script>

<header>
	<nav>
		<ul>
			<li>
				<a href="/" class={$page.url.pathname === '/' ? 'current' : ''}>Accueil</a>
				<a href="/pokedex" class={$page.url.pathname === '/pokedex' ? 'current' : ''}
					>Pokédex({data.found}/{data.total})</a
				>
				<a href="/team" class={$page.url.pathname === '/team' ? 'current' : ''}
					>Team({data.members})</a
				>
				<a href="/faq" class={$page.url.pathname === '/faq' ? 'current' : ''}>FAQ</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>PokéSvelte</footer>
