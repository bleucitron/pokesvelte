<script lang="ts">
	import Tree from '$lib/components/Tree.svelte';
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { current, prev, next, parent } = $derived(data);
	const { id, markup, title, name, files, isFolder } = $derived(current);

	$inspect(data);
</script>

{#snippet link(node: Node | undefined)}
	{#if node}
		{@const { id, isFolder, path, name, title } = node}
		{@const idText = title ? `${id.replaceAll('-', '/')}.` : ''}
		{@const text = title || name}

		<a class="nav-link" class:folder={isFolder} href={path}
			><span>{idText}</span>{text}{isFolder ? '/' : ''}</a
		>
	{:else}
		<span></span>
	{/if}
{/snippet}

{#snippet nav()}
	<nav>
		{@render link(prev)}
		{@render link(next)}
	</nav>
{/snippet}

{#snippet parentLink({ path, title, id }: Node)}
	{@const prefix = id ? `${id}.` : ''}
	<a class="parent" href={path}><span>{prefix}</span>{title}</a>
{/snippet}

{@render nav()}

<article>
	<!-- TODO: fil d'ariane -->
	<header>
		{#if parent}
			{@render parentLink(parent)}
		{:else}
			<p>Chapitre {id}</p>
		{/if}

		{#if !title}
			<h1>{name}</h1>
		{/if}
		{#if markup}
			{@const prefix = !isFolder ? `${id.split('-').at(-1)}.` : ''}
			<h1 class:folder={isFolder}><span>{prefix}</span>{title}</h1>
		{/if}
	</header>

	{#if markup}
		{@html markup}
	{/if}

	{#if files?.length}
		<Tree folder={files} />
	{/if}
</article>

{@render nav()}

<style lang="postcss">
	nav {
		display: flex;
		justify-content: space-between;
		margin-block: 1rem;
	}

	header {
		margin-top: 3rem;

		p {
			font-size: 1.3rem;
			margin: 0;
			text-align: center;
		}
	}

	.nav-link span {
		font-size: 0.8rem;
	}

	article {
		margin-block: 3rem;
		width: min(70ch, 100%);
		margin-inline: auto;
	}

	.parent {
		display: block;
		text-align: center;
		font-size: 1.1rem;
		color: var(--grey);
	}

	h1 {
		text-align: center;
		line-height: 1.2;

		span {
			font-size: 1.8rem;
			color: black;
		}
	}
</style>
