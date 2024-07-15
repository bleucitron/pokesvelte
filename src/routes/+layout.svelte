<script lang="ts">
	const { children } = $props();
</script>

<header>
	<nav>
		<ul>
			<li>
				<a href="/">Accueil</a>
				<a href="/pokedex">Pokédex</a>
				<a href="/team">Team</a>
				<a href="/faq">FAQ</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>PokéSvelte</footer>
