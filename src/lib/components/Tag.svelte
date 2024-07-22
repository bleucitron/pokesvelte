<script lang="ts">
	import { scale } from 'svelte/transition';

	type Props = {
		scope: 'kit' | 'svelte';
		onclick?: () => void;
	};

	const { scope, onclick }: Props = $props();
	const type = $derived(onclick ? 'button' : 'span');
	const role = $derived(onclick ? 'button' : 'note');
</script>

<svelte:element
	this={type}
	{role}
	class="Tag {scope}"
	{onclick}
	transition:scale={{ duration: 300 }}
>
	{scope}
</svelte:element>

<style>
	.Tag {
		display: inline-block;
		padding: 1px 3px;
		color: white;
		font-size: 0.7rem;
		border-radius: 3px;
		opacity: 0.5;
		border: none;

		&.svelte {
			background: var(--dark-orange);
		}
		&.kit {
			background: var(--dark-blue);
		}
	}
</style>
