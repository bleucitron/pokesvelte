<script lang="ts">
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { title, markup, options, current, prev, next, parent } = $derived(data);
	const { id, name, files, isFolder, scope, description } = $derived(current);

	const folderDescription = $derived(`Liste des chapitres de la partie ${Number(id)} (${title})`);
	const metaDescription = $derived(
		!description ? folderDescription : parent ? `${parent.title} | ${description}` : description
	);

	type Link = (Node & { next?: boolean }) | undefined;
</script>

{#snippet link(node: Link, next = false)}
	{#if node}
		{@const { id, isFolder, path, name, title, files, scope } = node}
		{@const idText = title ? `${id.split('-').map(Number).join('.')}` : ''}
		{@const noFiles = !files?.length}
		{@const text = title || name}

		<a class="nav-link {scope}" class:next class:folder={isFolder} href={path}
			><span>{idText}{isFolder || noFiles ? '. ' : ' '}</span>{text}</a
		>
	{:else}
		<span></span>
	{/if}
{/snippet}

{#snippet nav()}
	<nav>
		{@render link(prev, false)}
		{@render link(next, true)}
	</nav>
{/snippet}

{#snippet parentLink({ path, title, id, scope }: Node)}
	{@const prefix = id ? `${Number(id)}. ` : ''}
	<a class="parent {scope}" href={path}><span>{prefix}</span>{title}</a>
{/snippet}

{@render nav()}

<article class={scope} class:folder={isFolder}>
	<header>
		{#if parent}
			{@render parentLink(parent)}
		{:else if isFolder}
			<a href="/">Partie {Number(id)}</a>
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

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={metaDescription} />
</svelte:head>

<style lang="postcss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding-block: 1rem;
		height: var(--topbar-height);

		&:last-of-type:not(:first-of-type) {
			align-items: baseline;

			:global {
				.nav-link {
					display: block;
					position: relative;

					&::before {
						content: 'retour';
						position: absolute;
						color: black;
						top: -1.1rem;
						left: 0;
						font-size: 0.8rem;
					}
					&.next {
						font-size: 1.5rem;
						text-align: right;

						&::before {
							content: 'suite';
							left: unset;
							right: 0;
							font-size: 1rem;
						}
						@media (max-width: 1024px) {
							font-size: 1rem;

							&::before {
								font-size: 0.8rem;
							}
						}
					}
				}
			}
		}
		&:first-of-type {
			z-index: 1;

			@media (max-width: 1024px) {
				display: none;
			}
		}
	}

	header {
		margin-block: 4rem 5rem;

		@media (max-width: 600px) {
			margin-bottom: 2rem;
		}
		h1 {
			margin: initial;
		}

		a {
			display: block;
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

	article {
		flex: 1;
		margin-block: 3rem;
		margin-inline: auto;

		&.folder {
			h1 {
				text-transform: uppercase;
			}
		}

		section {
			width: max-content;
			margin: auto;
			margin-top: 3rem;
		}
	}

	.parent {
		display: block;
		text-align: center;
		font-size: 1rem;
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

		@media (max-width: 1024px) {
			font-size: 1.1rem;
		}
	}
</style>
