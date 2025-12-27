<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const { children, data } = $props();

	const { found, total, team } = $derived(data);
	const {
		url: { pathname }
	} = $derived(page);
</script>

<header>
	<nav>
		<ul>
			<li><a href={resolve('/')} class={{ current: pathname === '/' }}>Accueil</a></li>
			<li>
				<a href={resolve('/pokedex')} class={{ current: pathname.startsWith('/pokedex') }}
					>Pokédex({data.found}/{data.total})</a
				>
			</li>
			<li>
				<a href={resolve('/team')} class={{ current: pathname === '/team' }}>Équipe({team})</a>
			</li>
			<li>
				<a href={resolve('/trainer')} class={{ current: pathname === '/trainer' }}>Dresseur</a>
			</li>
			<li>
				<a href={resolve('/faq')} class={{ current: pathname === '/faq' }}>À propos</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Pokésvelte©</footer>
