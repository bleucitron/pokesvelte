<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { pokedex } from '$lib/states/pokedex.svelte';
	import { team } from '$lib/states/team.svelte';

	const { children, data } = $props();

	const { total } = $derived(data);
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
					>Pokédex({pokedex.found.length}/{total})</a
				>
			</li>
			<li>
				<a href={resolve('/team')} class={{ current: pathname === '/team' }}
					>Équipe({team.members.length})</a
				>
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
