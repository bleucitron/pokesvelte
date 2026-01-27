<script lang="ts">
	type Props = {
		name: string,
		id:number,
		src:string,
        catchPokemon:()=>void
	}
	const {name,id,src, catchPokemon}: Props = $props();
</script>

<div class={["Wild"]} onclick={catchPokemon}>
	<img
		{src}
		alt={name}
	/>
</div>