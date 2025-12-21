<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const { children, data } = $props();
</script>

<header>
	<nav>
		<ul>
			<li><a href={resolve('/')} class={page.url.pathname === '/' ? 'current' : ''}>Accueil</a></li>
			<li>
				<a
					href={resolve('/pokedex')}
					class={page.url.pathname.startsWith('/pokedex') ? 'current' : ''}
					>Pokédex({data.found}/{data.total})</a
				>
			</li>
			<li>
				<a href={resolve('/team')} class={page.url.pathname === '/team' ? 'current' : ''}
					>Équipe({data.team})</a
				>
			</li>
			<li>
				<a href={resolve('/trainer')} class={page.url.pathname === '/trainer' ? 'current' : ''}
					>Dresseur</a
				>
			</li>
			<li>
				<a href={resolve('/faq')} class={page.url.pathname === '/faq' ? 'current' : ''}>À propos</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Pokésvelte©</footer>
