<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const { children, data } = $props();
</script>

<header>
	<nav>
		<ul>
			<li><a href={resolve('/')} class={{ current: page.url.pathname === '/' }}>Accueil</a></li>
			<li>
				<a href={resolve('/pokedex')} class={{ current: page.url.pathname.startsWith('/pokedex') }}
					>Pokédex({data.found}/{data.total})</a
				>
			</li>
			<li>
				<a href={resolve('/team')} class={{ current: page.url.pathname === '/team' }}
					>Équipe({data.team})</a
				>
			</li>
			<li>
				<a href={resolve('/trainer')} class={{ current: page.url.pathname === '/trainer' }}
					>Dresseur</a
				>
			</li>
			<li>
				<a href={resolve('/faq')} class={{ current: page.url.pathname === '/faq' }}>À propos</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Pokésvelte©</footer>
