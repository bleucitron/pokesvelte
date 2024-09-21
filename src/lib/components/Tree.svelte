<script lang="ts">
	import type { Node } from '$lib/typings';
	import { scale, slide } from 'svelte/transition';

	interface Props {
		folder: Node[];
		current?: string;
		depth?: number;
	}
	const { folder, current: currentId = '', depth = 0 }: Props = $props();
	const start = parseInt(folder[0]?.id?.split('-')?.at(-1) ?? '');

	let tagsOn = $state(false);
</script>

<ol {start}>
	{#each folder as { id, name, path, files, title, scope }}
		{@const root = depth === 0}
		{@const current = root ? id && currentId.startsWith(id) : id === currentId}
		{@const previous = !current && id && id < currentId}
		{@const next = id > currentId}
		{@const tagOn = root && scope && (current || tagsOn)}

		<li class={scope} class:root class:current class:previous class:next>
			<span
				><a href={path}>{title || name}</a>

				{#if tagOn}
					<button
						class="tag {scope}"
						onclick={() => (tagsOn = !tagsOn)}
						transition:scale={{ duration: 300 }}
					>
						{scope}
					</button>
				{/if}
			</span>

			{#if current && files?.length}
				<div transition:slide={{ duration: 300 }}>
					<svelte:self current={currentId} folder={files} depth={depth + 1} />
				</div>
			{/if}
		</li>
	{/each}
</ol>

<style>
	a {
		color: unset;
		&:focus,
		&:hover {
			color: var(--darker-grey);
		}
	}

	.tag {
		padding: 1px 3px;
		color: white;
		font-size: 0.7rem;
		border-radius: 3px;
		opacity: 0.5;
		border: none;

		&:hover {
			opacity: 1;
		}

		&.svelte {
			background: var(--dark-orange);
		}
		&.kit {
			background: var(--dark-blue);
		}
	}

	ol:has(.root) {
		padding-left: 2rem;
	}

	li {
		margin-block: 0.8rem;
		font-size: 0.9rem;
		text-transform: none;

		:global {
			ol {
				padding-left: 1rem;
			}
			li {
				margin: 0;
			}
		}

		font-weight: normal;
		color: var(--grey);
		transition-property: color, font-weight;

		&.current {
			color: black;

			&.root > span > a:focus,
			&.root > span > a:hover {
				color: black !important;
				cursor: default;
			}

			.current {
				a:focus,
				a:hover {
					color: black !important;
					cursor: default;
				}
			}
		}

		&.root {
			font-size: 1rem;
		}
	}
</style>
