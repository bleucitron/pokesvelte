<script>
	import { pokedex, team } from '$lib/stores/index.svelte';
	import { page } from '$app/stores';

	const { children, data } = $props();

	const { total } = $derived(data);
	const {
		url: { pathname }
	} = $derived($page);

	const found = $derived(pokedex.found.length);
	const teamSize = $derived(team.members.length);
</script>

<header>
	<nav>
		<ul>
			<li><a href="/" class:current={pathname === '/'}>Accueil</a></li>
			<li>
				<a href="/pokedex" class:current={pathname.startsWith('/pokedex')}
					>Pokédex({found}/{total})</a
				>
			</li>
			<li>
				<a href="/team" class:current={pathname === '/team'}>Équipe({teamSize})</a>
			</li>
			<li>
				<a href="/trainer" class:current={pathname === '/trainer'}>Dresseur</a>
			</li>
			<li><a href="/faq" class:current={pathname === '/faq'}>À propos</a></li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Pokésvelte©</footer>
