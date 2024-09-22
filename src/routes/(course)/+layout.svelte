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
			<a class="button-link" href="/">PokéSvelte</a>
			{#if shouldShowMenu}
				<button class="button-link" class:active={on} onclick={() => (on = !on)}
					>{on ? 'Fermer' : 'Menu'}</button
				>
			{:else}
				<button class="button-link" onclick={() => history.back()}>Retour</button>
			{/if}
		</menu>
		{#if shouldShowMenu && on}
			<div class="toc" transition:fly={{ x: -200, duration: 200 }} bind:this={toc}>
				<Tree {current} folder={data.tree} />
				<a class="button-link" href="/contents">Programme complet</a>
			</div>
		{/if}
	</aside>

	<main class="course">
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
		background-color: white;

		@media (max-width: 1024px) {
			width: 100%;
		}

		menu {
			position: sticky;
			padding: 0.5rem;
			height: var(--topbar-height);
			top: 0;
			background: white;
			color: black;
			line-height: 1;
			gap: 0.3rem;
			display: flex;
			align-items: baseline;

			a:first-child {
				font-size: 1.5rem;
			}
			@media (max-width: 1024px) {
				width: 100%;
				border-bottom: 1px solid var(--dark-grey);
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
				align-self: center;
				font-size: 0.9rem;
				text-align: center;
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

		@media (max-width: 1024px) {
			padding-inline: 2rem;
		}
	}
</style>
