<script lang="ts">
	import type { Node } from '$lib/typings';

	import Icon from '$lib/components/Icon.svelte';
	import Tree from '$lib/components/Tree.svelte';
	import { fly } from 'svelte/transition';

	interface Props {
		tree: Node[];
		current: string | undefined;
		showMenu: boolean;
	}

	const { tree, current, showMenu }: Props = $props();

	let on = $state(false);
	let toc = $state<HTMLDivElement>();
</script>

<menu>
	<a class="button-link" href="/">PokéSvelte</a>
	{#if tree && showMenu}
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
</menu>
{#if showMenu && on}
	<div class="toc" transition:fly={{ x: -200, duration: 200 }} bind:this={toc}>
		<Tree {current} folder={tree} />
		<a class="button-link" href="/contents">Programme complet</a>
	</div>
{/if}

<style>
	menu {
		position: sticky;
		padding: 0;
		top: 0;
		background: white;
		color: black;
		line-height: 1;
		gap: 0.3rem;
		display: flex;
		align-items: baseline;
		z-index: 1;

		a:first-child {
			font-size: 1.5rem;
		}
		button {
			align-self: flex-start;
		}
	}

	.toc {
		position: absolute;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		padding: 1rem;
		top: 0;
		left: 0;
		padding-top: var(--topbar-height);
		background: white;
		height: 100svh;
		border-right: 1px solid var(--light-grey);
		overflow-x: hidden;
		overflow-y: auto;

		a {
			align-self: center;
			font-size: 0.9rem;
			text-align: center;
		}
	}
</style>
