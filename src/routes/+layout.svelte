<script lang="ts">
	import { page } from '$app/stores';
	import Tree from '$lib/components/Tree.svelte';
	import { fade } from 'svelte/transition';

	const { data, children } = $props();
	const current = $derived($page.data.current?.id);

	let on = $state(true);
</script>

<div class="root">
	<aside>
		<button onclick={() => (on = !on)}>Toggle</button>
		{#if on}
			<div transition:fade>
				<Tree {current} folder={data.tree} />
			</div>
		{/if}
	</aside>

	<main>
		{@render children()}
	</main>
</div>

<style>
	.root {
		display: flex;
		height: 100%;
		overflow: hidden;
	}

	aside {
		padding-block: 1rem;
		overflow-x: hidden;
		overflow-y: auto;

		:global {
			a {
				color: unset;
			}
			ol {
				margin: 0;
			}
			li,
			li.folder {
				&:has(ol) {
					margin-block: 1.5rem;
				}

				& > ol {
					padding-left: 1.5rem;
				}
			}
			li {
				font-size: 1rem;
				text-transform: none;
			}
			li.folder {
				font-size: 1rem;
				text-transform: uppercase;
			}
		}
	}
	main {
		width: 100%;
		display: flex;
		flex-flow: column;
		padding: 1rem 1.5rem;
		margin-inline: auto;
		overflow-x: hidden;
		overflow-y: auto;
	}

	@media (min-width: 1024px) {
		main {
			width: 80ch;
		}
	}
</style>
