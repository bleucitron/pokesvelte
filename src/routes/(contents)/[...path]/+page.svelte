<script lang="ts">
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { title, markup, options, current, prev, next, parent } = $derived(data);
	const { id, name, files, isFolder } = $derived(current);
</script>

{#snippet link(node: Node | undefined)}
	{#if node}
		{@const { id, isFolder, path, name, title } = node}
		{@const idText = title ? `${id.split('-').map(Number).join('.')} ` : ''}
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
	{@const prefix = id ? `${Number(id)}. ` : ''}
	<a class="parent" href={path}><span>{prefix}</span>{title}</a>
{/snippet}

{@render nav()}

<article class:folder={isFolder}>
	<header>
		{#if parent}
			{@render parentLink(parent)}
		{:else if isFolder}
			<a href="/">Chapitre {id}</a>
		{:else}
			<a href="/">Aparté</a>
		{/if}

		{#if !title}
			<h1>{name}</h1>
		{:else if markup}
			{@const prefix = !isFolder ? `${Number(id.split('-').at(-1))}. ` : ''}
			<h1><span>{prefix}</span>{title}</h1>
		{/if}

		{#if options?.subtitle}
			<p>{options.subtitle}</p>
		{/if}
	</header>

	{#if markup}
		{@html markup}
	{/if}

	{#if files?.length}
		{@const start = parseInt(files[0]?.id?.split('-')?.at(-1) ?? '')}
		<section>
			<ol {start}>
				{#each files as { title, path }}
					<li><a href={path}>{title}</a></li>
				{/each}
			</ol>
		</section>
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
		margin-block: 4rem 7rem;

		a {
			display: block;
			color: inherit;
			font-size: 1.3rem;
			margin: 0;
			text-align: center;
		}

		p {
			margin: 0;
			color: var(--grey);
			font-style: italic;
			text-align: center;
		}
	}

	.nav-link span {
		font-size: 0.8rem;
	}

	article {
		flex: 1;
		margin-block: 3rem;
		width: min(70ch, 100%);
		margin-inline: auto;

		&.folder {
			:global(p) {
				text-align: center;
			}

			h1 {
				text-transform: uppercase;
			}
		}

		section {
			width: max-content;
			margin: auto;
		}
	}

	.parent {
		display: block;
		text-align: center;
		font-size: 1rem;
		color: var(--grey);
		text-transform: uppercase;
	}

	h1 {
		text-align: center;
		line-height: 1.2;

		span {
			font-size: 1.8rem;
			color: black;
		}
	}

	ol {
		font-size: 1.3rem;
	}

	:global {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			position: relative;
			transition: all 0.5s;

			a {
				color: inherit;
				display: block;

				&:hover,
				&:focus {
					text-decoration: none;
				}
			}

			&:has(a:hover, a:focus) {
				&::before {
					content: '#';
					position: absolute;
					left: -1.3rem;
					color: var(--dark-blue);
				}
			}
		}
	}
</style>
