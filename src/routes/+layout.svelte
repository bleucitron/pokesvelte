<script lang="ts">
	const { children } = $props();
</script>

<header>
	<nav>
		<a href="/">home</a>
		<a href="/faq">faq</a>
		<a href="/pokedex">pokedex</a>
		<a href="/team">team</a>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>Mon footer</footer>