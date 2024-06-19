<script>
	import { page } from '$app/stores';

	const { children, data } = $props();
</script>

<header>
	<nav>
		<ul>
			<li><a href="/" class={$page.url.pathname === '/' ? 'current' : ''}>Accueil</a></li>
			<li>
				<a href="/pokedex" class={$page.url.pathname.startsWith('/pokedex') ? 'current' : ''}
					>Pokédex({data.found}/{data.total})</a
				>
			</li>
			<li>
				<a href="/team" class={$page.url.pathname === '/team' ? 'current' : ''}
					>Équipe({data.teamSize})</a
				>
			</li>
			<li><a href="/faq" class={$page.url.pathname === '/faq' ? 'current' : ''}>À propos</a></li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Pokésvelte©</footer>
