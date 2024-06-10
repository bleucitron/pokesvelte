<script>
	const { children } = $props();
</script>

<header>
	<nav>
		<ul>
			<li><a href="/">Accueil</a></li>
			<li><a href="/pokedex">Pokédex</a></li>
			<li><a href="/team">Équipe</a></li>
			<li><a href="/faq">À propos</a></li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Pokésvelte©</footer>
