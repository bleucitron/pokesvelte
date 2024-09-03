<script lang="ts">
	import { page } from '$app/stores';
	import Tree from '$lib/components/Tree.svelte';
	import { fly } from 'svelte/transition';

	const { data, children } = $props();
	const current = $derived($page.data.current?.id);

	let on = $state(true);
	let toc = $state<HTMLDivElement>();

	$effect(() => {
		console.log($page.url);
		toc?.querySelector('.current')?.scrollIntoView({ block: 'center' });
	});
</script>

<div class="root">
	<aside>
		<menu>
			<a href="/">PokéSvelte</a>
			<button onclick={() => (on = !on)}>Menu</button>
		</menu>
		{#if on}
			<div class="toc" transition:fly={{ x: -200, duration: 200 }} bind:this={toc}>
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
		height: 100%;
		overflow: hidden;

		--aside-width: max(15rem, 25vw);
	}

	aside {
		position: fixed;
		left: 0;
		width: var(--aside-width);

		--topbar-height: 3rem;

		menu {
			position: sticky;
			padding: 1rem;
			height: var(--topbar-height);
			top: 0;
			background: white;
			line-height: 1;
		}

		.toc {
			padding-block: 1rem;
			height: calc(100svh - var(--topbar-height));
			overflow-x: hidden;
			overflow-y: auto;
		}

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

					&:first-of-type {
						margin-top: 0;
					}
					&:last-of-type {
						margin-bottom: 0;
					}
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
		flex: 1;
		display: flex;
		flex-flow: column;
		height: 100%;
		padding-inline: calc(1rem + var(--aside-width));
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
