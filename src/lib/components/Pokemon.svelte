<script lang="ts">
	type Props = {
		name: string,
		id:number,
		src:string
	}
	const {name,id,src}: Props = $props();
</script>

<div class="Pokemon">
	<p>{name}</p>
	<p>#{id}</p>
	<img
		{src}
		alt={name}
	/>
</div>

<style>
	p {
		color: red;
	}
</style>

