<script lang="ts">
	// import { pokedex } from '$lib/states/pokedex.svelte.js';
	
	type Props = {
		name: string,
		id:number,
		src:string,
		found:boolean
	}
	const {name,id,src,found}: Props = $props();
	$inspect(found);
</script>

<div class={["Pokemon",{found}]}>
	<p>{name}</p>
	<p>#{id}</p>
	<img
		{src}
		alt={name}
	/>
</div>

<style>
	.Pokemon {
		display: flex;
		flex-flow: column;
		align-items: center;
		width: 15rem;
		margin: auto;
	}
	p {
		margin: 0;
		font-size: 1.5rem;
		text-transform: capitalize;
	}
	img {
		height: 15rem;
		object-fit: cover;
		filter: contrast(0%) brightness(200%);
	}
	.found img {
		filter: none;
	}
</style>

