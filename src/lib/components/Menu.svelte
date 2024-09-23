<script lang="ts">
	import type { Node } from '$lib/typings';

	import Icon from '$lib/components/Icon.svelte';
	import Tree from '$lib/components/Tree.svelte';
	import { fly } from 'svelte/transition';

	interface Props {
		tree?: Node[];
		current?: string | undefined;
		withMenu?: boolean;
	}

	const { tree = [], current, withMenu = false }: Props = $props();

	let on = $state(false);
	let showMenu = $derived(withMenu && tree.length);
</script>

<aside>
	<menu>
		<a class="button-link" href="/">PokéSvelte</a>
		{#if tree.length}
			{#if showMenu}
				<button
					title={on ? 'fermer' : 'menu'}
					class="button-link"
					class:active={on}
					onclick={() => (on = !on)}
					>{#if on}<Icon name="cross" />{:else}<Icon name="list" />{/if}</button
				>
			{:else}
				<button title="retour" class="button-link" onclick={() => history.back()}
					><Icon name="back" /></button
				>
			{/if}
		{/if}
	</menu>
	<nav>
		<a
			title="Github repository"
			class="button-link"
			href="https://github.com/bleucitron/pokesvelte"
			target="_blank"><Icon name="github" /></a
		>
	</nav>
	{#if showMenu && on}
		<div class="toc" transition:fly={{ x: -200, duration: 200 }}>
			<Tree {current} folder={tree} />
			<a class="button-link" href="/contents">Programme complet</a>
		</div>
	{/if}
</aside>

<style>
	aside {
		position: fixed;
		left: 0;
		width: 100%;
		height: var(--topbar-height);
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 1;
	}
	aside,
	menu,
	nav {
		@media (max-width: 1024px) {
			border-bottom: 1px solid var(--grey);
			background: white;
		}
	}

	menu,
	nav {
		position: sticky;
		padding: 0;
		top: 0;
		display: flex;
		align-items: center;
		padding: 0.5rem;
		height: var(--topbar-height);
		width: var(--aside-width);
		background: white;
		color: black;
		line-height: 1;
		gap: 0.3rem;
		z-index: 1;

		a:first-child {
			font-size: 1.5rem;
			@media (max-width: 600px) {
				font-size: 1.1rem;
			}
		}
	}
	nav {
		justify-content: flex-end;
	}

	.toc {
		position: absolute;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		padding: 1rem;
		width: var(--aside-width);
		top: 0;
		left: 0;
		padding-top: var(--topbar-height);
		background: white;
		height: 100svh;
		overflow-x: hidden;
		overflow-y: auto;

		@media (max-width: 1024px) {
			border-right: 1px solid var(--light-grey);
		}

		a {
			align-self: center;
			font-size: 0.9rem;
			text-align: center;
		}
	}
</style>
