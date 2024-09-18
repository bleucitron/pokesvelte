<script lang="ts">
	import { page } from '$app/stores';
	import Tree from '$lib/components/Tree.svelte';
	import { fly } from 'svelte/transition';

	const { data, children } = $props();
	const current = $derived($page.data.current?.id);

	let on = $state(false);
	let toc = $state<HTMLDivElement>();

	$effect(() => {
		toc?.querySelector('.current')?.scrollIntoView({ block: 'center' });
	});
</script>

<div class="root">
	<aside>
		<menu>
			<a href="/">PokéSvelte</a>
			<button class:active={on} onclick={() => (on = !on)}>{on ? 'Fermer' : 'Menu'}</button>
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
		--aside-width: max(15rem, 25vw);
	}

	aside {
		position: fixed;
		left: 0;
		width: var(--aside-width);

		--topbar-height: 4rem;

		menu {
			position: sticky;
			padding: 1rem;
			height: var(--topbar-height);
			top: 0;
			background: white;
			line-height: 1;
			display: flex;
			gap: 0.5rem;
			align-items: baseline;

			a {
				font-size: 1.5rem;
			}

			button {
				background: white;
				border-radius: 6px;
				border: none;
				box-shadow: none;
				height: 100%;

				&:focus,
				&:hover {
					cursor: pointer;
					color: var(--dark-blue);
				}

				&.active {
					background: var(--dark-blue);
					color: white;
					border-color: var(--dark-blue);
				}
			}
		}

		.toc {
			padding-block: 1rem;
			height: calc(100svh - var(--topbar-height));
			overflow-x: hidden;
			overflow-y: auto;
		}

		a {
			color: unset;
		}
	}
	main {
		display: flex;
		height: 100%;
		flex-flow: column;
		padding-inline: calc(1rem + var(--aside-width));
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
