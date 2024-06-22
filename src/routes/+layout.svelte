<script>
	import { page } from '$app/stores';

	const { children, data } = $props();
</script>

<header>
	<nav>
		<ul>
			<li><a href="/" class:current={$page.url.pathname === '/'}>Accueil</a></li>
			<li>
				<a href="/pokedex" class:current={$page.url.pathname.startsWith('/pokedex')}
					>Pokédex({data.found}/{data.total})</a
				>
			</li>
			<li>
				<a href="/team" class:current={$page.url.pathname === '/team'}>Équipe({data.teamSize})</a>
			</li>
			<li>
				<a href="/trainer" class:current={$page.url.pathname === '/trainer'}>Dresseur</a>
			</li>
			<li><a href="/faq" class:current={$page.url.pathname === '/faq'}>À propos</a></li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Pokésvelte©</footer>
