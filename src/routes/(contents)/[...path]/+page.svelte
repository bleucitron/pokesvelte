<script lang="ts">
	import type { Node } from '$lib/typings';

	const { data } = $props();
	const { title, markup, options, current, prev, next, parent } = $derived(data);
	const { id, name, files, isFolder } = $derived(current);
</script>

{#snippet link(node: Node | undefined)}
	{#if node}
		{@const { id, isFolder, path, name, title, files } = node}
		{@const idText = title ? `${id.split('-').map(Number).join('.')}` : ''}
		{@const noFiles = !files?.length}
		{@const text = title || name}

		<a class="nav-link" class:folder={isFolder} href={path}
			><span>{idText}{isFolder || noFiles ? '.' : ''}</span>{text}</a
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

{#if !isFolder}
	{@render nav()}
{/if}

<style lang="postcss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 1rem;
		height: var(--topbar-height);

		:global {
			a {
				color: var(--grey);

				&:hover,
				&:focus {
					color: var(--orange);
				}
			}
		}

		&:last-of-type:not(:first-of-type) {
			:global {
				.nav-link {
					display: block;
					position: relative;
					&::before {
						content: 'suite';
						position: absolute;
						color: black;
					}
					&:first-of-type {
						&::before {
							content: 'retour';
							bottom: 1.1rem;
							left: 0;
							font-size: 0.8rem;
						}
					}
					&:last-of-type {
						font-size: 1.5rem;
						color: var(--dark-orange);
						&:hover,
						&:focus {
							color: var(--orange);
						}

						&::before {
							content: 'suite';
							bottom: 1.6rem;
							right: 0;
							font-size: 1rem;
						}
					}
				}
			}
		}
		.nav-link {
			span {
				font-size: 0.8rem;
				margin-right: 0.5ch;
			}
		}
	}

	header {
		margin-block: 4rem 7rem;

		a {
			display: block;
			color: inherit;
			font-size: 1.3rem;
			margin: 0;
			text-align: center;

			&:focus,
			&:hover {
				color: var(--orange);
			}
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
			transition: all 0.4s;

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
