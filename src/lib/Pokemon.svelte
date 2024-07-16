<script lang="ts">
	type PokemonProps = {
		name: string | undefined;
		id: number;
		src: string | undefined;
	};
	const { name, id, src }: PokemonProps = $props();
</script>

<p>#{id}</p>

<img {src} />

<h1>{name}</h1>
