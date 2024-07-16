<script lang="ts">
	import { page } from '$app/stores';

	const { data, children } = $props();
</script>

<header>
	<nav>
		<ul>
			<li>
				<a href="/" class:current={$page.url.pathname === '/'}>Accueil</a>
				<a href="/pokedex" class:current={$page.url.pathname === '/pokedex'}
					>Pokédex({data.found}/{data.total})</a
				>
				<a href="/team" class:current={$page.url.pathname === '/team'}>Team({data.members})</a>
				<a href="/trainer" class:current={$page.url.pathname === '/trainer'}>Dresseur</a>
				<a href="/faq" class:current={$page.url.pathname === '/faq'}>FAQ</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>PokéSvelte</footer>
