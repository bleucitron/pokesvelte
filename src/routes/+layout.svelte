<script lang="ts">
	import { page } from '$app/stores';
	import { pokedex } from '$lib/stores/index.svelte.js';

	const { data, children } = $props();
	const pathname = $derived($page.url.pathname);
</script>

<header>
	<nav>
		<ul>
			<li>
				<a href="/" class:current={pathname === '/'}>Accueil</a>
				<a href="/pokedex" class:current={pathname === '/pokedex'}
					>Pokédex({pokedex.found.length}/{data.total})</a
				>
				<a href="/team" class:current={pathname === '/team'}>Team({data.members})</a>
				<a href="/trainer" class:current={pathname === '/trainer'}>Dresseur</a>
				<a href="/faq" class:current={pathname === '/faq'}>FAQ</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>PokéSvelte</footer>
