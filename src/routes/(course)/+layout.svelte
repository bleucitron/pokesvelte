<script lang="ts">
	import { page } from '$app/stores';
	import Tree from '$lib/components/Tree.svelte';
	import { fly } from 'svelte/transition';

	const { data, children } = $props();
	const current = $derived($page.data.current?.id);

	let on = $state(false);
	let toc = $state<HTMLDivElement>();
	let shouldShowMenu = $derived($page.url.pathname !== '/contents');

	$effect(() => {
		toc?.querySelector('.current')?.scrollIntoView({ block: 'center' });
	});
</script>

<div class="root">
	<aside>
		<menu>
			<a href="/">PokéSvelte</a>
			{#if shouldShowMenu}
				<button class:active={on} onclick={() => (on = !on)}>{on ? 'Fermer' : 'Menu'}</button>
			{/if}
		</menu>
		{#if shouldShowMenu && on}
			<div class="toc" transition:fly={{ x: -200, duration: 200 }} bind:this={toc}>
				<Tree {current} folder={data.tree} />
				<a href="/contents">Programme complet</a>
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
				transition: all 0.4s;

				&:hover {
					cursor: pointer;
					color: var(--orange);
				}

				&.active {
					color: var(--orange);
					border-color: var(--orange);
				}
			}
		}

		.toc {
			display: flex;
			flex-flow: column;
			justify-content: space-between;
			padding: 1rem;
			padding-top: 0;
			height: calc(100svh - var(--topbar-height));
			overflow-x: hidden;
			overflow-y: auto;

			a {
				font-size: 0.9rem;
				color: var(--grey);
				text-align: center;
			}
		}

		a {
			color: inherit;

			&:hover,
			&:focus {
				color: var(--orange);
			}
		}
	}
	main {
		display: flex;
		height: 100%;
		padding-bottom: 3rem;
		flex-flow: column;
		padding-inline: calc(1rem + var(--aside-width));
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
