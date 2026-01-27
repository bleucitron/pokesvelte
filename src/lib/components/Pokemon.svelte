<script lang="ts">
	type Props = {
		name: string,
		id:number,
		src:string
	}
	const {name,id,src}: Props = $props();
</script>

<div class={["Pokemon",{ found:id%2 === 0 }]}>
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

